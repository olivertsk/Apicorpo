
import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('categories', 'code', {
      type: DataTypes.STRING,
      field: 'code',
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('categories', 'code');
  },
};
    