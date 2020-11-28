const express = require("express");
const router = express.Router();
const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const { movieValidator } = require("../validators/validator");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort({ name: 1 });
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = movieValidator(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.status(400).send("There is no genre with the given ID");
    return;
  }
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  try {
    await movie.save();
    return res.send(movie);
  } catch (err) {
    for (fields in err.errors) {
      console.log(err.errors[fields].message);
    }
  }
});

router.get("/:id", async (req, res) => {
  const idMovie = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idMovie) {
    res.status(400).send("Invalid movie ID");
    return;
  }
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(400).send("There is no movie with the given ID");
    return;
  }
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const idMovie = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idMovie) {
    res.status(400).send("Invalid movie ID");
    return;
  }
  const { error } = movieValidator(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.status(400).send("Invalid genre");
    return;
  }
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.name,
      genre: {
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie) {
    res.status(400).send("There is no movie with the given ID");
    return;
  }
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const idMovie = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idMovie) {
    res.status(400).send("Invalid movie ID");
    return;
  }
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    res.status(400).send("There is no movie with the given ID");
    return;
  }
  res.send(movie);
});

module.exports = router;
