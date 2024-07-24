const controller = require("../controllers/role.controller.js");
const { verifyToken } = require("../middleware/authJwt.js");
var base_url = "/api/role";

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(base_url, verifyToken, verifyAdmin, controller.create);
  app.get(base_url, verifyToken, verifyAdmin, controller.read);
  app.get(base_url + "/:id", verifyToken, verifyAdmin, controller.readOne);
  app.put(base_url + "/:id", verifyToken, verifyAdmin, controller.update);
  app.delete(
    base_url + "/truncate",
    verifyToken,
    verifyAdmin,
    controller.deleteAll
  );
  app.delete(base_url + "/:id", verifyToken, verifyAdmin, controller.delete);
};
