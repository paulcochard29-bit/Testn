
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
export default async function JobDetail({ params }: { params: { id: string }}) {
  const job = await prisma.job.findUnique({ where: { id: params.id }, include: { company: true, vessel: true } })
  if (!job) return <div className="container py-6">Offre introuvable</div>
  return (
    <main className="container py-6 grid md:grid-cols-2 gap-4">
      <div>
        <img src="/hero-placeholder.svg" className="w-full h-64 object-cover rounded-xl border border-black/10" alt="Navire" />
        <div className="card p-4 mt-3">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <table className="table mt-2"><tbody>
              <tr><td><strong>Navire</strong></td><td>{job.vessel?.name || '—'}</td></tr>
              <tr><td><strong>Départ</strong></td><td>{job.startDate ? new Date(job.startDate).toLocaleDateString('fr-FR') : 'À définir'}</td></tr>
              <tr><td><strong>Salaire</strong></td><td>{job.salaryMin ? `${job.salaryMin}–${job.salaryMax || ''} ${job.currency}` : 'À définir'}</td></tr>
              <tr><td><strong>Zone</strong></td><td>{job.zone || '—'}</td></tr>
              <tr><td><strong>Type</strong></td><td>{job.contractType}</td></tr>
          </tbody></table>
        </div>
        <div className="card p-4 mt-3">
          <h3 className="font-semibold">À propos de l’armateur</h3>
          <p><strong>{job.company.name}</strong> — <Link href={`/companies/${job.company.id}`}>Voir la fiche armateur</Link></p>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold">Détails du poste</h3>
        <p className="mt-2 text-muted">{job.description}</p>
        <h4 className="mt-4 font-semibold">Exigences</h4>
        <ul className="list-disc list-inside text-muted">{job.requirements.map((r:any, i:number)=>(<li key={i}>{r}</li>))}</ul>
        <button className="btn btn-primary mt-4">Postuler maintenant</button>
      </div>
    </main>
  )
}
