
import { NextRequest, NextResponse } from 'next/server'
const IDP = 'https://id.barentswatch.no/connect/token'
const LIVE_LATEST = 'https://live.ais.barentswatch.no/v1/latest/combined'
let token: string | null = null; let exp = 0
async function getToken(){
  if (token && Date.now() < exp - 60000) return token
  const body = new URLSearchParams({ client_id: process.env.BARW_CLIENT_ID!, client_secret: process.env.BARW_CLIENT_SECRET!, scope: 'api', grant_type: 'client_credentials' })
  const r = await fetch(IDP, { method: 'POST', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body })
  if (!r.ok) throw new Error('Token failed: ' + await r.text())
  const j = await r.json() as any; token = j.access_token; exp = Date.now() + (j.expires_in ?? 3600) * 1000; return token!
}
export async function GET(req: NextRequest){
  const mmsiParam = (req.nextUrl.searchParams.get('mmsi') ?? '').trim()
  if (!mmsiParam) return NextResponse.json({ error: 'Missing mmsi' }, { status: 400 })
  const MMSI = mmsiParam.split(',').map(s=>parseInt(s.trim(),10)).filter(Boolean)
  try{
    const t = await getToken()
    const r = await fetch(LIVE_LATEST, { method:'POST', headers:{ 'Authorization':`Bearer ${t}`, 'Content-Type':'application/json' }, body: JSON.stringify({ mmsi: MMSI }) })
    if (!r.ok) return NextResponse.json({ error:'AIS upstream error', detail: await r.text() }, { status: 502 })
    const rows = await r.json() as any[]
    const out = rows.map(v=>({ mmsi:String(v.mmsi), name:v.name??null, lat:v.latitude, lon:v.longitude, sog:v.speedOverGround, cog:v.courseOverGround, ts:v.msgtime }))
    return NextResponse.json(out, { headers: { 'Cache-Control': 'public, max-age=20' } })
  }catch(e:any){ return NextResponse.json({ error: String(e?.message||e) }, { status: 500 }) }
}
