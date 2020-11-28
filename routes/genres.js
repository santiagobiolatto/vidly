const express = require("express");
const router = express.Router();
const { genreValidator } = require("../validators/validator");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const idGenre = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idGenre) {
    res.status(400).send("Invalid genre ID");
    return;
  }
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(400).send("There is no genre with the given id");
    return;
  }
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = genreValidator(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = new Genre({
    name: req.body.name,
  });
  try {
    await genre.save();
    return res.send(genre);
  } catch (err) {
    for (fields in err.errors) {
      console.log(err.errors[fields].message);
    }
  }
});

router.put("/:id", async (req, res) => {
  const idGenre = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idGenre) {
    res.status(400).send("Invalid genre ID");
    return;
  }
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("There is no gender with the given ID");
    return;
  }
  const { error } = genreValidator(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const result = await Genre.updateOne(genre, { name: req.body.name });
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const idGenre = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idGenre) {
    res.status(400).send("Invalid genre ID");
    return;
  }
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(400).send("There is no gender with the given ID");
    return;
  }
  console.log(genre._id);
  await Genre.deleteOne({ _id: genre._id });
  res.send(genre);
});

module.exports = router;
