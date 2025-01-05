
import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('bulk_upload_logs', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt',
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt',
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        field: 'type',
      },
      quantity: {
        type: DataTypes.STRING,
        field: 'quantity',
      },
      date: {
        type: DataTypes.STRING,
        field: 'date',
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('bulk_upload_logs');
  },
};
    