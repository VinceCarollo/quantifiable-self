class FoodPresenter {
  constructor(data) {
    // console.log(data)
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    this.id = data.dataValues.id
    this.name = data.dataValues.name
    this.calories = data.dataValues.calories

  }


}

module.exports = FoodPresenter;
