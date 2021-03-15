const bookshelf = require("../bookshelf");
require("./poster_category");
require("./user");
require("./category");

const Poster = bookshelf.model("Poster", {
  tableName: "posters",
  category: function () {
    return this.belongsTo("Category");
  }
});

module.exports = Poster;

