var router = require('express').Router();
var recipesAverageCaloriesController = require('../../../../../controllers/api/v1/recipes/average_calories_controller')

router.get('/', recipesAverageCaloriesController.averageCalories)


module.exports = router;
