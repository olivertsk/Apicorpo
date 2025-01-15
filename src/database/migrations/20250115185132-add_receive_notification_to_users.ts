
import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('users', 'receive_notification', {
      type: DataTypes.STRING,
      field: 'receive_notification',
      allowNull: true,
      defaultValue: null,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('users', 'receive_notification')
  },
};
    