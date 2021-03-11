const express = require("express");
const Poster = require("../models/posters");
const router = express.Router();

router.route("/").get((req, res) => {
  Poster.where(req.query)
    .fetchAll({ withRelated: ["user"] })
    .then((posters) => {
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
