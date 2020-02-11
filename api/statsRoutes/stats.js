const express = require('express');
const db = require('../../dbconfig');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');


//middleware
function doBans(b, res) {

    db('games')
    .whereNot({r1: b.b1}).whereNot({r2: b.b1}).whereNot({r3: b.b1}).whereNot({r4: b.b1}).whereNot({r5: b.b1}).whereNot({b1: b.b1}).whereNot({b2: b.b1}).whereNot({b3: b.b1}).whereNot({b4: b.b1}).whereNot({b5: b.b1})
    .whereNot({r1: b.b2}).whereNot({r2: b.b2}).whereNot({r3: b.b2}).whereNot({r4: b.b2}).whereNot({r5: b.b2}).whereNot({b1: b.b2}).whereNot({b2: b.b2}).whereNot({b3: b.b2}).whereNot({b4: b.b2}).whereNot({b5: b.b2})
    .whereNot({r1: b.b3}).whereNot({r2: b.b3}).whereNot({r3: b.b3}).whereNot({r4: b.b3}).whereNot({r5: b.b3}).whereNot({b1: b.b3}).whereNot({b2: b.b3}).whereNot({b3: b.b3}).whereNot({b4: b.b3}).whereNot({b5: b.b3})
    .whereNot({r1: b.b4}).whereNot({r2: b.b4}).whereNot({r3: b.b4}).whereNot({r4: b.b4}).whereNot({r5: b.b4}).whereNot({b1: b.b4}).whereNot({b2: b.b4}).whereNot({b3: b.b4}).whereNot({b4: b.b4}).whereNot({b5: b.b4})
    .whereNot({r1: b.b5}).whereNot({r2: b.b5}).whereNot({r3: b.b5}).whereNot({r4: b.b5}).whereNot({r5: b.b5}).whereNot({b1: b.b5}).whereNot({b2: b.b5}).whereNot({b3: b.b5}).whereNot({b4: b.b5}).whereNot({b5: b.b5})
    .whereNot({r1: b.b6}).whereNot({r2: b.b6}).whereNot({r3: b.b6}).whereNot({r4: b.b6}).whereNot({r5: b.b6}).whereNot({b1: b.b6}).whereNot({b2: b.b6}).whereNot({b3: b.b6}).whereNot({b4: b.b6}).whereNot({b5: b.b6})
    .whereNot({r1: b.b7}).whereNot({r2: b.b7}).whereNot({r3: b.b7}).whereNot({r4: b.b7}).whereNot({r5: b.b7}).whereNot({b1: b.b7}).whereNot({b2: b.b7}).whereNot({b3: b.b7}).whereNot({b4: b.b7}).whereNot({b5: b.b7})
    .whereNot({r1: b.b8}).whereNot({r2: b.b8}).whereNot({r3: b.b8}).whereNot({r4: b.b8}).whereNot({r5: b.b8}).whereNot({b1: b.b8}).whereNot({b2: b.b8}).whereNot({b3: b.b8}).whereNot({b4: b.b8}).whereNot({b5: b.b8})
    .whereNot({r1: b.b9}).whereNot({r2: b.b9}).whereNot({r3: b.b9}).whereNot({r4: b.b9}).whereNot({r5: b.b9}).whereNot({b1: b.b9}).whereNot({b2: b.b9}).whereNot({b3: b.b9}).whereNot({b4: b.b9}).whereNot({b5: b.b9})
    .whereNot({r1: b.b10}).whereNot({r2: b.b10}).whereNot({r3: b.b10}).whereNot({r4: b.b10}).whereNot({r5: b.b10}).whereNot({b1: b.b10}).whereNot({b2: b.b10}).whereNot({b3: b.b10}).whereNot({b4: b.b10}).whereNot({b5: b.b10})
    .then(result => {
        
        let winrate = getWinrate(result)
        res.status(200).send({winrate: winrate})
    })
    .catch(error => {
        res.status(401).send({error: error})
    })
}

function getWinrate(games) {
    let totalGames = games.length
    let wins = 0

    for (let i = 0; i<games.length; i++) {
        if(games[i].result == 1) {
            wins++
        }
    }

    let winrate = wins/totalGames
    return winrate
}

function getLossrate(games) {
    let totalGames = games.length
    let loss = 0

    for (let i = 0; i<games.length; i++) {
        if(games[i].result == 0) {
            loss++
        }
    }

    let winrate = loss/totalGames
    return winrate
}

