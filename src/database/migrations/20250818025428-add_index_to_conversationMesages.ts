import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('conversation_messages', 'index', {
      type: DataTypes.INTEGER,
      field: 'index',
      allowNull: true,
      defaultValue: 0,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('conversation_messages', 'index')
  },
}
