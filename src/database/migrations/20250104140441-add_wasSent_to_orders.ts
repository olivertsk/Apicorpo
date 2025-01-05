
import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('orders', 'was_sent', {
      type: DataTypes.INTEGER,
      field: 'was_sent',
      allowNull: true,
      defaultValue: 0,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('orders', 'was_sent');
  },
};
    