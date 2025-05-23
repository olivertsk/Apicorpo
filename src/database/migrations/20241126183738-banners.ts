import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('banners', {
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
      images: {
        type: DataTypes.STRING,
        field: 'images',
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
      position: {
        type: DataTypes.STRING,
        field: 'position',
        defaultValue: true,
        allowNull: true,
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('banners')
  },
}
