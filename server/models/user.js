const bookshelf = require("../bookshelf");
require("./posters");

const User = bookshelf.model("User", {
  tableName: "user",
  poster: function () {
    return this.blongsTo("poster");
  },
});

module.exports = User;
