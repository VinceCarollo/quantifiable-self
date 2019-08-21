var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFoods = require('../../../models').MealFoods;

var index = function(req, res) {
  Meal.findAll({
    include: [
      {
        model: Food,
        as: 'foods'
      }
    ]
  })
  .then(meals => {
    res.setHeader("Content-Type", "application/json");
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
