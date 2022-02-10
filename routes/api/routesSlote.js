const express = require('express');
const router = express.Router()
const win = require('../../helpers/determinesPayoff')

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
    console.log('Time Next: ', Date.now())
})



router.post(
    '/',
    async (req, res, next) => {
        try {
            const result = win(req.body)
            res.send(result)
        } catch (err) {
            next(err)
        }
    })

module.exports = router