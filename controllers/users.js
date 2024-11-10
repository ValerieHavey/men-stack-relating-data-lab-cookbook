const express = require("express");
const router = express.Router();
const {Types:{ObjectId}} = require('mongoose');

const User = require("../models/user");

router.get('/', async (req, res) => {
    const allUsers = await User.find({});
    res.render('users/index.ejs', {
        allUsers: allUsers
    })
});

module.exports = router;