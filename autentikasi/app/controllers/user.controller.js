const db = require("../models");
const helpers = require("./helpers");
const bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;

exports.create = async (req, res) => {
  const user = req.body;

  const role = await Role.findByPk(user.id_role);

  if (!role) {
    return res.status(400).send({
      status: 400,
      message: `Data dengan id role ${user.id_role} tidak ditemukan`,
    });
  }

  user.password = bcrypt.hashSync(user.password, 8);
  user.role = role.nama;

  User.create(user)
    .then((data) => {
      return res.status(201).send({
        status: 201,
        message: "Data berhasil disimpan",
        data: data,
        data_count: 1,
      });
    })
    .catch((err) => {
      const message = err.message || "Terjadi kesalahan saat menyimpan data";
      return res.status(500).send({
        status: 500,
        message: message,
        data: {},
        data_count: 0,
      });
    });
};

exports.read = async (req, res) => {
  const sort = req.query.sort;
  const filter = req.query.filter;
  const limit = req.query.limit;
  var query = helpers.getFilter(sort, filter, limit);

  var data = await User.findAll(query);

  if (data) {
    return res.status(200).send({
      status: 200,
      message: "OK",
      data: data,
      data_count: data.length,
    });
  } else {
    return res.status(500).send({
      status: 500,
      message: "Terjadi kesalahan saat menampilkan data",
      data: {},
      data_count: 0,
    });
  }
};

exports.readOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        return res.status(200).send({
          status: 200,
          message: "OK",
          data: data,
          data_count: 1,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "Data tidak dapat ditemukan",
          data: {},
          data_count: 0,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Terjadi kesalahan saat menampilkan data",
        data: {},
        data_count: 0,
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  let data_upd = req.body;

  const role = await Role.findByPk(data_upd.id_role);

  if (!role) {
    return res.status(400).send({
      status: 400,
      message: `Data dengan id=${data_upd.id_role} tidak ditemukan`,
    });
  }

  data_upd.password = bcrypt.hashSync(data_upd.password, 8);
  data_upd.role = role.nama;

  User.update(data_upd, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.status(200).send({
          status: 200,
          message: "Data berhasil diperbarui!",
          data: data_upd,
          data_count: data_upd.length,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: `Tidak dapat menemukan data dengan id=${id}!`,
          data: {},
          data_count: 0,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        status: 500,
        message: "Terjadi kesalahan saat memperbarui data dengan id=" + id,
        data: {},
        data_count: 0,
      });
    });
};

exports.deleteAll = async (req, res) => {
  User.truncate({ cascade: true, restartIdentity: true })
    .then((num) => {
      return res.status(200).send({
        status: 200,
        message: "Tabel berhasil dikosongkan!",
        data: {},
        data_count: 0,
      });
    })
    .catch((err) => {
      const message = err.message || "Gagal mengosongkan tabel.";
      return res.status(500).send({
        status: 500,
        message: message,
        data: {},
        data_count: 0,
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.status(200).send({
          status: 200,
          message: "Data berhasil dihapus!",
          data: {},
          data_count: 0,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: `Tidak dapat menemukan data dengan id=${id}!`,
          data: {},
          data_count: 0,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        status: 500,
        message: "Failed to delete data with id=" + id,
        data: {},
        data_count: 0,
      });
    });
};
