// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user');

// router logic will go here - will be built later on in the lab


/*
Action: Index
Method: GET
Route: /users/:userId/
Description: Show the home page for a given user
*/

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
        userId:res.locals.user._id,
    });
    }  catch (error) {
        console.log(error);
        res.redirect('/');
    } 
});

/*
Action: Show/View
Method: GET
Route: /users/:userId/pantry/:foodId
Description: Show the details for a food item in the pantry
*/

router.get('/:foodId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const food = user.foods.id(req.params.foodId);

        res.render('foods/show.ejs', {
            food: food,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

/*
Action: New
Method: GET
Route: /users/userId/foods/new
Description: Show form for creating new food item
*/

router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
});

router.post('/new', async (req, res) => {
    try {
        const user = await User.findById(res.locals.user._id)
        user.pantry.push(req.body)
        await user.save();
        res.redirect('/');
    } catch (error) {
    console.log(error);
    res.redirect('/');
    }
});

module.exports = router;
