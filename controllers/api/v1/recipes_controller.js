// var Food = require('../../../models').Food;
// var Meal = require('../../../models').Meal;
// var MealFoods = require('../../../models').MealFoods;
// var MealPresenter = require('../../../pojos/meal_presenter')
const fetch = require('node-fetch')

var index = function(req, res) {
  console.log(req.query);
  var url = new URL("https://calorie-coacher-recipes.herokuapp.com/api/v1/recipes")
  fetch(url)
  .then(res => {
        return res.json()
      })
  .then(meal_data => {
console.log(meal_data);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(meal_data));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
}




module.exports = {
  index: index
}
