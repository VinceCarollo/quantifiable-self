const fetch = require('node-fetch')

var index = function(req, res) {
  fetch(query_microservice(req.query))
  .then(res => {
        return res.json()
      })
  .then(recipe_data => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(recipe_data));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
}

function query_microservice(params){
  var url = new URL("https://calorie-coacher-recipes.herokuapp.com/api/v1/recipes")
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return url
}

module.exports = {
  index: index
}
