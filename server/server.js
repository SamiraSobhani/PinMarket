const express = require("express");

const userRoute = require("./routes/user");
const posterRoute = require("./routes/poster");

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user/:id", userRoute);
app.use("/posters/:id", posterRoute);
app.use("/posters", posterRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
