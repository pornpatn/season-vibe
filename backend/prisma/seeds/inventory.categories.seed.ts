import { PrismaClient } from '@prisma/client'

export async function seedCategories(prisma: PrismaClient) {
  const categories = [
    "Produce",
    "Dairy",
    "Meat",
    "Seafood",
    "Dry Goods",
    "Spices",
    "Beverages",
    "Bakery"
  ]

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name, displayOrder: 0 },
    })
  }
}
