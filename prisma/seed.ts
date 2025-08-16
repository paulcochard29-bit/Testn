
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const password = await bcrypt.hash('password123', 10)
  const seafarer = await prisma.user.create({
    data: {
      email: 'marin@example.com',
      name: 'Jean Marin',
      role: 'SEAFARER',
      password,
      seafarer: { create: { ranks: ['Matelot'], certificates: ['STCW Basic'], zones: ['Atlantique Nord','Mer de Norvège'], languages: ['fr','en'], seaHours: 3200 } }
    }
  })
  const recruiter = await prisma.user.create({
    data: {
      email: 'armateur@example.com',
      name: 'Nordic Sea Harvest HR',
      role: 'RECRUITER',
      password,
      company: {
        create: {
          name: 'Nordic Sea Harvest',
          verified: true,
          country: 'NO',
          logoUrl: '/hero-placeholder.svg',
          vessels: {
            create: [
              { name: 'NSH Aurora', type: 'Chalutier de fond', lengthM: 65, engineKw: 4500, flag: 'NO', photoUrl: '/hero-placeholder.svg', mmsi: '258123456' },
              { name: 'NSH Polaris', type: 'Palangrier', lengthM: 58, engineKw: 3600, flag: 'NO', photoUrl: '/hero-placeholder.svg', mmsi: '258654321' }
            ]
          }
        }
      }
    }
  })
  const company = await prisma.company.findFirst({ where: { ownerId: recruiter.id } })
  await prisma.job.createMany({
    data: [
      { companyId: company!.id, title: 'Matelot pont — campagne 45 jours', rank: 'Matelot pont', description: 'Quart de pêche, manœuvres pont, maintenance légère. EPI fournis.', contractType: 'CDD', durationDays: 45, salaryMin: 2400, salaryMax: 2800, currency: 'EUR', zone: 'Atlantique Nord', requirements: ['STCW', '12 mois expérience chalutier'] },
      { companyId: company!.id, title: 'Mécanicien 2e classe — rotation 6/6', rank: 'Mécanicien 2e classe', description: 'Maintenance moteur, rondes machine, sécurité.', contractType: 'Rotation 6/6', salaryMin: 3200, salaryMax: 3800, currency: 'EUR', zone: 'Côte Ouest Afrique', requirements: ['STCW Engine', 'Expérience machine 2 ans'] }
    ]
  })
  console.log('Seed done. Users: marin@example.com / armateur@example.com (password123)')
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()})
