import seedData from './data/inventory.seed.json'
import { PrismaClient, Prisma } from '@prisma/client';

export default async function seedInventories(prisma: PrismaClient) {

  // Seed categories
  await Promise.all(
    seedData.categories.map((category) =>
      prisma.category.create({
        data: category,
      })
    )
  )

  // Seed units
  await Promise.all(
    seedData.units.map((unit) =>
      prisma.unit.create({
        data: unit,
      })
    )
  )

  // Seed inventory items
  await Promise.all(
    seedData.inventoryItems.map((item) =>
      prisma.inventoryItem.create({
        data: item,
      })
    )
  )

  console.log('✅ Inventories seeded');
}
