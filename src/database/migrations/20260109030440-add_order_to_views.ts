import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('views', 'order', {
      type: DataTypes.INTEGER,
      field: 'order',
      allowNull: true,
      defaultValue: 0,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('views', 'order')
  },
}
