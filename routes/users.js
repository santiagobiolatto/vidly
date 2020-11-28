const express = require("express");
const router = express.Router();
const { userValidation } = require("../validators/validator");
const { User } = require("../models/user");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const _ = require('lodash');

router.post('/', async(req, res)=>{
    const { error } = userValidation(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    let user = await User.findOne({email: req.body.email});
    if(user){
        res.status(400).send('User already registered');
        return;
    }
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['id','name', 'email']));
});

module.exports = router;