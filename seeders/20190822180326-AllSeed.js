'use strict';

var Meal = require ('../models').Meal
var Food = require ('../models').Food

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Food', [
      {
        name: 'Pizza',
        calories: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Taco',
        calories: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pho',
        calories: 400,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sub Sandwhich',
        calories: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Potato Chips',
        calories: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    let pizza = await Food.findOne({
      where: {
        name: 'Pizza'
      }
    })
    let taco = await Food.findOne({
      where: {
        name: 'Taco'
      }
    })
    let pho = await Food.findOne({
      where: {
        name: 'Pho'
      }
    })
    let subSandwhich = await Food.findOne({
      where: {
        name: 'Sub Sandwhich'
      }
    })

    let potatoChips = await Food.findOne({
      where: {
        name: 'Potato Chips'
      }
    })

    await queryInterface.bulkInsert('Meals', [
      {
        name: 'Breakfast',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lunch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dinner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Snack',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    let breakfast = await Meal.findOne({
      where: {
        name: 'Breakfast'
      }
    })
    let lunch = await Meal.findOne({
      where: {
        name: 'Lunch'
      }
    })
    let dinner = await Meal.findOne({
      where: {
        name: 'Dinner'
      }
    })
    let snack = await Meal.findOne({
      where: {
        name: 'Snack'
      }
    })

    return await queryInterface.bulkInsert('MealFoods', [
      {
        foodId: pizza.id,
        mealId: breakfast.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: taco.id,
        mealId: breakfast.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: pho.id,
        mealId: lunch.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: subSandwhich.id,
        mealId: dinner.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: potatoChips.id,
        mealId: snack.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Food', null, {});
    queryInterface.bulkDelete('Meals', null, {});
    return queryInterface.bulkDelete('MealFoods', null, {});
  }
};
