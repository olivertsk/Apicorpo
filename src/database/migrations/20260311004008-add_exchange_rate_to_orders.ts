import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('orders', 'exchange_rate', {
      type: DataTypes.DECIMAL(18, 4),
      field: 'exchange_rate',
      allowNull: true,
      defaultValue: 1,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('orders', 'exchange_rate')
  },
}
