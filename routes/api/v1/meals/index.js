var router = require('express').Router();
var mealsController = require('../../../../controllers/api/v1/meals_controller')

router.get('/', mealsController.index)
router.get('/:id/foods', mealsController.show)

module.exports = router;
