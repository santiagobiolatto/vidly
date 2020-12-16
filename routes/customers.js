const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { customerValidator } = require("../validators/validator");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");

router.get("/",[auth,admin], async (req, res) => {
  const customer = await Customer.find().sort({ name: 1 });
  res.send(customer);
});

router.post("/",[auth,admin], async (req, res) => {
  //Validations
  const { error } = customerValidator(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //Create customer
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  //Save customer
  try {
    await customer.save();
    return res.send(customer);
  } catch (err) {
    for (fields in err.errors) {
      console.log(err.errors[fields].message);
    }
  }
});

router.put("/:id",[auth,admin], async (req, res) => {
  const { error } = customerValidator(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const idCustomer = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idCustomer) {
    res.status(400).send("Invalid customer ID");
    return;
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer) {
    return res.status(400).send("The given id of customer doesn't exist");
  }
  res.send(customer);
});

router.get("/:id",[auth,admin], async (req, res) => {
  const idCustomer = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idCustomer) {
    res.status(400).send("Invalid customer ID");
    return;
  }
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(400).send("The given id of customer doesn't exist");
  }
  res.send(customer);
});

router.delete("/:id",[auth,admin], async (req, res) => {
  const idCustomer = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idCustomer) {
    res.status(400).send("Invalid customer ID");
    return;
  }
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    return res.status(400).send("The given id of customer doesn't exist");
  }
  res.send(customer);
});

module.exports = router;
