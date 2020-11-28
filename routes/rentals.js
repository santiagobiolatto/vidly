const express = require("express");
const router = express.Router();
const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { rentalValidation } = require("../validators/validator");
const mongoose = require("mongoose");
const Fawn = require("fawn");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.findById(req.params.id).sort({ dateOut: -1 });
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = rentalValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    res.status(400).send("There is no customer with the given ID");
    return;
  }
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    res.status(400).send("There is no movie with the given ID");
    return;
  }
  if (movie.numberInStock === 0) {
    res.status(400).send("Movie not in stock");
    return;
  }

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    res.send(rental);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
