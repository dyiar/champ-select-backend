const express = require('express');
const db = require('../../dbconfig');
const axios = require('axios');
const { authenticate } = require("../../auth/authenticate");
const router = express.Router();

const api_key = process.env.API_KEY;

//middleware

async function getAllGames(summonerid, beginningIndex) {
    
    try {
        let response = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerid}?queue=420&queue=%20440&beginIndex=${beginningIndex}&api_key=${api_key}`)
        let gamesData = await response.data;

        getSingleGames(gamesData, summonerid)

    } catch (error) {
        return error
    }
}

async function getSingleGames(gamesData, summonerid) {
    let matches = gamesData.matches
    let startIndex = gamesData.startIndex
    let totalGames = gamesData.totalGames
    let endIndex = gamesData.endIndex

    while (startIndex < endIndex) {
        let response = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${matches[startIndex].gameId}?api_key=${api_key}`)
        let r1 = await response.participants[0].championId
        let r2 = await response.participants[1].championId
        let r3 = await response.participants[2].championId
        let r4 = await response.participants[3].championId
        let r5 = await response.participants[4].championId
        let b1 = await response.participants[5].championId
        let b2 = await response.participants[6].championId
        let b3 = await response.participants[7].championId
        let b4 = await response.participants[8].championId
        let b5 = await response.participants[9].championId
        
        let redBlue;
        let result = true;
        for (let i = 0; i<response.participantIdentities.length; i++) {
            if (response.participantIdentities[i].accountId == summonerid) {
                if (i < 5) {
                    redBlue = true
                } else {
                    redBlue = false
                }
            }
        }

        if (redBlue == true && response.teams[0].win == true) {
            result = true
        } else if (redBlue === true && response.teams[0].win == false) {
            result = false
        }

            db('games')
                .insert({gameId: response.gameId, r1: r1, r2: r2, r3: r3, r4: r4, r5: r5, b1: b1, b2: b2, b3: b3, b4: b4, b5: b5, result: result})

        startIndex += 1
    }
}

//endpoints

router.post("/all", authenticate, async (req, res, next) => {

    db('users').where({ username: req.body.username }).first().then(user => {
        getAllGames(user.summonerid, 0)
    })

    res.status(200).send('ok')


})

module.exports = router;