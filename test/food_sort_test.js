var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("GET /api/v1/recipes/search?food_type=chicken", () => {
  it("should get all foods record", (done) => {
    chai.request(app)
    .get("/api/v1/recipes?sort=ingredient_count")
    .end((err, res) => {
      res.should.have.status(200);
      // res.body[0].should.be.a('object');
      // res.body[0].should.have.property('calories')
      // res.body[0].should.have.property('name')
      // res.body[0].should.have.property('prepTime')
      // res.body[0].should.have.property('numIngredients')
      // res.body[0].should.have.property('url')
      // res.body[0].should.have.property('image')
      // res.body[0].should.have.property('cuisineType')
      // res.body[0].should.have.property('servings')
      done();
    });
  });
});
