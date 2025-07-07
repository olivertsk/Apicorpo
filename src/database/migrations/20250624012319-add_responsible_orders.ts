import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.addColumn('orders', 'responsible_id', {
        field: 'responsible_id',
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('orders', 'view_time', {
        field: 'view_time',
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      }),
    ])
  },

  async down(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.removeColumn('orders', 'responsible_id'),
      queryInterface.removeColumn('orders', 'view_time'),
    ])
  },
}
