// File: tests/server.test.js

const request = require('supertest');
const app = require('../server');

describe('Simple Calculator API and UI', () => {

  // Test that the static index.html file is being served properly
  test('should serve the static index.html at GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    // We expect the HTML to include "Calculator Pro" (as found in the title or navigation)
    expect(response.text).toContain('Calculator Pro');
  });

  // Test the addition endpoint: /api/add
  test('should correctly add two numbers at GET /api/add', async () => {
    const response = await request(app)
      .get('/api/add')
      .query({ a: '3', b: '2' });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(5);
  });

  // Test the subtraction endpoint: /api/subtract
  test('should correctly subtract two numbers at GET /api/subtract', async () => {
    const response = await request(app)
      .get('/api/subtract')
      .query({ a: '10', b: '4' });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(6);
  });

  // Test the multiplication endpoint: /api/multiply
  test('should correctly multiply two numbers at GET /api/multiply', async () => {
    const response = await request(app)
      .get('/api/multiply')
      .query({ a: '3', b: '5' });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(15);
  });

  // Test the division endpoint: /api/divide with correct values
  test('should correctly divide two numbers at GET /api/divide', async () => {
    const response = await request(app)
      .get('/api/divide')
      .query({ a: '10', b: '2' });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(5);
  });

  // Test the division endpoint to ensure division by zero returns an error
  test('should return error for division by zero at GET /api/divide', async () => {
    const response = await request(app)
      .get('/api/divide')
      .query({ a: '10', b: '0' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Division by zero is not allowed.");
  });

  // Test that missing query parameters return an error for all endpoints
  test('should return error when query parameters are missing', async () => {
    const endpoints = ['add', 'subtract', 'multiply', 'divide'];
    for (const endpoint of endpoints) {
      // Missing parameter "a"
      let response = await request(app)
        .get(`/api/${endpoint}`)
        .query({ b: '2' });
      expect(response.status).toBe(400);

      // Missing parameter "b"
      response = await request(app)
        .get(`/api/${endpoint}`)
        .query({ a: '2' });
      expect(response.status).toBe(400);
    }
  });

  // Test that non-numeric parameters return an error for all endpoints
  test('should return error when query parameters are invalid', async () => {
    const endpoints = ['add', 'subtract', 'multiply', 'divide'];
    for (const endpoint of endpoints) {
      const response = await request(app)
        .get(`/api/${endpoint}`)
        .query({ a: 'abc', b: '2' });
      expect(response.status).toBe(400);
    }
  });

});
