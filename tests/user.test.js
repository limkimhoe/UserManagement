const request = require('supertest');
const app = require('../src/app'); // Adjust the path according to your project structure

describe('User CRUD Operations', () => {
  let newUser;

  // Create User
  it('should create a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      // include any other required fields from the user entity
    };
    
    const res = await request(app)
      .post('/api/users')
      .send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user_id');
    newUser = res.body;
  });

  // Read User
  it('should retrieve a user by ID', async () => {
    const res = await request(app).get(`/api/users/${newUser.user_id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id', newUser.user_id);
  });

  // Update User
  it('should update a user', async () => {
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
  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${newUser.user_id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('User deleted successfully'); // Adjust based on your actual delete response
  });

  // List Users
  it('should list all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // After all tests are done, you may want to clean up the test data
  afterAll(async () => {
    // Perform cleanup if necessary
  });
});
