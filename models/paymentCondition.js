module.exports = (sequelize, DataTypes) => {
  const PaymentCondition = sequelize.define('PaymentCondition', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Adicione mais campos conforme necessário
  });

  return PaymentCondition;
};
