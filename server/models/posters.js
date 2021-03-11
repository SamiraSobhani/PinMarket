const bookshelf = require("../bookshelf");
require("./category")
require("./user")

const Poster = bookshelf.model("Poster", {
  tableName: "poster",
  category: function () {
    return this.blongsTo("category")
  },
  user: function(){
    return this.blongsTo("user")
  }
});

module.exports = Poster;