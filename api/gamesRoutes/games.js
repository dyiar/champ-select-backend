const express = require('express');
const db = require('../../dbconfig');
const { authenticate } = require("../../auth/authenticate");
const router = express.Router();

//endpoints

router.post("/all", authenticate, async (req, res, next) => {

    let summonerid = db('users').where({ username: req.body.username }).first().then(user => {
        return user.summonerid
    })
    console.log(summonerid)

    res.status(200).send('ok')


})

module.exports = router;