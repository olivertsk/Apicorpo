import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('departments', 'isSalient', {
      type: DataTypes.BOOLEAN,
      field: 'isSalient',
      allowNull: true,
      defaultValue: false,
    });
  },
  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('departments', 'isSalient');
  },
}
