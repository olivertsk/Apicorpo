
import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('orders', 'status', {
      type: DataTypes.STRING,
      field: 'status',
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('orders', 'status');
  },
};
    