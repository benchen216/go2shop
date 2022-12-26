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
  await prisma.productCategory.create({
    data: {
      productCategoryName: 'Woman',
    },
    })
  await prisma.business.create(
    {
      data: {
        name: 'default',
      }
    }
  )
  await prisma.user.create(
    {
      data: {
        email: 'admin@ben2.win',
        userRole: 1,
        businessId: 1,
      }
    }
  )

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