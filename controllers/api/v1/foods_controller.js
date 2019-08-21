var Food = require('../../../models').Food;

var index = function (req, res) {
  Food.findAll()
    .then(foods => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
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
  .then(food => {
    if (food) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(food));
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

var create = function(req, res) {
  let name = req.body.name
  let calories = parseInt(req.body.calories)
  Food.create({
    name: name,
    calories: calories
  }).then(food => {
      res.setHeader("Content-Type", "application/json");
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
  ).then(([rowsUpdate, [updatedFood] ]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(updatedFood));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send();
    })
}

var destroy = function(req, res) {
  Food.destroy({
      where: {
        id: req.params.id
      }
      })
    .then(food=> {
      if (food){
      res.setHeader("Content-Type", "application/json");
      res.status(204).send();
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send();
    }

    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send();
    })
}



module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
}
