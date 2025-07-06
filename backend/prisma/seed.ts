import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    { module: 'user', action: 'view' },
    { module: 'user', action: 'create' },
    { module: 'user', action: 'edit' },
    { module: 'inventory', action: 'view' },
    { module: 'inventory', action: 'edit' }
  ];

  // Create permissions
  const createdPermissions = await Promise.all(
    permissions.map(p => prisma.permission.upsert({
      where: { module_action: { module: p.module, action: p.action } },
      update: {},
      create: p
    }))
  );

  // Create Admin role
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

  // Create Owner role
  const ownerRole = await prisma.role.upsert({
    where: { name: 'Owner' },
    update: {},
    create: {
      name: 'Owner',
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
      roleId: adminRole.id,
    },
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
