
import './globals.css'
import Navbar from '@/components/Navbar'
export const metadata = { title: 'FishingJob — Plateforme pour marins pêcheurs' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body><Navbar/>{children}</body></html>)
}
