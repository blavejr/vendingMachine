import request from 'supertest';
import app from '../../app';
import * as statusCodes from '../../validation/statusCodes';

describe('Test Unauthorized call', () => {
  it('should return 401 for a call that does not have a jwt', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(statusCodes.UNAUTHORIZED);
  });
});
