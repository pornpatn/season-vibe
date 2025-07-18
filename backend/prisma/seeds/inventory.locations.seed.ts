import { PrismaClient } from '@prisma/client'

export async function seedLocations(prisma: PrismaClient) {
  const locations = [
    { id: "loc1", name: "Main Restaurant" },
    { id: "loc2", name: "Warehouse" }
  ]

  for (const loc of locations) {
    await prisma.location.upsert({
      where: { id: loc.id },
      update: {},
      create: loc,
    })
  }
}
