const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const glob = require("glob");
const path = require("path");

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

// Routes
app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Backend Autentikasi",
    data: {},
    data_count: 0,
  });
});

// require all route files
glob.sync("./app/routes/*.js").forEach(function (file) {
  require(path.resolve(file))(app);
});

// set port, listen for requests
const PORT = process.env.PORT || 8010;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync({ force: false, alter: true });
