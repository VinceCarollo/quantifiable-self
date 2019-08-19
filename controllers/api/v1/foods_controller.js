var Food = require('../../../models').Food;

var showFoods = function (req, res) {
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

module.exports = {
  index: showFoods
}
