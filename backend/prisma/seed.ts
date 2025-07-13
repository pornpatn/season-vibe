import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  await (await import('./seeds/roles.seed')).default(prisma);
  await (await import('./seeds/permissions.seed')).default(prisma);
  await (await import('./seeds/users.seed')).default(prisma);
  console.log('✅ Seeding completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
