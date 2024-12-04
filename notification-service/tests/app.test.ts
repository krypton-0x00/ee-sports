import request from 'supertest'
import { app } from '..'


describe('Notification Service Routes', () => {
    it('should return status 200 with body: {success:true}', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true })
    })
})
