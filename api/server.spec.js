const request = require('supertest');
const server = require('./server');

describe('server.js tests', () => {

    describe("POST /users/register endpoint", () => {
        it('should respond with status code 422 if info not complete', async () => {
            let response = await request(server).post('/users/register');
            expect(response.status).toBe(422);
        })
    })

    describe("POST /users/login endpoint", () => {
        it('should respond with status code 422 if info not complete', async () => {
            let response = await request(server).post('/users/login');
            expect(response.status).toBe(422);
        })
    })

    describe("POST /games/all endpoint", () => {
        it('should respond with status code 401 if no authentication token is sent', async () => {
            let response = await request(server).post('/games/all');
            expect(response.status).toBe(401);
        })
    })

    describe("POST /stats/mypick endpoint", () => {
        it('should respond with status code 422 if info not complete', async () => {
            let response = await request(server).post('/stats/mypick');
            expect(response.status).toBe(422);
        })
    })

    describe("POST /stats/bans endpoint", () => {
        it('should respond with status code 422 if info not complete', async () => {
            let response = await request(server).post('/stats/bans');
            expect(response.status).toBe(422);
        })
    })

    describe("POST /stats/allies endpoint", () => {
        it('should respond with status code 422 if info not complete', async () => {
            let response = await request(server).post('/stats/allies');
            expect(response.status).toBe(422);
        })
    })

    describe("POST /stats/enemies endpoint", () => {
        it('should respond with status code 422 if info not complete', async () => {
            let response = await request(server).post('/stats/enemies');
            expect(response.status).toBe(422);
        })
    })

})