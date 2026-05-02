require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME || "games",
  DB_USER: process.env.DB_USER || "shrutmakadiya37_db_user",
  DB_PASS: process.env.DB_PASS || "fuMGk9lbCB4IqvxN",
  SECRET: "HTP",
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
};
