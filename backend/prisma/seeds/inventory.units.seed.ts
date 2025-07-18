import { PrismaClient } from '@prisma/client'

export async function seedUnits(prisma: PrismaClient) {
  const units = [
    "lbs",
    "case",
    "gallon",
    "each",
    "pack",
    "box"
  ]

  for (const name of units) {
    await prisma.unit.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
}
