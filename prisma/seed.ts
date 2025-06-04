import { PrismaClient } from '@prisma/client'
import { projects, users } from './placeholder'

const prisma = new PrismaClient()

async function main() {
  await prisma.users.deleteMany()

  for (const user of users) {
    await prisma.users.create({
      data: user
    })
  }

  await prisma.projects.deleteMany()
  for (const project of projects) {
    await prisma.projects.create({
      data: project
    })
  }

  await prisma.entries.deleteMany()
  for (const i of Array.from({ length: 5 })) {
    const user = await prisma.users.findFirst({
      where: { email: users[Math.floor(Math.random() * 5)].email }
    })
    const project = await prisma.projects.findFirst({
      where: { title: projects[Math.floor(Math.random() * 6)].title }
    })
    await prisma.entries.create({
      data: {
        projectId: project?.id ?? '',
        userId: user?.id ?? '',
        entryAt: new Date('2025-06-01')
      }
    })
  }

  console.log('seeded')
}

await main()
  .then(async () => {
    console.log('seeded')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('error')
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
