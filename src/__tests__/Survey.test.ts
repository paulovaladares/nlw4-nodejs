import request from 'supertest';
import app  from '../app';
import createConnection from '../database';

describe('Survey', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations()
    })

    it('Should be able to create a new Survey', async () => {
        const response = await request(app)
        .post('/survey')
        .send({
            title: 'Queremos ouvir sua opinião',
            description: 'De 0 a 10, quanto vc recomendaria agora??'
        });
        expect(response.status).toBe(201);
    });

    it('Should be able to get all surveys', async () => {
        const response = await request(app).get('/survey');
        expect(response.body.length).toBeGreaterThan(0);
    });
});
