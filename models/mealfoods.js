'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFoods = sequelize.define('MealFoods', {
    foodId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER
  }, {});
  MealFoods.associate = function(models) {
    // associations can be defined here
  };
  return MealFoods;
};