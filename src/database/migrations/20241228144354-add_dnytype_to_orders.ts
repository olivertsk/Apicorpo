
import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('orders', 'dnitype', {
      type: DataTypes.STRING,
      field: 'dni_type',
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('orders', 'dnitype');
  },
};
    