import { describe, expect, test } from '@jest/globals';
const request = require('supertest');
const app = require('../server'); // Adjust the path according to your project structure
require('dotenv').config();

describe('UserCRUD', () => {
  let newUser: any;

  // Create User
  test('should create a new user', async () => {
    const userData = {  
      "username": "testuser",
      "email": "test@example.com"
    };
   
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', email: 'test@example.com' })
      .set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user_id');
    newUser = res.body;
  });

  // Read User
  test('should assign a standard role to new user', async () => {
    const res = await request(app).post(`/api/users/${newUser.user_id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id', newUser.user_id);
  });

  // Update User
  test('should create an authEntry to store hashed password', async () => {
    const updatedData = {
      username: 'updateduser',
      email: 'update@example.com',
      // include any other fields that might be updated
    };
    
    const res = await request(app)
      .put(`/api/users/${newUser.user_id}`)
      .send(updatedData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'updateduser');
  });

  // Delete User
  test('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${newUser.user_id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('User deleted successfully'); // Adjust based on your actual delete response
  });



});
