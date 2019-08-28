
const fetch = require('node-fetch')

var averageCalories = function(req, res) {
  var url = `https://calorie-coacher-recipes.herokuapp.com/api/v1/recipes/search?food_type=${req.query.q}`
  console.log(url);
  fetch(url)
  .then(res => {
        return res.json()
      })
  .then(recipe_data => {
    // console.log(recipe_data);
    let recipe_calories = 0
    recipe_data.forEach(recipe => {
      console.log(recipe);
      recipe_calories += recipe.calories
    })
    let calorie_average_per_serving = recipe_calories / recipe_data.length;

    let response = {
      'food_type': req.query.q,
      'calorie_average_per_serving': calorie_average_per_serving
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(response));
  })
  .catch(error => {
    // console.log("!!!!!!!!!!!!!!!!!!!!!!");
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
}




module.exports = {
  averageCalories: averageCalories
}
