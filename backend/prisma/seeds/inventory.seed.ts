import { PrismaClient } from '@prisma/client'
import { seedCategories } from './inventory.categories.seed'
import { seedUnits } from './inventory.units.seed'
import { seedLocations } from './inventory.locations.seed'

export default async function seedInventoryItems(prisma: PrismaClient) {
  await seedCategories(prisma)
  await seedUnits(prisma)
  await seedLocations(prisma)

  const item1 = await prisma.inventoryItem.create({
    data: {
      name: "Choose",
      alternateNames: "",
      description: "Every determine air hand sense them.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item1.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item1.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item1.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item1.id,
      dayOfWeek: 1,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item1.id,
      dayOfWeek: 2,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item1.id,
      dayOfWeek: 3,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item1.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item1.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item1.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item2 = await prisma.inventoryItem.create({
    data: {
      name: "None",
      alternateNames: "Two",
      description: "Single store country.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item2.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item2.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item2.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item2.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item2.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item2.id,
      dayOfWeek: 4,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item2.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item2.id,
      dayOfWeek: 6,
      amount: 3
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item2.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 1.48
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item2.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 0.62
    }
  })

  const item3 = await prisma.inventoryItem.create({
    data: {
      name: "Over",
      alternateNames: "Change",
      description: "Author their about.",
      isActive: false,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item3.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item3.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item3.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item3.id,
      dayOfWeek: 1,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item3.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item3.id,
      dayOfWeek: 3,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item3.id,
      dayOfWeek: 4,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item3.id,
      dayOfWeek: 5,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item3.id,
      dayOfWeek: 6,
      amount: 2
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item3.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 1.91
    }
  })

  const item4 = await prisma.inventoryItem.create({
    data: {
      name: "Model",
      alternateNames: "",
      description: "Nothing threat key civil senior.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item4.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item4.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item4.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item4.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item4.id,
      dayOfWeek: 2,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item4.id,
      dayOfWeek: 3,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item4.id,
      dayOfWeek: 4,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item4.id,
      dayOfWeek: 5,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item4.id,
      dayOfWeek: 6,
      amount: 7
    }
  })

  const item5 = await prisma.inventoryItem.create({
    data: {
      name: "Audience",
      alternateNames: "",
      description: "Public forward message popular.",
      isActive: false,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item5.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item5.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item5.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item5.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item5.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item5.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item5.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item5.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item5.id,
      dayOfWeek: 6,
      amount: 1
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item5.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 1.39
    }
  })

  const item6 = await prisma.inventoryItem.create({
    data: {
      name: "Action",
      alternateNames: "Adult, Room",
      description: "History step practice someone vote.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item6.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item6.id,
      dayOfWeek: 0,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item6.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item6.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item6.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item6.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item6.id,
      dayOfWeek: 5,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item6.id,
      dayOfWeek: 6,
      amount: 6
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item6.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.23
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item6.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "each" } }))!.id,
      conversionRate: 0.31
    }
  })

  const item7 = await prisma.inventoryItem.create({
    data: {
      name: "Often",
      alternateNames: "Skill",
      description: "War same stuff.",
      isActive: false,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item7.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item7.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item7.id,
      dayOfWeek: 0,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item7.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item7.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item7.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item7.id,
      dayOfWeek: 4,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item7.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item7.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item8 = await prisma.inventoryItem.create({
    data: {
      name: "Final",
      alternateNames: "",
      description: "Daughter nor avoid event.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item8.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item8.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item8.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item8.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item8.id,
      dayOfWeek: 3,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item8.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item8.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item8.id,
      dayOfWeek: 6,
      amount: 2
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item8.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 2.05
    }
  })

  const item9 = await prisma.inventoryItem.create({
    data: {
      name: "Once",
      alternateNames: "For, It",
      description: "Respond development during now really pattern either.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item9.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item9.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item9.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item9.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item9.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item9.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item9.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item9.id,
      dayOfWeek: 6,
      amount: 8
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item9.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 1.71
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item9.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 0.36
    }
  })

  const item10 = await prisma.inventoryItem.create({
    data: {
      name: "Sound",
      alternateNames: "",
      description: "Ago along answer that lose.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item10.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item10.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item10.id,
      dayOfWeek: 0,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item10.id,
      dayOfWeek: 1,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item10.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item10.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item10.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item10.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item10.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item11 = await prisma.inventoryItem.create({
    data: {
      name: "That",
      alternateNames: "Off",
      description: "Sister popular several give their friend pressure.",
      isActive: false,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item11.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item11.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item11.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item11.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item11.id,
      dayOfWeek: 2,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item11.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item11.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item11.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item11.id,
      dayOfWeek: 6,
      amount: 9
    }
  })

  const item12 = await prisma.inventoryItem.create({
    data: {
      name: "Water",
      alternateNames: "",
      description: "Agreement detail may finish here suffer party yourself.",
      isActive: false,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item12.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item12.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item12.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item12.id,
      dayOfWeek: 1,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item12.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item12.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item12.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item12.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item12.id,
      dayOfWeek: 6,
      amount: 9
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item12.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.65
    }
  })

  const item13 = await prisma.inventoryItem.create({
    data: {
      name: "Clearly",
      alternateNames: "",
      description: "Whole whatever piece trouble within raise.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item13.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item13.id,
      dayOfWeek: 0,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item13.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item13.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item13.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item13.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item13.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item13.id,
      dayOfWeek: 6,
      amount: 9
    }
  })

  const item14 = await prisma.inventoryItem.create({
    data: {
      name: "Military",
      alternateNames: "Environmental",
      description: "Every big senior boy.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item14.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item14.id,
      dayOfWeek: 0,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item14.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item14.id,
      dayOfWeek: 2,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item14.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item14.id,
      dayOfWeek: 4,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item14.id,
      dayOfWeek: 5,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item14.id,
      dayOfWeek: 6,
      amount: 7
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item14.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 1.04
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item14.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 2.06
    }
  })

  const item15 = await prisma.inventoryItem.create({
    data: {
      name: "Form",
      alternateNames: "Window",
      description: "View close home already.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item15.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item15.id,
      dayOfWeek: 0,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item15.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item15.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item15.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item15.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item15.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item15.id,
      dayOfWeek: 6,
      amount: 8
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item15.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 1.36
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item15.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 2.82
    }
  })

  const item16 = await prisma.inventoryItem.create({
    data: {
      name: "However",
      alternateNames: "Rock, Safe",
      description: "Test value side work back before.",
      isActive: true,
      category: { connect: { name: "Seafood" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item16.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item16.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item16.id,
      dayOfWeek: 0,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item16.id,
      dayOfWeek: 1,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item16.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item16.id,
      dayOfWeek: 3,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item16.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item16.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item16.id,
      dayOfWeek: 6,
      amount: 10
    }
  })

  const item17 = await prisma.inventoryItem.create({
    data: {
      name: "Most",
      alternateNames: "Second",
      description: "Million water final operation dream last many.",
      isActive: false,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item17.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item17.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item17.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item17.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item17.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item17.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item17.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item17.id,
      dayOfWeek: 6,
      amount: 2
    }
  })

  const item18 = await prisma.inventoryItem.create({
    data: {
      name: "Wife",
      alternateNames: "",
      description: "Resource time home.",
      isActive: true,
      category: { connect: { name: "Seafood" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item18.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item18.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item18.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item18.id,
      dayOfWeek: 1,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item18.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item18.id,
      dayOfWeek: 3,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item18.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item18.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item18.id,
      dayOfWeek: 6,
      amount: 4
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item18.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "each" } }))!.id,
      conversionRate: 2.25
    }
  })

  const item19 = await prisma.inventoryItem.create({
    data: {
      name: "Trouble",
      alternateNames: "",
      description: "Travel believe foot Republican feeling.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item19.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item19.id,
      dayOfWeek: 0,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item19.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item19.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item19.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item19.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item19.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item19.id,
      dayOfWeek: 6,
      amount: 0
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item19.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 2.69
    }
  })

  const item20 = await prisma.inventoryItem.create({
    data: {
      name: "Among",
      alternateNames: "",
      description: "Travel within fund investment.",
      isActive: false,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item20.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item20.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item20.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item20.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item20.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item20.id,
      dayOfWeek: 4,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item20.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item20.id,
      dayOfWeek: 6,
      amount: 0
    }
  })

  const item21 = await prisma.inventoryItem.create({
    data: {
      name: "Nature",
      alternateNames: "Man, Step",
      description: "Management fast power.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item21.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item21.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item21.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item21.id,
      dayOfWeek: 2,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item21.id,
      dayOfWeek: 3,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item21.id,
      dayOfWeek: 4,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item21.id,
      dayOfWeek: 5,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item21.id,
      dayOfWeek: 6,
      amount: 6
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item21.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 1.86
    }
  })

  const item22 = await prisma.inventoryItem.create({
    data: {
      name: "Position",
      alternateNames: "",
      description: "Leg bad rock example.",
      isActive: false,
      category: { connect: { name: "Seafood" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item22.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item22.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item22.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item22.id,
      dayOfWeek: 2,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item22.id,
      dayOfWeek: 3,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item22.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item22.id,
      dayOfWeek: 5,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item22.id,
      dayOfWeek: 6,
      amount: 4
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item22.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.86
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item22.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 0.43
    }
  })

  const item23 = await prisma.inventoryItem.create({
    data: {
      name: "Behind",
      alternateNames: "",
      description: "Build recognize data tough your seek.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item23.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item23.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item23.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item23.id,
      dayOfWeek: 1,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item23.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item23.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item23.id,
      dayOfWeek: 4,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item23.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item23.id,
      dayOfWeek: 6,
      amount: 3
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item23.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 2.02
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item23.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 0.47
    }
  })

  const item24 = await prisma.inventoryItem.create({
    data: {
      name: "Tell",
      alternateNames: "",
      description: "Unit suffer miss interest blue heavy away.",
      isActive: false,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item24.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item24.id,
      dayOfWeek: 0,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item24.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item24.id,
      dayOfWeek: 2,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item24.id,
      dayOfWeek: 3,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item24.id,
      dayOfWeek: 4,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item24.id,
      dayOfWeek: 5,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item24.id,
      dayOfWeek: 6,
      amount: 6
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item24.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 0.96
    }
  })

  const item25 = await prisma.inventoryItem.create({
    data: {
      name: "Sea",
      alternateNames: "Economy",
      description: "Sister for director almost need.",
      isActive: false,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item25.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item25.id,
      dayOfWeek: 0,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item25.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item25.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item25.id,
      dayOfWeek: 3,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item25.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item25.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item25.id,
      dayOfWeek: 6,
      amount: 0
    }
  })

  const item26 = await prisma.inventoryItem.create({
    data: {
      name: "Her",
      alternateNames: "",
      description: "Result argue wind.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item26.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item26.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item26.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item26.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item26.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item26.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item26.id,
      dayOfWeek: 5,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item26.id,
      dayOfWeek: 6,
      amount: 7
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item26.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 1.21
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item26.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.62
    }
  })

  const item27 = await prisma.inventoryItem.create({
    data: {
      name: "Structure",
      alternateNames: "Our",
      description: "Return within detail focus.",
      isActive: true,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item27.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item27.id,
      dayOfWeek: 0,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item27.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item27.id,
      dayOfWeek: 2,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item27.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item27.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item27.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item27.id,
      dayOfWeek: 6,
      amount: 6
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item27.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 2.15
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item27.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 0.86
    }
  })

  const item28 = await prisma.inventoryItem.create({
    data: {
      name: "Agreement",
      alternateNames: "Left, Physical",
      description: "Even everyone she ok stay seem.",
      isActive: false,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item28.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item28.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item28.id,
      dayOfWeek: 1,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item28.id,
      dayOfWeek: 2,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item28.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item28.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item28.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item28.id,
      dayOfWeek: 6,
      amount: 2
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item28.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.47
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item28.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.97
    }
  })

  const item29 = await prisma.inventoryItem.create({
    data: {
      name: "Market",
      alternateNames: "",
      description: "Result research travel reason live color piece.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item29.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item29.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item29.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item29.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item29.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item29.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item29.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item29.id,
      dayOfWeek: 5,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item29.id,
      dayOfWeek: 6,
      amount: 5
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item29.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.04
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item29.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 0.94
    }
  })

  const item30 = await prisma.inventoryItem.create({
    data: {
      name: "Moment",
      alternateNames: "",
      description: "Performance total election machine.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item30.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item30.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item30.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item30.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item30.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item30.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item30.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item30.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item30.id,
      dayOfWeek: 6,
      amount: 9
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item30.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "each" } }))!.id,
      conversionRate: 2.72
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item30.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 1.08
    }
  })

  const item31 = await prisma.inventoryItem.create({
    data: {
      name: "True",
      alternateNames: "",
      description: "Cultural fish civil great begin.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item31.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item31.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item31.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item31.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item31.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item31.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item31.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item31.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item31.id,
      dayOfWeek: 6,
      amount: 7
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item31.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 1.69
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item31.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.97
    }
  })

  const item32 = await prisma.inventoryItem.create({
    data: {
      name: "Myself",
      alternateNames: "",
      description: "Claim opportunity whatever police moment time hard.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item32.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item32.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item32.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item32.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item32.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item32.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item32.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item32.id,
      dayOfWeek: 6,
      amount: 7
    }
  })

  const item33 = await prisma.inventoryItem.create({
    data: {
      name: "System",
      alternateNames: "Almost",
      description: "Bill standard line.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item33.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item33.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item33.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item33.id,
      dayOfWeek: 2,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item33.id,
      dayOfWeek: 3,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item33.id,
      dayOfWeek: 4,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item33.id,
      dayOfWeek: 5,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item33.id,
      dayOfWeek: 6,
      amount: 7
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item33.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.48
    }
  })

  const item34 = await prisma.inventoryItem.create({
    data: {
      name: "Upon",
      alternateNames: "Tough, Born",
      description: "By son total wrong lead.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item34.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item34.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item34.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item34.id,
      dayOfWeek: 2,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item34.id,
      dayOfWeek: 3,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item34.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item34.id,
      dayOfWeek: 5,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item34.id,
      dayOfWeek: 6,
      amount: 7
    }
  })

  const item35 = await prisma.inventoryItem.create({
    data: {
      name: "Bed",
      alternateNames: "",
      description: "Local audience magazine able red ready tonight.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item35.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item35.id,
      dayOfWeek: 0,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item35.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item35.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item35.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item35.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item35.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item35.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item36 = await prisma.inventoryItem.create({
    data: {
      name: "Mission",
      alternateNames: "",
      description: "Including a car several.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item36.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item36.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item36.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item36.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item36.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item36.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item36.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item36.id,
      dayOfWeek: 6,
      amount: 5
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item36.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 1.18
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item36.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.81
    }
  })

  const item37 = await prisma.inventoryItem.create({
    data: {
      name: "Sure",
      alternateNames: "",
      description: "Run rather public again defense smile door.",
      isActive: true,
      category: { connect: { name: "Seafood" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item37.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item37.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item37.id,
      dayOfWeek: 1,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item37.id,
      dayOfWeek: 2,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item37.id,
      dayOfWeek: 3,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item37.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item37.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item37.id,
      dayOfWeek: 6,
      amount: 9
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item37.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.94
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item37.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.84
    }
  })

  const item38 = await prisma.inventoryItem.create({
    data: {
      name: "Sport",
      alternateNames: "",
      description: "Despite water center ever partner make food enjoy.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item38.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item38.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item38.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item38.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item38.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item38.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item38.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item38.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item38.id,
      dayOfWeek: 6,
      amount: 1
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item38.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "each" } }))!.id,
      conversionRate: 2.64
    }
  })

  const item39 = await prisma.inventoryItem.create({
    data: {
      name: "Away",
      alternateNames: "",
      description: "Oil wait large country parent community would heart.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item39.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item39.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item39.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item39.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item39.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item39.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item39.id,
      dayOfWeek: 5,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item39.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item40 = await prisma.inventoryItem.create({
    data: {
      name: "Adult",
      alternateNames: "Bed",
      description: "Capital reflect member trial provide city report.",
      isActive: true,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item40.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item40.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item40.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item40.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item40.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item40.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item40.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item40.id,
      dayOfWeek: 5,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item40.id,
      dayOfWeek: 6,
      amount: 0
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item40.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 0.55
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item40.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 1.51
    }
  })

  const item41 = await prisma.inventoryItem.create({
    data: {
      name: "Bit",
      alternateNames: "",
      description: "End tend nothing pull federal job season.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item41.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item41.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item41.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item41.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item41.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item41.id,
      dayOfWeek: 4,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item41.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item41.id,
      dayOfWeek: 6,
      amount: 7
    }
  })

  const item42 = await prisma.inventoryItem.create({
    data: {
      name: "When",
      alternateNames: "",
      description: "Military life feeling effect.",
      isActive: false,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item42.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item42.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item42.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item42.id,
      dayOfWeek: 2,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item42.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item42.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item42.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item42.id,
      dayOfWeek: 6,
      amount: 8
    }
  })

  const item43 = await prisma.inventoryItem.create({
    data: {
      name: "About",
      alternateNames: "",
      description: "Subject money six.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item43.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item43.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item43.id,
      dayOfWeek: 0,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item43.id,
      dayOfWeek: 1,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item43.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item43.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item43.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item43.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item43.id,
      dayOfWeek: 6,
      amount: 0
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item43.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 0.65
    }
  })

  const item44 = await prisma.inventoryItem.create({
    data: {
      name: "Team",
      alternateNames: "",
      description: "Especially best have two walk black.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item44.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item44.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item44.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item44.id,
      dayOfWeek: 1,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item44.id,
      dayOfWeek: 2,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item44.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item44.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item44.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item44.id,
      dayOfWeek: 6,
      amount: 6
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item44.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 2.78
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item44.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 0.95
    }
  })

  const item45 = await prisma.inventoryItem.create({
    data: {
      name: "Piece",
      alternateNames: "",
      description: "Along happen agree lead sure outside field.",
      isActive: true,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item45.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item45.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item45.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item45.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item45.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item45.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item45.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item45.id,
      dayOfWeek: 6,
      amount: 2
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item45.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 2.79
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item45.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 2.06
    }
  })

  const item46 = await prisma.inventoryItem.create({
    data: {
      name: "Financial",
      alternateNames: "",
      description: "Theory maybe behavior.",
      isActive: false,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item46.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item46.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item46.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item46.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item46.id,
      dayOfWeek: 3,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item46.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item46.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item46.id,
      dayOfWeek: 6,
      amount: 6
    }
  })

  const item47 = await prisma.inventoryItem.create({
    data: {
      name: "Attorney",
      alternateNames: "",
      description: "Radio mission close person.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item47.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item47.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item47.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item47.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item47.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item47.id,
      dayOfWeek: 4,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item47.id,
      dayOfWeek: 5,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item47.id,
      dayOfWeek: 6,
      amount: 2
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item47.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 0.29
    }
  })

  const item48 = await prisma.inventoryItem.create({
    data: {
      name: "Current",
      alternateNames: "",
      description: "Should remember also traditional develop.",
      isActive: false,
      category: { connect: { name: "Seafood" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item48.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item48.id,
      dayOfWeek: 0,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item48.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item48.id,
      dayOfWeek: 2,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item48.id,
      dayOfWeek: 3,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item48.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item48.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item48.id,
      dayOfWeek: 6,
      amount: 9
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item48.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 2.0
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item48.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.39
    }
  })

  const item49 = await prisma.inventoryItem.create({
    data: {
      name: "Herself",
      alternateNames: "Decision, Easy",
      description: "Real fact feel view hospital offer.",
      isActive: true,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item49.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item49.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item49.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item49.id,
      dayOfWeek: 1,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item49.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item49.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item49.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item49.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item49.id,
      dayOfWeek: 6,
      amount: 2
    }
  })

  const item50 = await prisma.inventoryItem.create({
    data: {
      name: "Later",
      alternateNames: "",
      description: "These discover left.",
      isActive: false,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item50.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item50.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item50.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item50.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item50.id,
      dayOfWeek: 2,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item50.id,
      dayOfWeek: 3,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item50.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item50.id,
      dayOfWeek: 5,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item50.id,
      dayOfWeek: 6,
      amount: 7
    }
  })

  const item51 = await prisma.inventoryItem.create({
    data: {
      name: "Already",
      alternateNames: "Mind, You",
      description: "Information watch organization begin single threat before.",
      isActive: false,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item51.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item51.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item51.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item51.id,
      dayOfWeek: 1,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item51.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item51.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item51.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item51.id,
      dayOfWeek: 5,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item51.id,
      dayOfWeek: 6,
      amount: 4
    }
  })

  const item52 = await prisma.inventoryItem.create({
    data: {
      name: "Rule",
      alternateNames: "",
      description: "Republican yeah man letter.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item52.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item52.id,
      dayOfWeek: 0,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item52.id,
      dayOfWeek: 1,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item52.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item52.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item52.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item52.id,
      dayOfWeek: 5,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item52.id,
      dayOfWeek: 6,
      amount: 10
    }
  })

  const item53 = await prisma.inventoryItem.create({
    data: {
      name: "Maybe",
      alternateNames: "Before",
      description: "Network party economic imagine raise only represent.",
      isActive: false,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item53.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item53.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item53.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item53.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item53.id,
      dayOfWeek: 3,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item53.id,
      dayOfWeek: 4,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item53.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item53.id,
      dayOfWeek: 6,
      amount: 6
    }
  })

  const item54 = await prisma.inventoryItem.create({
    data: {
      name: "Pick",
      alternateNames: "",
      description: "Western next really group task.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item54.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item54.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item54.id,
      dayOfWeek: 0,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item54.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item54.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item54.id,
      dayOfWeek: 3,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item54.id,
      dayOfWeek: 4,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item54.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item54.id,
      dayOfWeek: 6,
      amount: 9
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item54.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 1.2
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item54.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 1.09
    }
  })

  const item55 = await prisma.inventoryItem.create({
    data: {
      name: "Heavy",
      alternateNames: "Either, Research",
      description: "Indeed water despite matter five agree nothing camera.",
      isActive: false,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item55.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item55.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item55.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item55.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item55.id,
      dayOfWeek: 2,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item55.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item55.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item55.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item55.id,
      dayOfWeek: 6,
      amount: 10
    }
  })

  const item56 = await prisma.inventoryItem.create({
    data: {
      name: "Protect",
      alternateNames: "Why, Exist",
      description: "Table rate woman blood reality cut foreign.",
      isActive: true,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item56.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item56.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item56.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item56.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item56.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item56.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item56.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item56.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item56.id,
      dayOfWeek: 6,
      amount: 4
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item56.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.92
    }
  })

  const item57 = await prisma.inventoryItem.create({
    data: {
      name: "Concern",
      alternateNames: "",
      description: "Such sea rise whether more yard yes.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item57.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item57.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item57.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item57.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item57.id,
      dayOfWeek: 2,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item57.id,
      dayOfWeek: 3,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item57.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item57.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item57.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item58 = await prisma.inventoryItem.create({
    data: {
      name: "Get",
      alternateNames: "Skill, Participant",
      description: "Inside happen choice involve.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item58.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item58.id,
      dayOfWeek: 0,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item58.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item58.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item58.id,
      dayOfWeek: 3,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item58.id,
      dayOfWeek: 4,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item58.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item58.id,
      dayOfWeek: 6,
      amount: 10
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item58.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "each" } }))!.id,
      conversionRate: 2.04
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item58.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "each" } }))!.id,
      conversionRate: 1.01
    }
  })

  const item59 = await prisma.inventoryItem.create({
    data: {
      name: "Lead",
      alternateNames: "Form, Body",
      description: "Hot week thus oil.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item59.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item59.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item59.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item59.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item59.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item59.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item59.id,
      dayOfWeek: 4,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item59.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item59.id,
      dayOfWeek: 6,
      amount: 9
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item59.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 2.88
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item59.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.48
    }
  })

  const item60 = await prisma.inventoryItem.create({
    data: {
      name: "Operation",
      alternateNames: "Car, Family",
      description: "Make assume help.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item60.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item60.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item60.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item60.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item60.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item60.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item60.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item60.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item60.id,
      dayOfWeek: 6,
      amount: 6
    }
  })

  const item61 = await prisma.inventoryItem.create({
    data: {
      name: "Night",
      alternateNames: "",
      description: "Product little compare someone huge half.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item61.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item61.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item61.id,
      dayOfWeek: 1,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item61.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item61.id,
      dayOfWeek: 3,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item61.id,
      dayOfWeek: 4,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item61.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item61.id,
      dayOfWeek: 6,
      amount: 10
    }
  })

  const item62 = await prisma.inventoryItem.create({
    data: {
      name: "Despite",
      alternateNames: "Role",
      description: "Industry wish season another.",
      isActive: false,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item62.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item62.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item62.id,
      dayOfWeek: 0,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item62.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item62.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item62.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item62.id,
      dayOfWeek: 4,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item62.id,
      dayOfWeek: 5,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item62.id,
      dayOfWeek: 6,
      amount: 5
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item62.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 2.73
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item62.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.87
    }
  })

  const item63 = await prisma.inventoryItem.create({
    data: {
      name: "Local",
      alternateNames: "",
      description: "True foot let pay poor.",
      isActive: true,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item63.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item63.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item63.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item63.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item63.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item63.id,
      dayOfWeek: 4,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item63.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item63.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item64 = await prisma.inventoryItem.create({
    data: {
      name: "Suffer",
      alternateNames: "Hand, Season",
      description: "Goal quite practice next course issue.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item64.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item64.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item64.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item64.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item64.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item64.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item64.id,
      dayOfWeek: 4,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item64.id,
      dayOfWeek: 5,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item64.id,
      dayOfWeek: 6,
      amount: 6
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item64.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 1.36
    }
  })

  const item65 = await prisma.inventoryItem.create({
    data: {
      name: "Attention",
      alternateNames: "",
      description: "Share son finish clear support lay able.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item65.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item65.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item65.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item65.id,
      dayOfWeek: 2,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item65.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item65.id,
      dayOfWeek: 4,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item65.id,
      dayOfWeek: 5,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item65.id,
      dayOfWeek: 6,
      amount: 4
    }
  })

  const item66 = await prisma.inventoryItem.create({
    data: {
      name: "Near",
      alternateNames: "Phone",
      description: "Trial oil training easy series crime.",
      isActive: false,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item66.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item66.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item66.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item66.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item66.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item66.id,
      dayOfWeek: 3,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item66.id,
      dayOfWeek: 4,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item66.id,
      dayOfWeek: 5,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item66.id,
      dayOfWeek: 6,
      amount: 8
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item66.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 1.54
    }
  })

  const item67 = await prisma.inventoryItem.create({
    data: {
      name: "Month",
      alternateNames: "Door, Hit",
      description: "Anything wind maybe fill body look.",
      isActive: false,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item67.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item67.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item67.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item67.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item67.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item67.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item67.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item67.id,
      dayOfWeek: 6,
      amount: 4
    }
  })

  const item68 = await prisma.inventoryItem.create({
    data: {
      name: "Condition",
      alternateNames: "Single, Court",
      description: "Agreement everything company safe production their.",
      isActive: true,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item68.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item68.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item68.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item68.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item68.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item68.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item68.id,
      dayOfWeek: 4,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item68.id,
      dayOfWeek: 5,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item68.id,
      dayOfWeek: 6,
      amount: 2
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item68.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "each" } }))!.id,
      conversionRate: 2.35
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item68.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 0.79
    }
  })

  const item69 = await prisma.inventoryItem.create({
    data: {
      name: "Go",
      alternateNames: "",
      description: "Skin offer thousand federal usually consumer.",
      isActive: false,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item69.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item69.id,
      dayOfWeek: 0,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item69.id,
      dayOfWeek: 1,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item69.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item69.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item69.id,
      dayOfWeek: 4,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item69.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item69.id,
      dayOfWeek: 6,
      amount: 3
    }
  })

  const item70 = await prisma.inventoryItem.create({
    data: {
      name: "Next",
      alternateNames: "",
      description: "Draw fear save city those plant general.",
      isActive: false,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item70.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item70.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item70.id,
      dayOfWeek: 1,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item70.id,
      dayOfWeek: 2,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item70.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item70.id,
      dayOfWeek: 4,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item70.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item70.id,
      dayOfWeek: 6,
      amount: 0
    }
  })

  const item71 = await prisma.inventoryItem.create({
    data: {
      name: "Country",
      alternateNames: "Find",
      description: "Mrs return start the green party major.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item71.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item71.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item71.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item71.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item71.id,
      dayOfWeek: 2,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item71.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item71.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item71.id,
      dayOfWeek: 5,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item71.id,
      dayOfWeek: 6,
      amount: 2
    }
  })

  const item72 = await prisma.inventoryItem.create({
    data: {
      name: "South",
      alternateNames: "Chair, Level",
      description: "Among difficult life nor instead.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item72.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item72.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item72.id,
      dayOfWeek: 0,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item72.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item72.id,
      dayOfWeek: 2,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item72.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item72.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item72.id,
      dayOfWeek: 5,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item72.id,
      dayOfWeek: 6,
      amount: 3
    }
  })

  const item73 = await prisma.inventoryItem.create({
    data: {
      name: "Land",
      alternateNames: "Provide, Trouble",
      description: "Her certain performance age.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item73.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item73.id,
      dayOfWeek: 0,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item73.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item73.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item73.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item73.id,
      dayOfWeek: 4,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item73.id,
      dayOfWeek: 5,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item73.id,
      dayOfWeek: 6,
      amount: 2
    }
  })

  const item74 = await prisma.inventoryItem.create({
    data: {
      name: "Bring",
      alternateNames: "Use, Identify",
      description: "Individual nice music oil able.",
      isActive: false,
      category: { connect: { name: "Seafood" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item74.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item74.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item74.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item74.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item74.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item74.id,
      dayOfWeek: 4,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item74.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item74.id,
      dayOfWeek: 6,
      amount: 2
    }
  })

  const item75 = await prisma.inventoryItem.create({
    data: {
      name: "Measure",
      alternateNames: "",
      description: "Relationship let practice treat.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item75.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item75.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item75.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item75.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item75.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item75.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item75.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item75.id,
      dayOfWeek: 6,
      amount: 4
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item75.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.67
    }
  })

  const item76 = await prisma.inventoryItem.create({
    data: {
      name: "Unit",
      alternateNames: "",
      description: "Without window security party my need reduce.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item76.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item76.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item76.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item76.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item76.id,
      dayOfWeek: 3,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item76.id,
      dayOfWeek: 4,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item76.id,
      dayOfWeek: 5,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item76.id,
      dayOfWeek: 6,
      amount: 9
    }
  })

  const item77 = await prisma.inventoryItem.create({
    data: {
      name: "Public",
      alternateNames: "",
      description: "Upon everyone exactly language board stay cold time.",
      isActive: false,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item77.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item77.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item77.id,
      dayOfWeek: 1,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item77.id,
      dayOfWeek: 2,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item77.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item77.id,
      dayOfWeek: 4,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item77.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item77.id,
      dayOfWeek: 6,
      amount: 5
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item77.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 0.62
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item77.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 2.12
    }
  })

  const item78 = await prisma.inventoryItem.create({
    data: {
      name: "Check",
      alternateNames: "",
      description: "Across physical teacher say improve break.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item78.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item78.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item78.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item78.id,
      dayOfWeek: 2,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item78.id,
      dayOfWeek: 3,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item78.id,
      dayOfWeek: 4,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item78.id,
      dayOfWeek: 5,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item78.id,
      dayOfWeek: 6,
      amount: 2
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item78.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 2.05
    }
  })

  const item79 = await prisma.inventoryItem.create({
    data: {
      name: "Maintain",
      alternateNames: "",
      description: "Song make benefit down we food later return.",
      isActive: true,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item79.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item79.id,
      dayOfWeek: 0,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item79.id,
      dayOfWeek: 1,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item79.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item79.id,
      dayOfWeek: 3,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item79.id,
      dayOfWeek: 4,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item79.id,
      dayOfWeek: 5,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item79.id,
      dayOfWeek: 6,
      amount: 3
    }
  })

  const item80 = await prisma.inventoryItem.create({
    data: {
      name: "Direction",
      alternateNames: "Want, Evening",
      description: "Else nor authority know worry similar trip.",
      isActive: false,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item80.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item80.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item80.id,
      dayOfWeek: 0,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item80.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item80.id,
      dayOfWeek: 2,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item80.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item80.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item80.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item80.id,
      dayOfWeek: 6,
      amount: 4
    }
  })

  const item81 = await prisma.inventoryItem.create({
    data: {
      name: "Game",
      alternateNames: "",
      description: "Accept themselves resource religious scientist low soon possible.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item81.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item81.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item81.id,
      dayOfWeek: 0,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item81.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item81.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item81.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item81.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item81.id,
      dayOfWeek: 5,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item81.id,
      dayOfWeek: 6,
      amount: 0
    }
  })

  const item82 = await prisma.inventoryItem.create({
    data: {
      name: "Five",
      alternateNames: "Owner",
      description: "Law address education hear.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item82.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item82.id,
      dayOfWeek: 0,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item82.id,
      dayOfWeek: 1,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item82.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item82.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item82.id,
      dayOfWeek: 4,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item82.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item82.id,
      dayOfWeek: 6,
      amount: 10
    }
  })

  const item83 = await prisma.inventoryItem.create({
    data: {
      name: "Happy",
      alternateNames: "",
      description: "Glass state to really time season beautiful.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item83.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item83.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item83.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item83.id,
      dayOfWeek: 2,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item83.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item83.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item83.id,
      dayOfWeek: 5,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item83.id,
      dayOfWeek: 6,
      amount: 1
    }
  })

  const item84 = await prisma.inventoryItem.create({
    data: {
      name: "Ready",
      alternateNames: "About",
      description: "Nice herself deep growth military woman away travel.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item84.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item84.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item84.id,
      dayOfWeek: 1,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item84.id,
      dayOfWeek: 2,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item84.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item84.id,
      dayOfWeek: 4,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item84.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item84.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item85 = await prisma.inventoryItem.create({
    data: {
      name: "Call",
      alternateNames: "",
      description: "Bit everything teach wear project hospital.",
      isActive: false,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item85.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item85.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item85.id,
      dayOfWeek: 1,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item85.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item85.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item85.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item85.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item85.id,
      dayOfWeek: 6,
      amount: 8
    }
  })

  const item86 = await prisma.inventoryItem.create({
    data: {
      name: "Important",
      alternateNames: "",
      description: "Group particularly energy significant newspaper success reflect establish.",
      isActive: true,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item86.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item86.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item86.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item86.id,
      dayOfWeek: 1,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item86.id,
      dayOfWeek: 2,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item86.id,
      dayOfWeek: 3,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item86.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item86.id,
      dayOfWeek: 5,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item86.id,
      dayOfWeek: 6,
      amount: 10
    }
  })

  const item87 = await prisma.inventoryItem.create({
    data: {
      name: "White",
      alternateNames: "",
      description: "This public believe test increase above senior.",
      isActive: false,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item87.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item87.id,
      dayOfWeek: 0,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item87.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item87.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item87.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item87.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item87.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item87.id,
      dayOfWeek: 6,
      amount: 5
    }
  })

  const item88 = await prisma.inventoryItem.create({
    data: {
      name: "Least",
      alternateNames: "",
      description: "Gas it production offer.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item88.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item88.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item88.id,
      dayOfWeek: 0,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item88.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item88.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item88.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item88.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item88.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item88.id,
      dayOfWeek: 6,
      amount: 6
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item88.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 1.88
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item88.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 2.91
    }
  })

  const item89 = await prisma.inventoryItem.create({
    data: {
      name: "Member",
      alternateNames: "",
      description: "Have early rule year small.",
      isActive: true,
      category: { connect: { name: "Dairy" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item89.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item89.id,
      dayOfWeek: 0,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item89.id,
      dayOfWeek: 1,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item89.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item89.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item89.id,
      dayOfWeek: 4,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item89.id,
      dayOfWeek: 5,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item89.id,
      dayOfWeek: 6,
      amount: 10
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item89.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 0.53
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item89.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 0.25
    }
  })

  const item90 = await prisma.inventoryItem.create({
    data: {
      name: "Article",
      alternateNames: "Fish",
      description: "Note book hear camera full cut onto.",
      isActive: false,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "case" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item90.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item90.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item90.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item90.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item90.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item90.id,
      dayOfWeek: 3,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item90.id,
      dayOfWeek: 4,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item90.id,
      dayOfWeek: 5,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item90.id,
      dayOfWeek: 6,
      amount: 4
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item90.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 0.76
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item90.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 2.74
    }
  })

  const item91 = await prisma.inventoryItem.create({
    data: {
      name: "Particularly",
      alternateNames: "",
      description: "Case mouth task create size your create help.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item91.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item91.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item91.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item91.id,
      dayOfWeek: 1,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item91.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item91.id,
      dayOfWeek: 3,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item91.id,
      dayOfWeek: 4,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item91.id,
      dayOfWeek: 5,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item91.id,
      dayOfWeek: 6,
      amount: 1
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item91.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 2.84
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item91.id,
      name: "Shredded",
      unitId: (await prisma.unit.findUnique({ where: { name: "box" } }))!.id,
      conversionRate: 2.45
    }
  })

  const item92 = await prisma.inventoryItem.create({
    data: {
      name: "Thank",
      alternateNames: "Out",
      description: "Treat number former dark.",
      isActive: true,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item92.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item92.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item92.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item92.id,
      dayOfWeek: 1,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item92.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item92.id,
      dayOfWeek: 3,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item92.id,
      dayOfWeek: 4,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item92.id,
      dayOfWeek: 5,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item92.id,
      dayOfWeek: 6,
      amount: 1
    }
  })

  const item93 = await prisma.inventoryItem.create({
    data: {
      name: "Customer",
      alternateNames: "Heart",
      description: "Discussion north position check see large.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "pack" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item93.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item93.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item93.id,
      dayOfWeek: 0,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item93.id,
      dayOfWeek: 1,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item93.id,
      dayOfWeek: 2,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item93.id,
      dayOfWeek: 3,
      amount: 7
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item93.id,
      dayOfWeek: 4,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item93.id,
      dayOfWeek: 5,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item93.id,
      dayOfWeek: 6,
      amount: 0
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item93.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.73
    }
  })

  const item94 = await prisma.inventoryItem.create({
    data: {
      name: "Letter",
      alternateNames: "Whom, Mouth",
      description: "Maintain stuff manager sing gas.",
      isActive: true,
      category: { connect: { name: "Dry Goods" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item94.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item94.id,
      dayOfWeek: 0,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item94.id,
      dayOfWeek: 1,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item94.id,
      dayOfWeek: 2,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item94.id,
      dayOfWeek: 3,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item94.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item94.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item94.id,
      dayOfWeek: 6,
      amount: 7
    }
  })

  const item95 = await prisma.inventoryItem.create({
    data: {
      name: "Quite",
      alternateNames: "",
      description: "Strategy provide town spend.",
      isActive: true,
      category: { connect: { name: "Bakery" } },
      unit: { connect: { name: "each" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item95.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item95.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item95.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item95.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item95.id,
      dayOfWeek: 2,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item95.id,
      dayOfWeek: 3,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item95.id,
      dayOfWeek: 4,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item95.id,
      dayOfWeek: 5,
      amount: 3
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item95.id,
      dayOfWeek: 6,
      amount: 7
    }
  })

  const item96 = await prisma.inventoryItem.create({
    data: {
      name: "Draw",
      alternateNames: "",
      description: "Television but the baby standard available.",
      isActive: true,
      category: { connect: { name: "Meat" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item96.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item96.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item96.id,
      dayOfWeek: 0,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item96.id,
      dayOfWeek: 1,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item96.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item96.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item96.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item96.id,
      dayOfWeek: 5,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item96.id,
      dayOfWeek: 6,
      amount: 1
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item96.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 1.75
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item96.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "each" } }))!.id,
      conversionRate: 2.58
    }
  })

  const item97 = await prisma.inventoryItem.create({
    data: {
      name: "Window",
      alternateNames: "",
      description: "Along husband big agency future sea sport.",
      isActive: true,
      category: { connect: { name: "Spices" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item97.id,
      locationId: "loc1"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item97.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item97.id,
      dayOfWeek: 0,
      amount: 6
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item97.id,
      dayOfWeek: 1,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item97.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item97.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item97.id,
      dayOfWeek: 4,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item97.id,
      dayOfWeek: 5,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item97.id,
      dayOfWeek: 6,
      amount: 0
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item97.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "gallon" } }))!.id,
      conversionRate: 0.53
    }
  })

  const item98 = await prisma.inventoryItem.create({
    data: {
      name: "Money",
      alternateNames: "",
      description: "Sister remember discover.",
      isActive: false,
      category: { connect: { name: "Produce" } },
      unit: { connect: { name: "box" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item98.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item98.id,
      dayOfWeek: 0,
      amount: 1
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item98.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item98.id,
      dayOfWeek: 2,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item98.id,
      dayOfWeek: 3,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item98.id,
      dayOfWeek: 4,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item98.id,
      dayOfWeek: 5,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item98.id,
      dayOfWeek: 6,
      amount: 1
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item98.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.44
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item98.id,
      name: "Cubed",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 0.92
    }
  })

  const item99 = await prisma.inventoryItem.create({
    data: {
      name: "Too",
      alternateNames: "Beyond",
      description: "Outside surface rather know.",
      isActive: true,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "gallon" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item99.id,
      locationId: "loc2"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item99.id,
      dayOfWeek: 0,
      amount: 5
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item99.id,
      dayOfWeek: 1,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item99.id,
      dayOfWeek: 2,
      amount: 0
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item99.id,
      dayOfWeek: 3,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item99.id,
      dayOfWeek: 4,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item99.id,
      dayOfWeek: 5,
      amount: 8
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item99.id,
      dayOfWeek: 6,
      amount: 6
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item99.id,
      name: "Whole",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 0.48
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item99.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "pack" } }))!.id,
      conversionRate: 2.46
    }
  })

  const item100 = await prisma.inventoryItem.create({
    data: {
      name: "Prevent",
      alternateNames: "Writer, Family",
      description: "Think success quite its.",
      isActive: false,
      category: { connect: { name: "Beverages" } },
      unit: { connect: { name: "lbs" } },
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item100.id,
      locationId: "loc2"
    }
  })
  await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: item100.id,
      locationId: "loc1"
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item100.id,
      dayOfWeek: 0,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item100.id,
      dayOfWeek: 1,
      amount: 9
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item100.id,
      dayOfWeek: 2,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item100.id,
      dayOfWeek: 3,
      amount: 4
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item100.id,
      dayOfWeek: 4,
      amount: 10
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item100.id,
      dayOfWeek: 5,
      amount: 2
    }
  })
  await prisma.parLevel.create({
    data: {
      inventoryItemId: item100.id,
      dayOfWeek: 6,
      amount: 7
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item100.id,
      name: "Diced",
      unitId: (await prisma.unit.findUnique({ where: { name: "case" } }))!.id,
      conversionRate: 0.9
    }
  })
  await prisma.inventoryPrepForm.create({
    data: {
      inventoryItemId: item100.id,
      name: "Sliced",
      unitId: (await prisma.unit.findUnique({ where: { name: "lbs" } }))!.id,
      conversionRate: 2.38
    }
  })

  console.log('✅ Inventory seeded');
}
