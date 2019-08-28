# Calorie Coacher
Calorie coacher is a calorie tracking/recipe app build in NodeJS. It consists of 3 main components.

- A microservice for getting recipes using the edamam API @ https://github.com/Patrick-Duvall/calorie-coacher-recipes
- **This app** which serves API endpoints for foods and meals. This app hits the microservice for some functionality and is hit by the below frontend.
- A frontend that hits both this app and the microservice to display data to a user https://github.com/VinceCarollo/calorie_coacher_fe
- Meal and food information is stored on the main app via a many-to-many. Recipes functionally have a many-to-many relationship with foods but we don't store this relation in the database. Rather in exists when our main service queries our microservice with a food type and we get back recipes containing this food type.

![schema](https://user-images.githubusercontent.com/35322570/63884680-e15f3780-c993-11e9-8a57-7998f0e0d2c4.png)

## Local Setup
To run this endpoint on your local machine first `git clone git@github.com:Patrick-Duvall/quantifiable-self.git`

- Next, `npm install` to update dependencies
- Once you're updated run `npm start` to spin up your sever locally
- Now, all of the documented endpoints should be available at `http://localhost:3000` You can hit them either in [Postman](https://www.getpostman.com/) or in your browser by appending the endpoint i.e GET http://localhost:3000/api/v1/recipes/search?calories=300 in Postman or by copy/pasting http://localhost:3000/api/v1/recipes/search?calories=300 into your browser window.

## End point Documentation
Here are the endpoints this API supports. These endpoints can be hit either locally, following the above local setup, or in production at https://calorie-coacher.herokuapp.com I.E. https://calorie-coacher.herokuapp.com/api/v1/meals.

## Food endpoints
### GET /api/v1/foods
- Returns an index of all foods in DB in the format
```
[
  {
    "id": 1,
    "name": "Banana",
    "calories": 150
  },
  {
    "id": 2,
    "name": "Apple",
    "calories": 150
  }
]
```
### GET /api/v1/foods/:id
Successfully returns a show page of one food in the format
```
  {
    "id": 1,
    "name": "Banana",
    "calories": 150
  }
```
Returns 404 if food not found
### PATCH /api/v1/foods
Formatted:
```
{ "name": "Steak", "calories": "300"}
```

successfully returns the updated food item:
```
Status: 200

{
  'id': 2,
  'name': 'steak',
  'calories': 300
}
```
- Only calories can be updated
- Food to update must exist

### POST /api/v1/foods
Formatted:
```
{ "name": "Milk", "calories": "80"}
```

successfully returns the created food item:
```
Status: 201

{
  'id': 2,
  'name': 'Milk',
  'calories': 80
}
```
- Name must be present
- Calories must be present and numeric
- Food by name must not exist in the database

### DELETE /api/v1/foods
Successfully returns `Status 204`

## Meal endpoints
### GET /api/v1/meals
Returns all meals and associated foods in the following format:
```
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 2,
        "name": "Snack",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 9,
                "name": "Gum",
                "calories": 50
            },
            {
                "id": 10,
                "name": "Cheese",
                "calories": 400
            }
        ]
    }
]
```
### GET /api/v1/meals/:meal_id/foods
Successfully returns one meal and associated foods in the following format:
```
{
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
            "id": 1,
            "name": "Banana",
            "calories": 150
        },
        {
            "id": 6,
            "name": "Yogurt",
            "calories": 550
        },
        {
            "id": 12,
            "name": "Apple",
            "calories": 220
        }
    ]
}
```
Returns 404 if meal not found
### POST /api/v1/meals/:meal_id/foods/:food_id
Successfully returns a 201 with the following body:
```
{
    "message": "Successfully added FOODNAME to MEALNAME"
}
```
Returns 404 if either meal or food cannot be found
### DELETE /api/v1/meals/:meal_id/foods/:food_id
- Removes the food from the meal and successfully returns `Status 204`
- Returns 404 if either meal or food cannot be found

## Recipe endpoints
### GET /api/v1/recipes/average_calorie_total?q=chicken
Successfully returns the average calorie total for all recipes that contain `q`, a food ingredient, in the format:
```
{
  food_type: chicken,
  calorie_average_per_serving: 173 
}
```
Returns a 404 if no foods are found with food type given.
## GET /api/v1/recipes?sort=numIngredient
Successfully returns all recipes sorted by ingredient count:

```
[
  {
    calories: 200,
    carbs: 17,
    name: "chicken fried rice",
    protein: 6,
    preperation_time: '8 days',
    number_of_ingredients: 3,
    cuisine_type: 'chinese',
    servings: 10,
    thumbnail: "https://www.edamam.com/web-img/146/146c072c175df9f407f9516a3f6466eb.jpg",
    url: "http://www.101cookbooks.com/archives/a-frozen-yogurt-recipe-to-rival-pinkberrys-recipe.html"
  },
  {
    calories: 200,
    carbs: 17,
    name: "tacos",
    protein: 6,
    preperation_time: '8 days',
    number_of_ingredients: 4,
    cuisine_type: 'chinese',
    servings: 10,
    thumbnail: "https://www.edamam.com/web-img/146/146c072c175df9f407f9516a3f6466eb.jpg",
    url: "http://www.101cookbooks.com/archives/a-frozen-yogurt-recipe-to-rival-pinkberrys-recipe.html"
  }
]
```
Currently numIngredients is the only supported sort function.

## Running Tests
Tests are written in [Mocha](https://mochajs.org/) and [Chai](https://chaijs.com/). The tests that hit the recipe microservice use the live, hosted microservice, which has its environmental variables configured to hit the Edamam API. As such, testing consists of running `npm test` to run the test suite. Make sure you've run `npm install` in the initial setup.

## Built With
* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://chaijs.com/)