function doAllies(a, res) {

    db('games')
    .where({r1: a.a1}).orWhere({r2: a.a1}).orWhere({r3: a.a1}).orWhere({r4: a.a1}).orWhere({r5: a.a1}).orWhere({b1: a.a1}).orWhere({b2: a.a1}).orWhere({b3: a.a1}).orWhere({b4: a.a1}).orWhere({b5: a.a1})
    .orWhere({r1: a.a2}).orWhere({r2: a.a2}).orWhere({r3: a.a2}).orWhere({r4: a.a2}).orWhere({r5: a.a2}).orWhere({b1: a.a2}).orWhere({b2: a.a2}).orWhere({b3: a.a2}).orWhere({b4: a.a2}).orWhere({b5: a.a2})
    .orWhere({r1: a.a3}).orWhere({r2: a.a3}).orWhere({r3: a.a3}).orWhere({r4: a.a3}).orWhere({r5: a.a3}).orWhere({b1: a.a3}).orWhere({b2: a.a3}).orWhere({b3: a.a3}).orWhere({b4: a.a3}).orWhere({b5: a.a3})
    .orWhere({r1: a.a4}).orWhere({r2: a.a4}).orWhere({r3: a.a4}).orWhere({r4: a.a4}).orWhere({r5: a.a4}).orWhere({b1: a.a4}).orWhere({b2: a.a4}).orWhere({b3: a.a4}).orWhere({b4: a.a4}).orWhere({b5: a.a4})
    .orWhere({r1: a.a5}).orWhere({r2: a.a5}).orWhere({r3: a.a5}).orWhere({r4: a.a5}).orWhere({r5: a.a5}).orWhere({b1: a.a5}).orWhere({b2: a.a5}).orWhere({b3: a.a5}).orWhere({b4: a.a5}).orWhere({b5: a.a5})
    .then(result => {
        
        let winrate = getWinrate(result)
        res.status(200).send({winrate: winrate})
    })
    .catch(error => {
        res.status(401).send({error: error})
    })
}

function myPick(p, res) {
    db('games')
    .where({r1: p.p}).orWhere({r2: p.p}).orWhere({r3: p.p}).orWhere({r4: p.p}).orWhere({r5: p.p}).orWhere({b1: p.p}).orWhere({b2: p.p}).orWhere({b3: p.p}).orWhere({b4: p.p}).orWhere({b5: p.p})
    .then(result => {
        
        let winrate = getWinrate(result)
        res.status(200).send({winrate: winrate})
    })
    .catch(error => {
        res.status(401).send({error: error})
    })
}

function doEnemies(a, res) {

    db('games')
    .where({r1: a.a1}).orWhere({r2: a.a1}).orWhere({r3: a.a1}).orWhere({r4: a.a1}).orWhere({r5: a.a1}).orWhere({b1: a.a1}).orWhere({b2: a.a1}).orWhere({b3: a.a1}).orWhere({b4: a.a1}).orWhere({b5: a.a1})
    .orWhere({r1: a.a2}).orWhere({r2: a.a2}).orWhere({r3: a.a2}).orWhere({r4: a.a2}).orWhere({r5: a.a2}).orWhere({b1: a.a2}).orWhere({b2: a.a2}).orWhere({b3: a.a2}).orWhere({b4: a.a2}).orWhere({b5: a.a2})
    .orWhere({r1: a.a3}).orWhere({r2: a.a3}).orWhere({r3: a.a3}).orWhere({r4: a.a3}).orWhere({r5: a.a3}).orWhere({b1: a.a3}).orWhere({b2: a.a3}).orWhere({b3: a.a3}).orWhere({b4: a.a3}).orWhere({b5: a.a3})
    .orWhere({r1: a.a4}).orWhere({r2: a.a4}).orWhere({r3: a.a4}).orWhere({r4: a.a4}).orWhere({r5: a.a4}).orWhere({b1: a.a4}).orWhere({b2: a.a4}).orWhere({b3: a.a4}).orWhere({b4: a.a4}).orWhere({b5: a.a4})
    .orWhere({r1: a.a5}).orWhere({r2: a.a5}).orWhere({r3: a.a5}).orWhere({r4: a.a5}).orWhere({r5: a.a5}).orWhere({b1: a.a5}).orWhere({b2: a.a5}).orWhere({b3: a.a5}).orWhere({b4: a.a5}).orWhere({b5: a.a5})
    .then(result => {
        
        let winrate = getLossrate(result)
        res.status(200).send({winrate: winrate})
    })
    .catch(error => {
        res.status(401).send({error: error})
    })
}

//endpoints

router.post('/bans', [
    check('b1').not().isEmpty().escape().isInt(),
    check('b2').not().isEmpty().escape().isInt(),
    check('b3').not().isEmpty().escape().isInt(),
    check('b4').not().isEmpty().escape().isInt(),
    check('b5').not().isEmpty().escape().isInt(),
    check('b6').not().isEmpty().escape().isInt(),
    check('b7').not().isEmpty().escape().isInt(),
    check('b8').not().isEmpty().escape().isInt(),
    check('b9').not().isEmpty().escape().isInt(),
    check('b10').not().isEmpty().escape().isInt()

],
function(req, res) {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
 }, async (req, res) => {

    doBans(req.body, res)
    
})

router.post('/allies', [
    check('a1').not().isEmpty().escape().isInt(),
    check('a2').not().isEmpty().escape().isInt(),
    check('a3').not().isEmpty().escape().isInt(),
    check('a4').not().isEmpty().escape().isInt(),
    check('a5').not().isEmpty().escape().isInt(),

],
function(req, res) {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
 }, (req, res) => {

    doAllies(req.body, res);

})

router.post('/mypick', [
    check('p').not().isEmpty().escape().isInt()

],
function(req, res) {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
 }, (req, res) => {

    myPick(req.body, res);
})

router.post('/enemies', [
    check('a1').not().isEmpty().escape().isInt(),
    check('a2').not().isEmpty().escape().isInt(),
    check('a3').not().isEmpty().escape().isInt(),
    check('a4').not().isEmpty().escape().isInt(),
    check('a5').not().isEmpty().escape().isInt(),

],
function(req, res) {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
 }, (req, res) => {

    doEnemies(req.body, res);
})

module.exports = router;