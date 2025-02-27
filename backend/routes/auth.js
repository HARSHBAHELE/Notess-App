const express = require('express');
const User = require('../modules/User')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/featchUser')
const JWT_SECRETE = process.env.JWT_SECRETE
//Creat a use using POST "/api/auth"
router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must have 8 charecters").isLength({ min: 8 }),

], async (req, res) => {
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({sucess, errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10);
    let secpass = await bcrypt.hash(req.body.password, salt)
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authData = jwt.sign(data, JWT_SECRETE)
        sucess=true
        res.json({sucess, authData })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email alredy exists" });
        }
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
    res.status
})
//authinticate a user
router.post('/login', [
    // body('name',"Enter a valid name").isLength({min:3}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password Cannot be blank").exists(),

], async (req, res) => {
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email,password} = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            sucess=false
            return res.status(400).json({ errors: "Try to login with correct username" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            sucess=false
            return res.status(400).json({sucess, errors: "Try to login with correct Password" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authData = jwt.sign(data, JWT_SECRETE)
        sucess= true
        res.json({sucess, authData })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email alredy exists" });
        }
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
});
router.post('/getUser', fetchUser, [], async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email alredy exists" });
        }
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
})

module.exports = router
