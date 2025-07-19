import request from 'supertest';
import app from '../../src/app';
import prisma from '../../src/prisma';

jest.mock('../../src/middleware/authMiddleware', () => ({
  authenticate: (_req: any, _res: any, next: any) => next(),
}));

jest.mock('../../src/middleware/authorize', () => ({
  authorize: () => (_req: any, _res: any, next: any) => next(),
}));

describe('Role API', () => {
  let roleId: string;

  afterAll(async () => {
    await prisma.permission.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a role', async () => {
    const res = await request(app)
      .post('/api/roles')
      .send({ name: 'TestRole' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('TestRole');
    roleId = res.body.id;
  });

  it('should get list of roles', async () => {
    const res = await request(app).get('/api/roles');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get role by id', async () => {
    const res = await request(app).get(`/api/roles/${roleId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(roleId);
  });

  it('should update a role', async () => {
    const res = await request(app)
      .put(`/api/roles/${roleId}`)
      .send({ name: 'UpdatedRole' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('UpdatedRole');
  });

  it('should delete a role', async () => {
    const res = await request(app).delete(`/api/roles/${roleId}`);
    expect(res.statusCode).toBe(204);
  });
});