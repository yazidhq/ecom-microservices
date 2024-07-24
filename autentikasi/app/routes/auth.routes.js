const controller = require("../controllers/auth.controller.js");
var base_url = "/api/auth";

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(base_url + "/signup", controller.signup);
  app.post(base_url + "/signin", controller.signin);
  app.get(base_url + "/data", controller.data);
};
