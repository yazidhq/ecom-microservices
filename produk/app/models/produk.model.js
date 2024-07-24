module.exports = (sequelize, Sequelize) => {
  const Produk = sequelize.define("mt_produks", {
    id_user: {
      type: Sequelize.INTEGER,
    },
    nama: {
      type: Sequelize.TEXT,
    },
    harga: {
      type: Sequelize.INTEGER,
    },
    id_kategori: {
      type: Sequelize.INTEGER,
    },
    kategori: {
      type: Sequelize.TEXT,
    },
    stok: {
      type: Sequelize.INTEGER,
    },
    file_img: {
      type: Sequelize.TEXT,
    },
  });
  return Produk;
};
