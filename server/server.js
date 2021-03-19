const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const posters = require("./routes/posters");

require("dotenv").config();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use("/posters", posters);


app.get("/", (req, res) => {
  res.json({
    greeting: "Welcome to My api 👽",
  });
});

app.listen(8080);
