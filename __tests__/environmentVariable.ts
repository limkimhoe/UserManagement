import { describe, test, expect } from '@jest/globals';
require('dotenv').config();

describe('EnvironmentVariableTest', () => {
    test('should read .env file', () => {
      console.log('DATABASE_URL:', process.env.DB_URL);
      expect(process.env.DB_URL).toBeDefined();
    });
  });