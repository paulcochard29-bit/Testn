
# FishingJob — Full-Stack (Supabase + Vercel) avec Carte AIS

## Config locale
1. `cp .env.example .env` et remplis les URLs Supabase (pooled pour DATABASE_URL, direct pour DIRECT_URL)
2. `npm install`
3. `npx prisma generate`
4. `npx prisma migrate deploy`
5. `npm run prisma:seed`
6. `npm run dev` → http://localhost:3000

## Test rapide
- `/demo/ais` : carte AIS (Leaflet) → nécessite BARW_CLIENT_ID/SECRET valides
- `/jobs` : liste d'offres (depuis Supabase)
- `/companies/<id>` : fiche armateur + carte mmsi de ses navires

Comptes seed : marin@example.com / armateur@example.com (mdp `password123`)
