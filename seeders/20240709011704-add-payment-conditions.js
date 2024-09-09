'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PaymentConditions', [
      {
        name: 'Pix',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'PayPal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cartão de Crédito',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PaymentConditions', null, {});
  }
};
