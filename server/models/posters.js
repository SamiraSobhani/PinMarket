const bookshelf = require("../bookshelf");

require("./user");
require("./category");

const Poster = bookshelf.model("Poster", {
  tableName: "posters",
  category: function () {
    return this.belongsTo("Category");
  },
  user: function () {
    return this.belongsToMany("User");
  },
});

module.exports = Poster;
