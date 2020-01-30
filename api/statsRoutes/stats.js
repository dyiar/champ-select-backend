const express = require('express');
const db = require('../../dbconfig');
const axios = require('axios');
const router = express.Router();

const api_key = process.env.API_KEY;

//middleware
async function doBans(b) {
    db('games')
    .whereNotIn(b.b1, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b2, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b3, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b4, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b5, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b6, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b7, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b8, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b9, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .orWhereNotIn(b.b10, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .then(result => {
        console.log(result)
        return result
    })
}

//endpoints

router.post('/bans', async (req, res) => {
    console.log(req.body)
    let response = await doBans(req.body)

    res.status(201).send(response)
    
})

module.exports = router;