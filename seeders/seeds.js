'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("Food", [
        {
          id: 1,
          name: "banana",
          calories: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "apple",
          calories: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "pie",
          calories: 300,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: "fries",
          calories: 400,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: "pizza",
          calories: 500,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: "taco",
          calories: 250,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: "orange",
          calories: 50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: "coke",
          calories: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}),
      queryInterface.bulkInsert(
        "Meals",
        [
          {
            id: 1,
            name: "Breakfast",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            name: "Lunch",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 3,
            name: "Dinner",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 4,
            name: "Snack",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        "MealFoods",
        [
          {
            id: 1,
            mealId: 1,
            foodId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            mealId: 1,
            foodId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 3,
            mealId: 1,
            foodId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 4,
            mealId: 2,
            foodId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 5,
            mealId: 2,
            foodId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 6,
            mealId: 2,
            foodId: 5,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 7,
            mealId: 3,
            foodId: 5,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 8,
            mealId: 3,
            foodId: 6,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 9,
            mealId: 4,
            foodId: 7,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 10,
            mealId: 4,
            foodId: 8,
            createdAt: new Date(),
            updatedAt: new Date()
          }

        ],
        {}
      )

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('MealFoods', null, {}),
      queryInterface.bulkDelete('Foods', null, {}),
      queryInterface.bulkDelete('Meals', null, {})
    ]);
  }
};
