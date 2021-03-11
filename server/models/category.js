const bookshelf = require("../bookshelf");
require("./posters")

const Category = bookshelf.model("Category", {
  tableName: "category",
  poster: function () {
    return this.hasMany("poster")
  },
});

module.exports = Category;