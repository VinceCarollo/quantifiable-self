
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var Food = require('../models').Food;
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Foods", () => {

  before(async () => {
    await Food.bulkCreate([
      {
        id: 1,
        name: 'pizza',
        calories: 600
      },
      {
        id: 2,
        name: 'salad',
        calories: 100
      }
    ])
  })

  after(async () => {
    await Food.destroy({
      where: {},
      truncate: true
    })
  })
  describe("GET /api/v1/foods", () => {
      it("should get all foods record", (done) => {
        chai.request(app)
        .get('/api/v1/foods')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.a('object');
          res.body[0].name.should.equal('pizza')
          res.body[0].calories.should.equal(600)
          res.body.should.have.lengthOf(2);
          done();
        });
       });
      
      it("should get a single food record", (done) => {
            chai.request(app)
            .get(`/api/v1/foods/1`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.name.should.equal('pizza');
              res.body.calories.should.equal(600);
              done();
            });
       });

      it("should not get a single student record", (done) => {
           chai.request(app)
               .get(`/api/v1/foods/889`)
               .end((err, res) => {
                   res.should.have.status(404);
                   done();
                });
       });
  });
});
