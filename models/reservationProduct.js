// models/ReservationProducts.js
module.exports = (sequelize, DataTypes) => {
  const ReservationProducts = sequelize.define('ReservationProducts', {
    reservationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reservations',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
  });
  return ReservationProducts;
};
