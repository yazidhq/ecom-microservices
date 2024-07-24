const authConfig = require("../config/auth.config");
const { verifyToken } = require("../middleware/authJwt.js");
var base_url = "/api";

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(base_url + "/config", (req, res) => {
    return res.status(200).send({
      status: 200,
      config: authConfig,
    });
  });
};
