// var Food = require('../../../models').Food;
// var Meal = require('../../../models').Meal;
// var MealFoods = require('../../../models').MealFoods;
// var MealPresenter = require('../../../pojos/meal_presenter')

var index = function(req, res) {
  Meal.findAll({
    include: [
      {
        model: Food,
        as: 'foods'
      }
    ]
  })
  .then(meal_data => {
    res.setHeader("Content-Type", "application/json");
    let meals = meal_data.map(meal => new MealPresenter(meal))
    res.status(200).send(JSON.stringify(meals));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
}

module.exports = {
  index: index
}
