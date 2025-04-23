import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('surveys', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt',
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt',
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deletedAt',
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        field: 'type',
        allowNull: true,
        defaultValue: null
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('surveys')
  },
}
