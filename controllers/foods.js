// controllers/foods.js

const express = require("express");
const router = express.Router();
const {Types:{ObjectId}} = require('mongoose');

const User = require("../models/user");

// router logic will go here - will be built later on in the lab

/*
Action: Index
Method: GET
Route: /users/:userId/
Description: Show the home page for a given user
*/

router.get("/", async (req, res) => {
  try {
    console.log(res.locals.requestedUser);
    const user = await User.findById(res.locals.requestedUser);

    res.render("foods/index.ejs", {
      userId: res.locals.requestedUser,
      pantry: user.pantry,
      isMe:res.locals.requestedUser === res.locals.user._id
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/*
Action: New
Method: GET
Route: /users/userId/foods/new
Description: Show form for creating new food item
*/

router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

/*
Action: Show/View
Method: GET
Route: /users/:userId/pantry/:foodId
Description: Show the details for a food item in the pantry
*/

router.get("/:foodId", async (req, res) => {
  try {
    const user = await User.findById(res.locals.requestedUser);
    const food = user.pantry.find((food) => {
      return food._id.toString() === req.params.foodId;
    });

    res.render("foods/show.ejs", {
      food: food,
      userId: res.locals.requestedUser,
      isMe : res.locals.requestedUser === res.locals.user._id 
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/*
Action: Create
Method: Post
Route: /users/:userId/foods/new
Description: Adds a new food item
*/



router.post("/new", async (req, res) => {
  try {
    const user = await User.findById(res.locals.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});


router.post('/', async (req, res) => {
  try {
    const user = await User.findById(res.locals.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



/*
Action: Edit
Method: GET
Route: 	‘/users/:userId/foods/:foodId/edit’ 	
Description: Edit food item
*/

router.get("/:foodId/edit", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.find((food) => {
      return food._id.toString() === req.params.foodId;
    });
    res.render("foods/edit.ejs", {
      food: food,
      userId: res.locals.user._id,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/*Action: Update
Method: PUT
Route: ‘/users/:userId/foods/:foodId’
Description: Update edited food item
*/

router.put("/:foodId", async (req, res) => {
  try {
          const user = await User.findById(req.session.user._id);
          const food = user.pantry.find((food) => {
              return food._id.toString() === req.params.foodId;
          });
          food.foodName = req.body.foodName
          food.quantity = req.body.quantity
          food.foodType = req.body.foodType
            await user.save()

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/*
Action: Delete
Method: Delete
Route: /users/:userId/foods/:foodId
Description:
*/

router.delete('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.id(req.params.foodId).deleteOne();
    await user.save();

    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;
