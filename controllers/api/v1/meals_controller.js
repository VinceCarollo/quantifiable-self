var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFoods = require('../../../models').MealFoods;
var MealPresenter = require('../../../pojos/meal_presenter')

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

var show = function(req, res) {
  Meal.findByPk(req.params.id,{
    include: [
      {
        model: Food,
        as: 'foods'
      }
    ]
  })
  .then(meal_data => {
    if (meal_data){
    res.setHeader("Content-Type", "application/json");
    let meal =  new MealPresenter(meal_data)
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
    where: { id: req.params.food_id }
  })
  let meal = await Meal.findOne({
    where: { id: req.params.id }
  })
  if (meal && food) {
    MealFoods.create({
      foodId: food.id,
      mealId: meal.id
    })
    .then(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send({ message: `Successfully added ${food.name} to ${meal.name}` });
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

var removeFood = async function(req, res) {
  let food = await Food.findOne({
    where: {id: req.params.food_id}
  })
  let meal = await Meal.findOne({
    where: { id: req.params.id }
  })
  if (meal && food) {
    MealFoods.destroy({
      where:{
        foodId: food.id,
        mealId: meal.id
      }
    })
    .then(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(204).send();
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
  addFood: addFood,
  removeFood: removeFood
}
