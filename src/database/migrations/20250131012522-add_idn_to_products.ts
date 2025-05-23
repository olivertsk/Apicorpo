import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('products', 'idn', {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('products', 'idn')
  },
}
