var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
chai.use(chaiHttp);

describe("Works with our  microservice", () => {
describe("GET /api/v1/recipes/search?food_type=chicken", () => {
  it("should get all foods record", (done) => {
    chai.request('https://calorie-coacher-recipes.herokuapp.com')
    .get("/api/v1/recipes/search?food_type=chicken")
    .end((err, res) => {
      res.should.have.status(200);
      res.body[0].name.split(' ').should.include('Chicken')
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('calories')
      res.body[0].should.have.property('name')
      res.body[0].should.have.property('prepTime')
      res.body[0].should.have.property('numIngredients')
      res.body[0].should.have.property('url')
      res.body[0].should.have.property('image')
      res.body[0].should.have.property('cuisineType')
      res.body[0].should.have.property('servings')
      done();
    });
  });
});

describe("GET /api/v1/recipes/search?calories=200", () => {
  it("should get all recipes below 200 calories", (done) => {
    chai.request("https://calorie-coacher-recipes.herokuapp.com")
    .get("/api/v1/recipes/search?calories=200")
    .end((err, res) => {
      res.should.have.status(200);
      res.body[0].should.be.a('object');
      res.body.length.should.be.above(1)
      res.body.forEach(recipe => {
        recipe.calories.should.be.below(200)
      })
      done();
    });
  });
});

describe("GET /api/v1/recipes/search?cuisine_type=chinese", () => {
  it("should get all recipes with chinese cuisine type", (done) => {
    chai.request("https://calorie-coacher-recipes.herokuapp.com")
    .get("/api/v1/recipes/search?cuisine_type=chinese")
    .end((err, res) => {
      res.should.have.status(200);
      res.body[0].should.be.a('object');
      res.body.length.should.be.above(1)
      res.body.forEach(recipe => {
        recipe.cuisineType.should.equal('chinese')
      })
      done();
    });
  });
});
});
