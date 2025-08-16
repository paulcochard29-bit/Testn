
import JobCard from '@/components/JobCard'
async function getJobs(searchParams: Record<string,string>) {
  const qs = new URLSearchParams(searchParams as any).toString()
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/jobs?` + qs, { cache: 'no-store' })
  return await res.json()
}
export default async function Jobs({ searchParams }: { searchParams: Record<string, string>}){
  const jobs = await getJobs(searchParams)
  return (
    <main className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Résultats</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {jobs.map((j:any)=> <JobCard key={j.id} job={j} />)}
      </div>
    </main>
  )
}
