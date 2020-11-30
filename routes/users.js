const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { userValidation } = require("../validators/validator");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

//User router using lodash
//You can use joi-password-complexity to
router.post("/", async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("User already registered");
    return;
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
  
});
//This is for logging user, for log out this need to be done of the client side deleting the token of the browser
router.get('/me', auth,  async(req, res)=>{
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

module.exports = router;
