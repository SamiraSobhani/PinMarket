const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const posters = require("./routes/posters");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

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

io.on("connection", (socket) => {
  socket.emit("your id", socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
});

server.listen(8080);
