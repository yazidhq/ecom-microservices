module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("mt_role", {
    nama: {
      type: Sequelize.TEXT,
    },
  });
  return Role;
};
