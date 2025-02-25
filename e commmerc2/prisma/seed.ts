import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Toys",
    "Health & Beauty",
    "Automotive",
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    })
  }

  console.log("Database seeded!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

