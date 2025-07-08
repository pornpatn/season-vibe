import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const categories = [
  'Vegetables',
  'Meats',
  'Dry Goods',
  'Beverages',
  'Frozen Items',
]

const itemNames = [
  'Carrot', 'Cabbage', 'Chicken Breast', 'Ground Pork', 'Tofu', 'Soy Sauce', 'Fish Sauce',
  'Basil', 'Bell Pepper', 'Onion', 'Garlic', 'Ginger', 'Lime', 'Lemongrass', 'Shrimp',
  'Squid', 'Green Curry Paste', 'Red Curry Paste', 'Coconut Milk', 'Peanut Butter',
  'Rice Noodles', 'Egg Noodles', 'Jasmine Rice', 'Sticky Rice', 'Palm Sugar',
  'Brown Sugar', 'Tamarind Paste', 'Chili Flakes', 'Chili Sauce', 'Fried Shallots',
  'Cashew Nut', 'Peanuts', 'Green Onion', 'Mint', 'Iceberg Lettuce', 'Cucumber',
  'Tomato', 'Corn', 'Canned Pineapple', 'Canned Lychee', 'Evaporated Milk', 'Condensed Milk',
  'Thai Iced Tea Mix', 'Coffee Powder', 'Black Tea Bags', 'Soda Water', 'Club Soda',
  'Mineral Water', 'Coconut Water', 'Soy Milk', 'Energy Drink', 'Beer', 'White Wine',
  'Red Wine', 'Whiskey', 'Ice Cubes', 'Frozen Mango', 'Frozen Coconut Meat', 'Frozen Mixed Veggies'
]

async function main() {
  // Create permissions
  const permissions = [
    { module: 'user', action: 'view' },
    { module: 'user', action: 'edit' }
  ];

  const createdPermissions = await Promise.all(
    permissions.map(p =>
      prisma.permission.upsert({
        where: { module_action: { module: p.module, action: p.action } },
        update: {},
        create: p
      })
    )
  );

  // Create admin role
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      permissions: {
        connect: createdPermissions.map(p => ({ id: p.id }))
      }
    }
  });

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password: passwordHash,
      roleId: adminRole.id
    }
  });

  // Clear old data first
  await prisma.inventoryParLevel.deleteMany()
  await prisma.inventoryItemVariant.deleteMany()
  await prisma.inventoryItem.deleteMany()
  await prisma.inventoryCategory.deleteMany()
  await prisma.unit.deleteMany()

  // Create default unit
  const defaultUnit = await prisma.unit.upsert({
    where: { name: 'each' },
    update: {},
    create: { name: 'each' },
  })

  // Create categories
  const createdCategories = await Promise.all(
    categories.map(name =>
      prisma.inventoryCategory.create({
        data: { name },
      })
    )
  )

  const categoryMap = Object.fromEntries(createdCategories.map(c => [c.name, c.id]))

  // Create inventory items
  for (let i = 0; i < itemNames.length; i++) {
    const name = itemNames[i]
    const categoryName = categories[Math.floor(Math.random() * categories.length)]
    await prisma.inventoryItem.create({
      data: {
        name,
        categoryId: categoryMap[categoryName],
        unitId: defaultUnit.id,
        isActive: true,
        displayOrder: i,
        alternateNames: `${name} alt`,
        description: `This is a description for ${name}.`,
        note: `Note for item ${name}.`,
        parLevels: {
          create: Array.from({ length: 7 }).map((_, dayOfWeek) => ({
            dayOfWeek,
            parLevel: Math.floor(Math.random() * 10 + 1),
          })),
        }
      }
    })
  }
}

main()
  .then(() => {
    console.log('✅ Seed complete')
    return prisma.$disconnect()
  })
  .catch(e => {
    console.error(e)
    return prisma.$disconnect().finally(() => process.exit(1))
  })
