// const express = require('express');
const db = require('../../dbconfig');
const axios = require('axios');
// require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../../auth/authenticate")

const router = express.Router();

const api_key = process.env.API_KEY;
const base_url = "https://na1.api.riotgames.com/lol/"

//middleware

function generateToken(user) {
    const payload = {username: user.username };
}

//endpoints

router.post('/newaccount', async (req, res, next) => {
    // const accountName = req.params.accountName;
    // const username = req.params.username;
    // const pw = req.params.pw;

    console.log(req.body)

    try {
        let response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${accountName}?api_key=${api_key}`)
        console.log(response.data.accountId)
        let summonerid = await response.data.accountId

        db('users')
        .insert({username: username, pw: pw, summonerid: summonerid})
        .then(ids => {
            res.status(201).send(ids)
        })

        .catch(() => res.status(500).send({error: "Data was not saved"}))
    } catch (error) {
        return next(error)
    }
})

module.exports = router;