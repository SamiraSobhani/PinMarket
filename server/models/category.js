const bookshelf = require("../bookshelf");
require("./posters")

const Category = bookshelf.model("Category", {
  tableName: "category",
  poster: function () {
    return this.hasMany("Poster")
  },
});

module.exports = Category;