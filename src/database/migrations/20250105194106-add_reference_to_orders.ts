import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.addColumn('orders', 'reference', {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('orders', 'type_payment', {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('orders', 'payment_method_id', {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      }),
    ])
  },

  async down(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.removeColumn('orders', 'reference'),
      queryInterface.removeColumn('orders', 'type_payment'),
      queryInterface.removeColumn('orders', 'payment_method_id'),
    ])
  },
}
