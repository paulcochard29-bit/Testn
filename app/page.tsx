
import SearchBar from '@/components/SearchBar'
export default function Page(){
  return (
    <main>
      <header className="relative min-h-[70vh] grid place-items-center overflow-hidden border-b border-black/10">
        <img src="/hero-placeholder.svg" alt="Hero" className="absolute inset-0 w-full h-full object-cover scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-bg/90" />
        <div className="relative z-10 container grid gap-4 p-6">
          <p className="text-muted">Plateforme pro • Monde entier</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Trouvez l’équipage qu’il vous faut.<br/>Embarquez sur la bonne mission.</h1>
          <p className="text-muted">Ambiance fjord/Groenland — image hero personnalisable (remplace /public/hero-placeholder.svg par /public/hero.png).</p>
          <SearchBar/>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div className="card p-3"><div className="text-2xl font-extrabold text-blue-900">3 240</div><div className="text-muted">Marins actifs</div></div>
            <div className="card p-3"><div className="text-2xl font-extrabold text-blue-900">812</div><div className="text-muted">Offres en ligne</div></div>
            <div className="card p-3"><div className="text-2xl font-extrabold text-blue-900">74</div><div className="text-muted">Pavillons</div></div>
          </div>
        </div>
      </header>
      <section className="container py-6">
        <h2 className="text-xl font-semibold mb-3">Offres en vedette</h2>
        <div className="card p-8 text-muted">Ces cartes se rempliront depuis Supabase (seed inclus) sur /jobs.</div>
      </section>
    </main>
  )
}
