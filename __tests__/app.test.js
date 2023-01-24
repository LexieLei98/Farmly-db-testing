const request = require ('supertest')
const app = require('../index')
const db = require('../db/connection')
const seed = require('../db/seed')
const testData = require('../db/data/test-data')

afterAll(() => db.end());
beforeEach(() => seed(testData))

describe('GET /api/farms', () => {
    test('status:200, returns the array of farms objects', () => {
        return request(app)
        .get('/api/farms')
        .expect(200)
        .then(({body}) => {
            const { farms } = body;
            expect(farms).toBeInstanceOf(Array)
            expect(farms).toHaveLength(2);
            farms.forEach((farm) => {
                expect.objectContaining({
                    name: expect.any(String),
                    address: expect.any(Object),
                    description: expect.any(String),
                    profile_pic: expect.any(String),
                    rating: expect.any(Array),
                    produce: expect.any(Array),
                })
            })
        })
    })
})