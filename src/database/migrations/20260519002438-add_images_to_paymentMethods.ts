import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('payment_methods', 'image_info', {
      type: DataTypes.STRING,
      field: 'image_info',
      allowNull: true,
      defaultValue: null,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('payment_methods', 'image_info')
  },
}
