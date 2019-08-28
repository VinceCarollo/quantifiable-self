
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var Food = require('../models').Food;

chai.use(chaiHttp);

describe("Foods", () => {

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
      },
      {
        id: 9011,
        name: 'nachos',
        calories: 200
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
          res.body[0].should.not.have.property('createdAt')
          res.body[0].should.not.have.property('updatedAt')
          res.body.should.have.lengthOf(3);
          done();
        });
      });
    });

    describe("GET /api/v1/foods?limit=2", () => {
        it("should get 2 foods record", (done) => {
          chai.request(app)
          .get('/api/v1/foods?limit=2')
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].should.be.a('object');
            res.body.should.have.lengthOf(2);
            done();
          });
        });
      });
    describe("GET /api/v1/foods?limit=5", () => {
        it("should get all foods record if limit greater than food count", (done) => {
          chai.request(app)
          .get('/api/v1/foods?limit=5')
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].should.be.a('object');
            res.body.should.have.lengthOf(3);
            done();
          });
        });
      });

    describe("GET /api/v1/foods/:id", () => {
      it("should get a single food record", (done) => {
            chai.request(app)
            .get(`/api/v1/foods/9000`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.name.should.equal('pizza');
              res.body.calories.should.equal(600);
              res.body.should.not.have.property('createdAt')
              res.body.should.not.have.property('updatedAt')
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

  describe("POST /api/v1/foods", () => {
    it("should create a single food record", (done) => {
          chai.request(app)
          .post(`/api/v1/foods`)
          .send({ "name": "big fries", "calories": "1700"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.name.should.equal('big fries');
            res.body.calories.should.equal(1700);
            res.body.should.not.have.property('createdAt')
            res.body.should.not.have.property('updatedAt')
             Food.findOne({
              where: {name: 'big fries'}
            }).then(food =>{
              should.exist(food)
              done();
            });
          });
     });
    it("should not make a single food record", (done) => {
          chai.request(app)
          .post(`/api/v1/foods`)
          .send({ "calories": "1700"})
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
     });
    it("should not make a single food record", (done) => {
          chai.request(app)
          .post(`/api/v1/foods`)
          .send({ "name": "big fries"})
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
     });
  });

  describe("PATCH /api/v1/foods", () => {
    it("should update a food resource", (done) => {
      chai.request(app)
      .patch(`/api/v1/foods`)
      .send({ "name": "pizza", "calories": "1700"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.name.should.equal('pizza');
        res.body.calories.should.equal(1700);
        res.body.should.not.have.property('createdAt')
        res.body.should.not.have.property('updatedAt')
        Food.findOne({
         where: {name: 'pizza'}
        }).then(food =>{
         food.calories.should.equal(1700)
         done();
        });
      });
    });

    it("should not update a food resource with no calorie input", (done) => {
      chai.request(app)
      .patch(`/api/v1/foods`)
      .send({ "name": "salad" })
      .end((err, res) => {
        res.should.have.status(400);
        Food.findOne({
         where: {name: 'salad'}
        }).then(food =>{
         food.calories.should.equal(100)
         done();
        });
      });
    });
  });

  describe("DELETE /api/v1/foods/:id", () => {
    it("should delete a food resource", (done) => {
      chai.request(app)
      .delete(`/api/v1/foods/9000`)
      .end((err, res) => {
        res.should.have.status(204);
        Food.findOne({
         where: {name: 'pizza'}
        }).then(food =>{
         should.not.exist(food)
         done();
        });
      });
    });
    it("should not delete a food resource", (done) => {
      chai.request(app)
      .delete(`/api/v1/foods/10000`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });

});
