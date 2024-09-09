'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("Aberta", "Cancelada", "Finalizada"),
        defaultValue: "Aberta"
      },
      repeat: {
        type: Sequelize.ENUM("None", "Daily", "Weekly", "Monthly"),
        defaultValue: "None"
      },
      repeatCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      repeatId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalValue: {
        type: Sequelize.DECIMAL(10, 2)
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      paymentConditionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PaymentConditions',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  }
};
