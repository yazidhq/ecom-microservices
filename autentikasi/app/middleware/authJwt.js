const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const db = require("../models");

const User = db.user;

verifyToken = (req, res, next) => {
  let jwtToken = req.headers["authorization"];

  if (!jwtToken) {
    return res.status(403).send({
      status: 403,
      message: "Token tidak tersedia",
      data: {},
      data_count: 0,
    });
  }

  var TokenArray = jwtToken.split("Bearer ");
  var token = TokenArray[1];

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized!",
        data: {},
        data_count: 0,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

verifyAdmin = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  const TokenArray = jwtToken.split("Bearer ");
  const token = TokenArray[1];

  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      return unauthorized(res);
    }

    req.userId = decoded.id;

    const userRole = await User.findByPk(req.userId);

    if (userRole.role !== "admin") {
      return res.status(400).send({
        status: 400,
        message: "Data Forbidden",
      });
    }

    next();
  });
};

const authJwt = { verifyToken: verifyToken, verifyAdmin: verifyAdmin };
module.exports = authJwt;
