const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const { unauthorized, getUserData } = require("../controllers/helpers");

exports.isLogin = async (req, res, next) => {
  const jwtToken = req.headers["authorization"];

  if (!jwtToken) {
    return res.status(403).send({
      status: 403,
      message: "Token tidak tersedia",
      data: {},
      data_count: 0,
    });
  }

  const userData = async () => {
    const userData = await getUserData(jwtToken);
    return userData;
  };

  const user = await userData();

  if (user.data.data.role !== "seller") {
    return unauthorized(res);
  }

  const TokenArray = jwtToken.split("Bearer ");
  const token = TokenArray[1];
  const config = await authConfig.loadSecret();

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return unauthorized(res);
    }

    req.userId = decoded.id;
    next();
  });
};
