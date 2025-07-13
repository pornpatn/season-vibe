import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export default async function seedUsers(prisma: PrismaClient) {
  const roles = await prisma.role.findMany();
  const roleMap = Object.fromEntries(roles.map(r => [r.name, r.id]));

  const passwordHash = await bcrypt.hash('changeme123', 10);

  const users = [
    { username: 'owner1', role: 'Owner' },
    { username: 'admin1', role: 'Admin' },
    { username: 'manager1', role: 'Manager' },
    { username: 'staff1', role: 'Staff' },
  ];

  for (const { username, role } of users) {
    await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        passwordHash,
        roleId: roleMap[role],
        isTemporaryPassword: true,
        isActive: true,
      },
    });
  }

  console.log('✅ Users seeded');
}
