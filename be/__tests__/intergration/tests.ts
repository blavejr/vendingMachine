import request from 'supertest';
import app from '../../app';

describe('Test Routes', () => {
  it('should return 404 for a non existent route', async () => {
    const response = await request(app).get('/not-a-route');
    expect(response.status).toBe(404);
  });
});
