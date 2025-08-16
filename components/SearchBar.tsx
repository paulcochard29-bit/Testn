
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
export default function SearchBar(){
  const router = useRouter()
  const sp = useSearchParams()
  const [q, setQ] = useState(sp.get('q') || '')
  const [zone, setZone] = useState(sp.get('zone') || '')
  const [type, setType] = useState(sp.get('type') || '')
  const go = () => {
    const p = new URLSearchParams()
    if (q) p.set('q', q); if (zone) p.set('zone', zone); if (type) p.set('type', type)
    router.push('/jobs?' + p.toString())
  }
  return (
    <div className="flex gap-2 bg-white border border-black/10 rounded-xl p-2 shadow-soft">
      <input className="input" placeholder="Rang (matelot, mécanicien, capitaine…)" value={q} onChange={e=>setQ(e.target.value)} />
      <input className="input" placeholder="Zone (Atlantique Nord, Mer de Norvège…)" value={zone} onChange={e=>setZone(e.target.value)} />
      <select className="input" value={type} onChange={e=>setType(e.target.value)}>
        <option value="">Type de navire</option>
        <option>Chalutier</option><option>Palangrier</option><option>Senneur</option><option>Dragueur</option>
      </select>
      <button className="btn btn-primary" onClick={go}>Rechercher</button>
    </div>
  )
}
