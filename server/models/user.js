const bookshelf = require("../bookshelf");
require("./posters");

const User = bookshelf.model("User", {
  tableName: "user",
  poster: function () {
    return this.hasMany("Poster");
  },
});

module.exports = User;
