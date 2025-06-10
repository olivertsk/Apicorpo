import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('users', 'uid', {
      type: DataTypes.STRING,
      field: 'uid',
      allowNull: true,
      defaultValue: null,
    })
  },
  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('users', 'uid')
  },
}
