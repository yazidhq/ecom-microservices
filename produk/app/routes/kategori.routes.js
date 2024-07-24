const controller = require("../controllers/kategori.controller.js");
const { isLogin } = require("../middleware/isLogin.js");
var base_url = "/api/kategori";

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(base_url, isLogin, controller.create);
  app.get(base_url, isLogin, controller.read);
  app.get(base_url + "/:id", isLogin, controller.readOne);
  app.put(base_url + "/:id", isLogin, controller.update);
  app.delete(base_url + "/truncate", isLogin, controller.deleteAll);
  app.delete(base_url + "/:id", isLogin, controller.delete);
};
