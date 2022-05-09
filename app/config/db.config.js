module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "1234qwer",
  DB: "project3",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};