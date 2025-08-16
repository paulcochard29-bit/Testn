
import Link from 'next/link'
import type { Job, Company, Vessel } from '@prisma/client'
export default function JobCard({ job }: { job: Job & { company: Company, vessel: Vessel | null }}){
  return (
    <article className="card overflow-hidden">
      <img src="/hero-placeholder.svg" className="w-full h-40 object-cover" alt="Navire" />
      <div className="p-4">
        <div className="badge">{job.vessel?.type || 'Navire'} • {job.zone || '—'}</div>
        <h3 className="mt-2 font-semibold text-lg">
          <Link href={`/jobs/${job.id}`}>{job.title}</Link>
        </h3>
        <p className="text-muted">{job.salaryMin ? `${job.salaryMin}–${job.salaryMax || ''} ${job.currency || 'EUR'}` : 'Salaire à définir'} • {job.company.name}</p>
      </div>
    </article>
  )
}
