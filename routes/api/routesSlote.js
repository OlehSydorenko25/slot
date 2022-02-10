const express = require('express');
const router = express.Router()
const configuration = require('../../configuration.json')
const Win = require('../../helpers/determinesPayoff')

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
    console.log('Time Next: ', Date.now())
})



router.get(
    '/',
    async (req, res, next) => {
        try {
            const result = new Win(req.query, configuration)
            res.send(result.getTotalWin())
        } catch (err) {
            next(err)
        }
    })

module.exports = router