var showFoods = function (req, res) {
console.log("HI")
  res.setHeader("Content-Type", "application/json");
  res.status(200).send();
}

module.exports = {
index: showFoods
}
