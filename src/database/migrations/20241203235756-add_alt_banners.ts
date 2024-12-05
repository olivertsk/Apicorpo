import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('banners', 'alt', {
      type: DataTypes.STRING,
      field: 'alt',
      allowNull: true,
      defaultValue: null,
    });
  },
  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('banners', 'alt');
  },
}
