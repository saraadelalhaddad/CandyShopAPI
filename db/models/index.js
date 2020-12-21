"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relationship - One Bakery has Many Candies
db.Bakery.hasMany(db.Candy, {
  as: "candies",
  foreignKey: { fieldName: "bakeryId", allowNull: false },
});
db.Candy.belongsTo(db.Bakery, {
  as: "bakery",
  foreignKey: { fieldName: "bakeryId" },
});

// Relationship - One-to-One
db.User.hasOne(db.Bakery, { as: "bakery", foreignKey: "userId" });
db.Bakery.belongsTo(db.User, { as: "user" });

// Relationship - One User has Many Orders
db.User.hasMany(db.Order, { as: "orders", foreignKey: "userId" });
db.Order.belongsTo(db.User, { as: "user" });

// Relationship - Many-to-Many
db.Order.belongsToMany(db.Candy, {
  through: db.OrderItem,
  foreignKey: "orderId",
});
db.Candy.belongsToMany(db.Order, {
  through: db.OrderItem,
  foreignKey: "candyId",
});

module.exports = db;
