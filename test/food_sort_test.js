var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("GET /api/v1/recipes?sort=numIngredients", () => {
  it("should get all foods record", (done) => {
    chai.request('localhost:3000')
    .get("/api/v1/recipes?sort=numIngredients")
    .end((err, res) => {
      res.should.have.status(200);
      res.body.forEach(function(recipe,index,recipes) {
        if(recipes[index-1]){ //do not compare zeroith index with negative first index
        assert(recipe.numIngredients >= recipes[index-1].numIngredients)
      }
      })
      done();
    });
  });
});
