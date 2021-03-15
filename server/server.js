const express = require("express");

const posterRoute = require("./routes/poster");

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posters", posterRoute);
app.use("/posters/:id", posterRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
