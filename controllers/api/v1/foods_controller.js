var Food = require('../../../models').Food;
var FoodPresenter = require('../../../pojos/food_presenter.js');

var index = function (req, res) {
  Food.findAll()
    .then(food_info => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Methods", 'GET, POST');
      res.setHeader("Access-Control-Allow-Origin", '*');
      let foods = food_info.map(food => new FoodPresenter(food))
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      console.log(error);
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    })
}

var show = function(req, res) {
  Food.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(food_info => {
    if (food_info) {
      res.setHeader("Content-Type", "application/json")
      res.setHeader("Access-Control-Allow-Methods", 'GET, POST');
      res.setHeader("Access-Control-Allow-Origin", '*');
      let food = new FoodPresenter(food_info)
      res.status(200).send(JSON.stringify(food));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", '*');
      res.status(404).send();
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.status(500).send({ error });
  })
}

var create = function(req, res) {
  let name = req.body.name
  let calories = parseInt(req.body.calories)
  Food.create({
    name: name,
    calories: calories
  })
  .then(food_info => {
    console.log(food_info.name);
    if (food_info.name === '') {
      throw 'Empty Name'
    }
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Methods", 'POST');
    res.setHeader("Access-Control-Allow-Origin", '*');
    let food = new FoodPresenter(food_info);
    res.status(200).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error });
  })
}

var update = function(req, res) {
  let name = req.body.name
  let calories = parseInt(req.body.calories)
  Food.update(
    { calories: req.body.calories },
    {
      returning: true,
      where: { name: req.body.name }
    }
  ).then(([rowsUpdate, [updatedFoodInfo] ]) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Methods", 'PATCH, POST');
      res.setHeader("Access-Control-Allow-Origin", '*');
      let food = new FoodPresenter(updatedFoodInfo);
      res.status(200).send(JSON.stringify(food));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send();
    })
}

var destroy = function(req, res) {
  console.log('!!!!!HERE!!!!!!')
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", 'DELETE');
  res.setHeader("Access-Control-Allow-Headers", 'Origin', 'Content-Type', 'X-Auth-Token');
  Food.destroy({
      where: {
        id: req.params.id
      }
      })
    .then(food=> {
      if (food){

      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Methods", 'POST');
      res.setHeader("Access-Control-Allow-Origin", '*');
      res.status(204).send();
    } else {
      res.status(404).send();
    }

    })
    .catch(error => {
      res.status(500).send();
    })
}

var corsHeaders = function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", 'Content-Type');
  res.setHeader("Access-Control-Max-Age", '600');
  res.send()
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy,
  corsHeaders: corsHeaders
}
