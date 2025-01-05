import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.addColumn('orders', 'admin_id', {
        type: DataTypes.STRING,
        field: 'admin_id',
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('orders', 'updated_status', {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('orders', 'reason', {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      }),
    ])
  },

  async down(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.removeColumn('orders', 'is_delivery'),
      queryInterface.removeColumn('orders', 'is_travel'),
    ])
  },
};
    