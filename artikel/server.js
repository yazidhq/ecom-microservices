const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

global.__basedir = __dirname + "/.";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (if needed)
app.use(express.static("public/upload"));

// Routes
app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Backend Aplikasi Kelola Produk",
    data: {},
    data_count: 0,
  });
});

var glob = require("glob"),
  path = require("path");

glob.sync("./app/routes/*.js").forEach(function (file) {
  require(path.resolve(file))(app);
});

// set port, listen for requests
const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync({ force: false, alter: true });
