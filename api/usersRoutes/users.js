const express = require('express');
const db = require('../../dbconfig');
const axios = require('axios');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const api_key = process.env.API_KEY;
const base_url = "https://na1.api.riotgames.com/lol/"

//middleware

function generateToken(user) {
    const payload = {username: user.username };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: "120m"
    };
    return jwt.sign(payload, secret, options)
}

function register(req, res) {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.pw, 14);
    userInfo.pw = hash;

    return userInfo;
}

function login(req, res) {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.pw, user.pw)) {
                const token = generateToken(user);
                res.status(200).json({ username: `${user.username}`, token });
            } else {
                res.status(401).json({
                    message: "Login failed. Please enter the correct username and password."
                })
            }
        })
        .catch(() => res.status(500).send("Cannot reach server"));
}

//endpoints

router.post('/register', async (req, res, next) => {
    const accountName = req.body.accountName;
    // const username = req.params.username;
    // const pw = req.params.pw;
    
    try {
        
        let response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${accountName}?api_key=${api_key}`)
        let summonerid = await response.data.accountId

        req.body = register(req);

        db('users')
        .insert({username: req.body.username, pw: req.body.pw, summonerid: summonerid})
        .then(ids => {
            res.status(201).send(ids)
        })

        .catch(error => res.status(500).send({error: error}))
    } catch (error) {
        return next(error)
    }
})

router.post('/login', login, (req, res) => {

})

module.exports = router;