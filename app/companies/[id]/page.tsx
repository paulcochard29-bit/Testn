
import { prisma } from '../../../lib/prisma'
import MapAIS from '../../../components/MapAIS'
export default async function CompanyPage({ params }: { params: { id: string }}) {
  const company = await prisma.company.findUnique({ where: { id: params.id }, include: { vessels: true, jobs: true } })
  if (!company) return <div className="container py-6">Entreprise introuvable</div>
  const mmsiList = company.vessels.flatMap(v => v.mmsi ? [v.mmsi] : [])
  return (
    <main className="container py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl grid place-items-center bg-gradient-to-br from-blue-600 to-blue-300 text-white shadow-soft">🏢</div>
          <div>
            <div className="font-extrabold text-lg">{company.name}</div>
            <div className="text-muted">{company.country || '—'} • {company.vessels.length} navires • {company.verified ? 'Compte vérifié' : 'Non vérifié'}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn">Suivre</button>
          <button className="btn">Contacter</button>
          <button className="btn btn-primary">Publier une offre</button>
        </div>
      </div>
      <section className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Flotte</h2>
          <div className="grid gap-3">
            {company.vessels.map(v => (
              <article key={v.id} className="grid md:grid-cols-[160px_1fr_auto] gap-3 items-center">
                <img src="/hero-placeholder.svg" className="w-[160px] h-[120px] object-cover rounded-xl border border-black/10" alt="Navire" />
                <div>
                  <div className="font-semibold">{v.name} — {v.type}</div>
                  <div className="text-muted">IMO {v.imo || '—'} • {v.lengthM || '—'} m • {v.engineKw || '—'} kW • Pavillon {v.flag || '—'}</div>
                </div>
                <div className="justify-self-end"><button className="btn">Voir les offres</button></div>
              </article>
            ))}
          </div>
        </div>
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Position AIS (temps réel)</h2>
          <div className="w-full border border-black/10 rounded-xl overflow-hidden">
            <MapAIS mmsi={mmsiList as any} />
          </div>
          <p className="text-muted mt-2">La carte consomme <code>/api/ais</code> (BarentsWatch). Rafraîchissement : 30 s.</p>
        </div>
      </section>
      <section className="mt-4">
        <h2 className="font-semibold mb-2">Offres récentes</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {company.jobs.map(j => (
            <article key={j.id} className="card overflow-hidden">
              <img src="/hero-placeholder.svg" className="w-full h-40 object-cover" alt="Navire" />
              <div className="p-4">
                <div className="badge">{j.zone || '—'}</div>
                <div className="font-semibold mt-1">{j.title}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
