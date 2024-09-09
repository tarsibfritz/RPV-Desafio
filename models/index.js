'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations
db.User.associate = (models) => {
  db.User.hasMany(models.Reservation, { foreignKey: 'userId' });
};

db.Product.associate = (models) => {
  db.Product.belongsToMany(models.Reservation, {
    through: models.ReservationProducts,
    foreignKey: 'productId',
    otherKey: 'reservationId',
  });
};

db.Reservation.associate = (models) => {
  db.Reservation.belongsTo(models.User, { foreignKey: 'userId' });
  db.Reservation.belongsTo(models.PaymentCondition, { foreignKey: 'paymentConditionId' });
  db.Reservation.belongsToMany(models.Product, {
    through: models.ReservationProducts,
    foreignKey: 'reservationId',
    otherKey: 'productId',
  });
};

db.PaymentCondition.associate = (models) => {
  db.PaymentCondition.hasMany(models.Reservation, { foreignKey: 'paymentConditionId' });
};

sequelize.sync({ alter: true })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch(err => {
    console.error("An error occurred while synchronizing the models:", err);
  });


module.exports = db;
