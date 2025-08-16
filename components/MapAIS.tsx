
'use client'
import { useEffect, useRef } from 'react'
type Props = { mmsi: string[] }
export default function MapAIS({ mmsi }: Props){
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const id = 'leaflet-css-cdn'
    if (!document.getElementById(id)){
      const l = document.createElement('link')
      l.id = id; l.rel = 'stylesheet'
      l.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(l)
    }
    let map:any, timer:any
    ;(async () => {
      // @ts-ignore
      const L = await import('leaflet')
      map = L.map(ref.current!)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OSM & CARTO'}).addTo(map)
      L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',{attribution:'&copy; OpenSeaMap'}).addTo(map)
      map.setView([69.65, 18.95], 7)
      const markers = new Map<string, any>()
      async function refresh(){
        if (!mmsi.length) return
        const res = await fetch('/api/ais?mmsi='+mmsi.join(','), { cache: 'no-store' })
        if (!res.ok) return
        const rows = await res.json()
        rows.forEach((r:any) => {
          const { lat, lon, name, sog, cog, mmsi } = r
          if (!markers.has(mmsi)){
            const m = L.marker([lat, lon]).addTo(map).bindPopup(`<strong>${name||mmsi}</strong><br/>Vitesse: ${sog?.toFixed?.(1)||'?'} kn<br/>Cap: ${Math.round(cog||0)}°`)
            markers.set(mmsi, m)
          }
          markers.get(mmsi).setLatLng([lat, lon])
        })
      }
      await refresh()
      timer = setInterval(refresh, 30000)
    })()
    return () => { if (timer) clearInterval(timer); if (map) map.remove() }
  }, [mmsi.join(',')])
  return <div ref={ref} style={{height:420, borderRadius:12, border:'1px solid rgba(0,0,0,0.1)'}} />
}
