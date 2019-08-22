var FoodPresenter = require('./food_presenter');

class MealPresenter {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.foods = data.foods.map(food => new FoodPresenter(food))
  }
}

module.exports = MealPresenter;
