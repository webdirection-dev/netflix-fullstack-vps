const router = require('express').Router()
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

const User = require('../models/User')

//REGISTER
router.post('/register', async (req, res) => {
    const key = process.env.SECRET_KEY
    const {username, email, password, status, profilePic, isAdmin} = req.body

    const pass = CryptoJS.AES.encrypt(password, key).toString()

    const newUser = new User({
        username,
        email,
        password: pass,
        status,
        profilePic,
        isAdmin,
    })

    try {
        const user = await newUser.save()
        const {password, ...info} = user._doc
        return res.status(201).json(info)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    const key = process.env.SECRET_KEY
    const {email} = req.body

    try {
        const user = await User.findOne({email})
        if (!user) return res.status(401).json('Wrong password or username!')

        const bytes = CryptoJS.AES.decrypt(user.password, key)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        if (originalPassword !== req.body.password) return res.status(401).json('Wrong password or username!')

        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            `${key}`,
            {expiresIn: '1d'} // время действия токена
        )

        const {password, ...info} = user._doc
        return res.status(200).json({...info, accessToken})
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router