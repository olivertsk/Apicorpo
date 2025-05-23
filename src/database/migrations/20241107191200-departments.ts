import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('departments', {
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
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deletedAt',
      },
      icon: {
        type: DataTypes.STRING,
        field: 'icon',
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        field: 'description',
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: true,
        allowNull: true,
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('departments')
  },
}
