const express = require("express");
const router = express.Router();
const { authValidation } = require("../validators/validator");
const { User } = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mongoose = require("mongoose");
const _ = require('lodash');

router.post('/', async(req, res)=>{
    const { error } = authValidation(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    let user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(400).send('Invalid email or password');
        return;
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        res.status(400).send('Invalid email or password');
        return;
    }
    const token = jwt.sign({
        _id: user._id
    }, config.JWTSecret)
    res.send(token)
});

module.exports = router;