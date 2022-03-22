// import 'regenerator-runtime/runtime';

const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:1111'

describe('Route integration', () => {
  describe('/aws/getCreds', () => {
    describe('GET', () => {
      it ('responds with 200 status and json content type', async () => {
        return request(server)
          .get('/aws/getCreds')
          .expect('Content-Type', /json/)
          .expect(200)
      })
    })
    
  })
})