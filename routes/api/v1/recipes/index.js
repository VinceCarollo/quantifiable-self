var router = require('express').Router();
var recipesController = require('../../../../controllers/api/v1/recipes_controller')

router.get('/', recipesController.index)


module.exports = router;
