import request from 'supertest';
import app from '../dist/app.js';
import mongoose from 'mongoose';

// TESTS
// 1. db
// 2. model
// 3. routes

// Mock the connectDB function to avoid real DB connection during tests
// jest.mock('./db.js', () => jest.fn());

describe('App routes', () => {
  test('GET /auth should respond (if route exists)', async () => {
    const res = await request(app).get('/auth/login');

    expect(res.status).not.toBe(404);
    expect(res.status).toBe(200);
  });

  // Add more tests for other routes as needed
  // ...
});

// Clean up DB connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});