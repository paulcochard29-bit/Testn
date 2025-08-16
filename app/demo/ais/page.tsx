
import MapAIS from '../../components/MapAIS'
export default function AISDemo(){
  return (
    <main className="container py-6">
      <h1 className="text-2xl font-bold mb-3">Démo Carte AIS</h1>
      <div className="card p-4">
        <MapAIS mmsi={['258123456','258654321']} />
        <p className="text-muted mt-2">Si rien n'apparaît, vérifiez BARW_CLIENT_ID / BARW_CLIENT_SECRET sur Vercel.</p>
      </div>
    </main>
  )
}
