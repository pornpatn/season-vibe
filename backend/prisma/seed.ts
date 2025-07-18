import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  await (await import('./seeds/roles.seed')).default(prisma);
  await (await import('./seeds/permissions.seed')).default(prisma);
  await (await import('./seeds/users.seed')).default(prisma);

  // Inventory
  await (await import('./seeds/inventory.seed')).default(prisma);


  // // Vendor Items
  // await prisma.vendorItem.createMany({
  //   data: [
  //     { vendorId: 'vend_1', inventoryItemId: 'item_1', vendorName: 'CTK-40', vendorNote: '40lb frozen' },
  //     { vendorId: 'vend_2', inventoryItemId: 'item_2', vendorName: 'Carrot Bulk', vendorNote: '10 lb bag' }
  //   ]
  // });

  // // Vendor Orders
  // await prisma.vendorOrder.createMany({
  //   data: [
  //     {
  //       id: 'ord_1',
  //       vendorId: 'vend_1',
  //       locationId: 'loc_1',
  //       isShopping: false,
  //       expectedDate: new Date('2025-07-15'),
  //       orderedDate: new Date('2025-07-14T12:00:00'),
  //       status: 'submitted',
  //       note: 'Weekly Sysco delivery'
  //     },
  //     {
  //       id: 'ord_2',
  //       vendorId: 'vend_2',
  //       locationId: 'loc_1',
  //       isShopping: true,
  //       marketName: 'Costco (Aliso Viejo)',
  //       expectedDate: new Date('2025-07-15'),
  //       orderedDate: new Date('2025-07-15T08:00:00'),
  //       status: 'submitted',
  //       note: 'Costco restock run'
  //     }
  //   ]
  // });

  // // Vendor Order Items
  // await prisma.vendorOrderItem.createMany({
  //   data: [
  //     {
  //       vendorOrderId: 'ord_1',
  //       inventoryItemId: 'item_1',
  //       quantity: 2,
  //       unitId: 'unit_1',
  //       note: 'Fresh batch preferred'
  //     },
  //     {
  //       vendorOrderId: 'ord_2',
  //       inventoryItemId: 'item_2',
  //       quantity: 3,
  //       unitId: 'unit_2',
  //       note: 'Look for organic if possible'
  //     }
  //   ]
  // });

  console.log('✅ Seeding completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
