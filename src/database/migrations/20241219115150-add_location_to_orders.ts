import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('orders', 'location', {
      type: DataTypes.STRING,
      field: 'location',
      allowNull: true,
      defaultValue: null,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('orders', 'location')
  },
}
