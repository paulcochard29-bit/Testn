
import Link from 'next/link'
export default function Navbar(){
  return (
    <nav className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-black/10">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <div className="w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br from-accent to-blue-300 text-white shadow-soft">🚢</div>
          <span>FishingJob</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link className="btn" href="/companies/demo">Espace Armateur</Link>
          <Link className="btn" href="/dashboard/seafarer">Espace Marin</Link>
          <Link className="btn btn-primary" href="/jobs">Voir les offres</Link>
        </div>
      </div>
    </nav>
  )
}
