module.exports = {
  HOST: "localhost",
  DB: "db_kelola_artikel",
  USER: "postgres",
  PASSWORD: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
