import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.role.create({
    data: {
      roleName: 'admin',
    },
  })
  await prisma.role.create({
    data: {
      roleName: 'shop',
    },
  })
  await prisma.role.create({
    data: {
      roleName: 'buyer',
    },
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })