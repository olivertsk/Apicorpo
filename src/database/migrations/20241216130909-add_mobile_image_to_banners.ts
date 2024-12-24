import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('banners', 'mobile_image', {
      type: DataTypes.STRING,
      field: 'mobile_image',
      allowNull: true,
      defaultValue: null,
    })
  },
  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('banners', 'mobile_image')
  },
}
