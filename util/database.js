const Sequelize = require("sequelize");

const sequelize = new Sequelize("mailbox_client", "root", "ravi2233", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
