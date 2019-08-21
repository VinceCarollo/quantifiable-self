var router = require('express').Router();
var mealsController = require('../../../../controllers/api/v1/meals_controller')

router.get('/', mealsController.index)

module.exports = router;
