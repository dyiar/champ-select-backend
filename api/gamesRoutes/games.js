const express = require('express');
const db = require('../../dbconfig');
const axios = require('axios');
const { authenticate } = require("../../auth/authenticate");
const router = express.Router();

const api_key = process.env.API_KEY;

//middleware

async function getAllGames(summonerid, beginningIndex, res) {
    try {
        let response = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerid}?queue=420&queue=%20440&beginIndex=${beginningIndex}&api_key=${api_key}`)
        let gamesData = await response.data;

        getSingleGames(gamesData, summonerid, res)

    } catch (error) {
        res.status(401).send(error)
    }
}

async function getSingleGames(gamesData, summonerid, res) {
    let matches = gamesData.matches
    let startIndex = gamesData.startIndex
    let totalGames = gamesData.totalGames
    let endIndex = gamesData.endIndex
    let counter = 0


    // db('games').count('gameid', {as: 'games'}).then(total => {
    //     if(total[0].games === totalGames) {
    //         console.log('all games logged')
    //         break
    //     }
    // })

    try {
    while (startIndex < endIndex) {
        console.log(counter)
        let response = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${matches[counter].gameId}?api_key=${api_key}`)
        // console.log(response.data)
        let r1 = await response.data.participants[0].championId
        let r2 = await response.data.participants[1].championId
        let r3 = await response.data.participants[2].championId
        let r4 = await response.data.participants[3].championId
        let r5 = await response.data.participants[4].championId
        let b1 = await response.data.participants[5].championId
        let b2 = await response.data.participants[6].championId
        let b3 = await response.data.participants[7].championId
        let b4 = await response.data.participants[8].championId
        let b5 = await response.data.participants[9].championId
        
        let redBlue;
        let result = 1;
        
        for (let i = 0; i<response.data.participantIdentities.length; i++) {
            if (response.data.participantIdentities[i].player.accountId == summonerid) {
                if (i < 5) {
                    redBlue = true
                } else {
                    redBlue = false
                }
            }
        }
        
        if (redBlue == false && response.data.teams[0].win == 'Win') {
            result = 0
        } else if (redBlue === true && response.data.teams[0].win == 'Fail') {
            result = 0
        }
            console.log(response.data.gameId, r1, r2, r3, r4, r5, b1, b2, b3, b4, b5, result)
            db('games').where({gameid: response.data.gameId}).first().then(id => {
                if (id) {
                    res.status(200).send({id: id})
                    console.log('already inserted')
                } else {
                    console.log('inserting')
                    db('games')
                    .insert({gameid: response.data.gameId, r1: r1, r2: r2, r3: r3, r4: r4, r5: r5, b1: b1, b2: b2, b3: b3, b4: b4, b5: b5, result: result}).then(gameid => {
                        res.send({gameid: gameid})
                    })
                    .catch((error) => res.send(error) )
                }
            })

            // if(db('games').where({gameid: response.data.gameId}).first() == response.data.gameId) {
            //     console.log('already inserted ' + startIndex)
            // } else {
            // db('games')
            //     .insert({gameid: response.data.gameId, r1: r1, r2: r2, r3: r3, r4: r4, r5: r5, b1: b1, b2: b2, b3: b3, b4: b4, b5: b5, result: result}).then(() => {
            //     }).catch((error) => console.log(error) )
            // }

        if (counter == 98) {
            break
        }else {
            counter += 1
            startIndex += 1
        }
     
    }
    if (endIndex < totalGames) {
        console.log('about to call more games in 2 min')
        setTimeout(() => {
            console.log('calling more games')
            getAllGames(summonerid, startIndex);
        }, 123000);
    } else {
        console.log('exit single games')
        res.status(200).send('finished')
        return
    }
}
catch (error){
    return error
}

}

//endpoints

router.post("/all", authenticate, async (req, res, next) => {

    db('users').where({ username: req.body.username }).first().then(user => {
        getAllGames(user.summonerid, 0, res)
    })

    // res.send({ status: 'grabbing games. this may take a while'})

})

router.get('/test', (req, res) => {


    db('games').count('gameid', {as: 'g'}).then(total => {
        console.log(total[0].g)
    })
})

module.exports = router;