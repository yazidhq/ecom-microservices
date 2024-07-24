const controller = require("../controllers/artikel.controller.js");
const { isLogin } = require("../middleware/isLogin.js");
const upload = require("../middleware/upload.js");

var base_url = "/api/artikel";

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(base_url, isLogin, upload.single("file_img"), controller.create);
  app.get(base_url, controller.read);
  app.get(base_url + "/:id", controller.readOne);
  app.put(
    base_url + "/:id",
    isLogin,
    upload.single("file_img"),
    controller.update
  );
  app.delete(base_url + "/truncate", isLogin, controller.deleteAll);
  app.delete(base_url + "/:id", isLogin, controller.delete);
};
