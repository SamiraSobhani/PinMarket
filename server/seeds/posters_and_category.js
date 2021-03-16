const postersData = require("../seed_data/posters");
const categoryData = require("../seed_data/category");
const userData = require("../seed_data/user");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert(userData);
    })
    .then(() => {
      return knex("category")
        .del()
        .then(function () {
          return knex("category").insert(categoryData);
        });
    })

    .then(() => {
      return knex("posters").del();
    })
    .then(() => {
      // Inserts seed entries

      return knex("posters").insert(postersData);
    });
};
