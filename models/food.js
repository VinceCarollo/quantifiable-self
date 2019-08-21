'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: { type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    calories: { type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Food.associate = function(models) {
    Food.belongsToMany(models.Meal, {
    through: 'MealFoods',
    as: 'meals',
    foreignKey: 'foodId',
    otherKey: 'mealId'
  });
  };
  return Food;
};
