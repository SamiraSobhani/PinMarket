const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const posters = require("./routes/posters");
const users = require("./routes/users");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["get", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "0f219ed5f12",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1,
    },
  })
);

app.use(morgan("dev"));
app.use(cors());

app.use("/", users);
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
