import { PrismaClient } from '@prisma/client';

export default async function seedRoles(prisma: PrismaClient) {
  const roleNames = ['Owner', 'Admin', 'Manager', 'Staff'];

  for (const name of roleNames) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Roles seeded');
}
