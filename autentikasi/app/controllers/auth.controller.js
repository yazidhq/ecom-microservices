const authConfig = require("../config/auth.config");
const db = require("../models");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const User = db.user;
const Role = db.role;

exports.signup = async (req, res) => {
  const user = {
    nama: req.body.nama,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    id_role: req.body.id_role,
  };

  const role = await Role.findByPk(req.body.id_role);

  if (!role) {
    return res.status(400).send({
      status: 400,
      message: `Data dengan id role ${user.id_role} tidak ditemukan`,
    });
  }

  if (role.nama == "admin") {
    return res.status(400).send({
      status: 400,
      message: `Role tidak sesuai`,
    });
  }

  user.role = role.nama;

  User.create(user)
    .then((user) => {
      return res.status(201).send({
        status: 201,
        message: "New user has been successfully registered!",
        data: {},
        data_count: 0,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: 500,
        message: "Failed to register new user!",
        data: {},
        data_count: 0,
      });
    });
};

exports.signin = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(400).send({
      status: 400,
      message: "User Not found.",
      data: {},
      data_count: 0,
    });
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      status: 401,
      message: "Invalid Password!",
      data: {},
      data_count: 0,
    });
  }

  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: "1d",
  });

  var result = {
    id: user.id,
    nama: user.nama,
    email: user.email,
    id_role: user.id_role,
    accessToken: token,
  };

  return res.status(200).send({
    status: 200,
    message: "OK",
    data: result,
    data_count: 1,
  });
};

exports.data = async (req, res) => {
  let jwtToken = req.headers["authorization"];

  if (!jwtToken) {
    return res.status(403).send({
      status: 403,
      message: "Token not available",
      data: {},
      data_count: 0,
    });
  }

  const TokenArray = jwtToken.split("Bearer ");
  const token = TokenArray[1];

  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized!",
        data: {},
        data_count: 0,
      });
    } else {
      const user = await User.findByPk(decoded.id);
      const result = {
        id: user.id,
        nama: user.nama,
        email: user.email,
        id_role: user.id_role,
        role: user.role,
        accessToken: token,
      };

      return res.status(200).send({
        status: 200,
        message: "OK",
        data: result,
        data_count: 1,
      });
    }
  });
};
