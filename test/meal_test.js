var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var Food = require('../models').Food;
var Meal = require('../models').Meal;
var MealFoods = require('../models').MealFoods;
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Meals", () => {

  before(async () => {
    await Food.bulkCreate([
      {
        id: 9000,
        name: 'pizza',
        calories: 600
      },
      {
        id: 9010,
        name: 'salad',
        calories: 100
      }
    ])
    await Meal.bulkCreate([
      {
        id: 8000,
        name: 'Breakfast'
      },
      {
        id: 8010,
        name: 'Lunch'
      }
    ])
    await MealFoods.bulkCreate([
      {
        foodId: 9000,
        mealId: 8000
      },
      {
        foodId: 9010,
        mealId: 8010
      },
      {
        foodId: 9000,
        mealId: 8010
      }
    ])
  })

  after(async () => {
    await MealFoods.destroy({
      where: {},
      truncate: true
    })

    await Food.destroy({
      where: {},
      truncate: true
    })

    await Meal.destroy({
      where: {},
      truncate: true
    })
  })

  describe("GET /api/v1/meals", () => {
    it("should get all meals records", (done) => {
      chai.request(app)
      .get('/api/v1/meals')
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.be.a('object');
        res.body[0].name.should.equal('Breakfast');
        res.body[0].foods.should.be.a('array');
        res.body[0].foods[0].name.should.equal('pizza')
        res.body[0].foods.should.have.lengthOf(1);
        res.body[1].foods.should.have.lengthOf(2);
        res.body.should.have.lengthOf(2);
        done();
      });
    });
  });
});
