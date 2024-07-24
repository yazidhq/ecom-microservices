module.exports = (sequelize, Sequelize) => {
  const Artikel = sequelize.define("mt_artikel", {
    id_user: {
      type: Sequelize.INTEGER,
    },
    judul: {
      type: Sequelize.TEXT,
    },
    kategori: {
      type: Sequelize.TEXT,
    },
    deskripsi: {
      type: Sequelize.TEXT,
    },
    file_img: {
      type: Sequelize.TEXT,
    },
  });
  return Artikel;
};
