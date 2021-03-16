const express = require("express");
const router = express.Router();
const User = require("../models/user");
const knex = require("knex")(require("../knexfile"));

router.route("/user/:id").get((req, res) => {
  console.log("inside user route");
  // User.where(req.params)
  //   .fetch()
  //   .then((user) => {
  //     res.status(200).json({ user });
  //   });

  knex("user")
    .select("user.name")
    .where(req.params.id)

    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json({
        status: 404,
        message: "Data not found",
        error: err,
      });
    });
});
module.exports = router;
