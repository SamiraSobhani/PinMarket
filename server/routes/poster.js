const express = require("express");
const Poster = require("../models/posters");
const router = express.Router();
const Category = require("../models/category");
const User = require("../models/user");
const knex = require("knex")(require("../knexfile"));
// get all posters
router.route("/").get((req, res) => {
  knex("posters")
    .select(
      "posters.id",
      "posters.title",
      "posters.description",
      "posters.price",
      "posters.pay_type",
      "posters.start_date",
      "posters.end_date",
      "posters.latitude",
      "posters.longitude",
      "category.name",
      "posters.client_id",
      "posters.helper_id"
    )

    .innerJoin("category", "posters.category_id", "=", "category.id")

    .then((posters) => {
      console.log(posters);
      res.status(200).json(posters);
    })
    .catch((err) => {
      res.status(404).json({
        status: 404,
        message: "Data not found",
        error: err,
      });
    });
});

// get single poster
router.route("/:id").get((req, res) => {
  // knex("posters")
  //   .select(
  //     "posters.id",
  //     "posters.title",
  //     "posters.description",
  //     "posters.price",
  //     "posters.pay_type",
  //     "posters.start_date",
  //     "posters.end_date",
  //     "posters.latitude",
  //     "posters.longitude",
  //     "category.name",
  //     "posters.client_id",
  //     "posters.helper_id"
  //   )
  //   .where(req.params.id)
  //   .innerJoin("category", "posters.category_id", "=", "category.id")
  //   // .where(req.params.id)

  //   .then((poster) => {
  //     res.status(200).json(poster);
  //   })
  //   .catch((err) => {
  //     res.status(404).json({
  //       status: 404,
  //       message: "Data not found",
  //       error: err,
  //     });
  //   });

  Poster.where(req.params)
    .fetch({ withRelated: ["category"] }, { withRelated: ["user"] })
    .then((poster) => {
      res.status(200).json({ poster });
    });
});

router.route("/").post((req, res) => {
  knex("posters")
    .insert({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      pay_type: req.body.pay_type,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      category_id: req.body.category_id,
      client_id: req.body.client_id,
    })

    .then((posters) => {
      res.status(201).json({ posters });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
