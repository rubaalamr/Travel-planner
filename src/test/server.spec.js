const app = require('../src/server/index.js');
const request = require('supertest');

  it("testing endopoint", async done => {
    const res = await request.get('/all')
    expect(res.status).toBe(200);
    done();
});
