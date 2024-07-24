module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("tt_user", {
    nama: {
      type: Sequelize.TEXT,
    },
    email: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.TEXT,
    },
    id_role: {
      type: Sequelize.INTEGER,
    },
    role: {
      type: Sequelize.TEXT,
    },
  });
  return User;
};
