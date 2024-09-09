module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
    {
      sequelize,
      modelName: 'Product',
      indexes: [
        {
          unique: true,
          fields: ['name', 'capacity', 'location']
        }
      ]
    });
  Product.associate = (models) => {
    Product.belongsToMany(models.Reservation, {
      through: models.ReservationProducts,
      foreignKey: 'productId',
      otherKey: 'reservationId',
    });
  };
  return Product;
};
