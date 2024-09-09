// models/Reservation.js
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define("Reservation", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Aberta", "Cancelada", "Finalizada"),
      defaultValue: "Aberta",
    },
    repeat: {
      type: DataTypes.ENUM("None", "Daily", "Weekly", "Monthly"),
      defaultValue: "None",
    },
    repeatCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    repeatId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    paymentConditionId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId' });
    Reservation.belongsTo(models.PaymentCondition, { foreignKey: 'paymentConditionId' });
    Reservation.belongsToMany(models.Product, {
      through: models.ReservationProducts,
      foreignKey: 'reservationId',
      otherKey: 'productId',
    });
  };

  return Reservation;
};
