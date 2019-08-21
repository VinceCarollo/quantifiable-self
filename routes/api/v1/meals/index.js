var router = require('express').Router();
var mealsController = require('../../../../controllers/api/v1/meals_controller')

router.get('/', mealsController.index)
router.get('/:id/foods', mealsController.show)
router.post('/:id/foods/:food_id', mealsController.addFood)

module.exports = router;
