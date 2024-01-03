import { describe, expect, test, afterAll } from '@jest/globals';
const request = require('supertest');
const authModel = require('../src/models/authModel');
const app = require('../server'); // Adjust the path according to your project structure
require('dotenv').config();
const bcrypt = require('bcryptjs');

describe('UserCRUD', () => {
  let newUser: any;
  let newAuth: any;

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

  // Sign User Role
  test('should assign a standard role to new user', async () => {

    const ins = await request(app)
    .post('/api/roles/userRole/')
    .send({ userId: newUser.user_id, roleId: 3 })
    .set('Content-Type', 'application/json');
    // console.log(ins);

    const res = await request(app).get(`/api/roles/getRoleByUser/${newUser.user_id}`)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('role_id', 3);
    expect(res.body).toHaveProperty('user_id', newUser.user_id);
  });

  // Create authEntry
  test('should create an authEntry to store hashed password', async () => {
    const updatedData = {
      username: "testuser",
      user_id: newUser.user_id, 
      auth_type: "gmail", 
      hashedPassword: await bcrypt.hash("Soc@1111", 10),
      oauth_id: 109876543210987654321, 
      token: "JWTtoken"
    };
    
    const res = await authModel.createAuthEntry(updatedData.user_id, updatedData.auth_type, updatedData.username, updatedData.hashedPassword, updatedData.oauth_id, updatedData.token);
    newAuth = res;

    //console.log(res)

    expect(res).toHaveProperty('auth_id');
    expect(res).toHaveProperty('user_id', newUser.user_id);
  });

  afterAll(async () => {
    // Perform cleanup if necessary
    const resAuth = await request(app).delete(`/api/auth/${newAuth.auth_id}`);
    const resUserRole = await request(app).delete(`/api/roles/userRole/${newUser.user_id}`);
    const resUser = await request(app).delete(`/api/users/${newUser.user_id}`);
  });

});
