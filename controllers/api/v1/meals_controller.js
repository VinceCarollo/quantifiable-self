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

var show = function(req, res) {
  Meal.findByPk(req.params.id,{
    include: [
      {
        model: Food,
        as: 'foods'
      }
    ]
  })
  .then(meal => {
    if (meal){
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(meal));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send();
  }

  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
}

var addFood = async function(req, res) {
  let food = await Food.findOne({
    where: {
      id: req.params.food_id
    }
  })
  let meal = await Meal.findOne({
    where: {
      id: req.params.id
    }
  })
  if (meal && food) {
    MealFoods.create({
      foodId: food.dataValues.id,
      mealId: meal.dataValues.id
    })
    .then(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send({ message: `Successfully added ${food.dataValues.name} to ${meal.dataValues.name}` });
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send();
  }
}

module.exports = {
  index: index,
  show: show,
  addFood: addFood
}
