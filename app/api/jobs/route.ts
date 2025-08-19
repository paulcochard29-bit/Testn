
import { prisma } from '@/lib/prisma'
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || undefined
  const zone = req.nextUrl.searchParams.get('zone') || undefined
  const type = req.nextUrl.searchParams.get('type') || undefined
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        q ? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }] } : {},
        zone ? { zone } : {},
        type ? { rank: { contains: type, mode: 'insensitive' } } : {},
      ]
    },
    include: { company: true, vessel: true },
    orderBy: { publishedAt: 'desc' },
    take: 50
  })
  return NextResponse.json(jobs)
}
