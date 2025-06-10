import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.addColumn('users', 'gender', {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('users', 'state', {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('users', 'city', {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('users', 'zone', {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      }),
    ])
  },

  async down(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.removeColumn('users', 'gender'),
      queryInterface.removeColumn('users', 'state'),
      queryInterface.removeColumn('users', 'city'),
      queryInterface.removeColumn('users', 'zone'),
    ])
  },
}
