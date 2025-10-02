import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('orders', 'paid_with', {
      type: DataTypes.STRING,
      field: 'paid_with',
      allowNull: true,
      defaultValue: null,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('orders', 'paid_with')
  },
}
