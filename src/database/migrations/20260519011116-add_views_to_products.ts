import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('products', 'views', {
      type: DataTypes.INTEGER,
      field: 'views',
      allowNull: true,
      defaultValue: 0,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('products', 'views')
  },
}
