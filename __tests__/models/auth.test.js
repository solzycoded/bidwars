// user.test.mjs
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../dist/models/user.js'; // adjust path if different

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // clean up between tests
  await User.deleteMany({});
});

describe('User model validation and constraints', () => {
  test('should create a user with minimal required fields and defaults', async () => {
    const nowBefore = Date.now();
    const user = await User.create({
      name: 'alice',
      email: 'alice@example.com',
      password: 'secret',
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.password).toBe('secret');
    expect(user.role).toBe('user'); // default
    expect(user.token).toBeUndefined();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.createdAt.getTime()).toBeGreaterThanOrEqual(nowBefore);
  });

  test('should reject creation without required fields', async () => {
    await expect(User.create({})).rejects.toThrow(); // missing name, email, password

    await expect(User.create({ name: 'bob' })).rejects.toThrow(); // missing email + password
    await expect(User.create({ name: 'bob', email: 'bob@example.com' })).rejects.toThrow(); // missing password
  });

  test('should reject invalid email format', async () => {
    await expect(
      User.create({
        name: 'charlie',
        email: 'not-an-email',
        password: 'pwd',
      })
    ).rejects.toThrow(/valid email address/i);
  });

  test('should enforce unique name and email', async () => {
    await User.create({
      name: 'dave',
      email: 'dave@example.com',
      password: 'pwd1',
    });

    // duplicate name
    await expect(
      User.create({
        name: 'dave',
        email: 'other@example.com',
        password: 'pwd2',
      })
    ).rejects.toThrow();

    // duplicate email
    await expect(
      User.create({
        name: 'other',
        email: 'dave@example.com',
        password: 'pwd3',
      })
    ).rejects.toThrow();
  });
});
