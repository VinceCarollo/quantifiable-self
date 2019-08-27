var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

chai.use(chaiHttp);

describe("GET /api/v1/recipes/average_calories?q=chicken", () => {
  it("should get all foods record", (done) => {
    chai.request(app)
    .get("/api/v1/recipes/average_calories?q=chicken")
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('food_type')
      res.body.should.have.property('calorie_average_per_serving')
      done();
      })
    });
  });
