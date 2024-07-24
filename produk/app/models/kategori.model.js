module.exports = (sequelize, Sequelize) => {
  const Kategori = sequelize.define("mt_kategoris", {
    nama: {
      type: Sequelize.TEXT,
    },
  });
  return Kategori;
};
