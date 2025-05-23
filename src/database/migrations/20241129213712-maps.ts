import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('maps', {
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
      image: {
        type: DataTypes.STRING,
        field: 'image',
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
      address: {
        type: DataTypes.STRING,
        field: 'address',
        allowNull: true,
        defaultValue: null,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: true,
        defaultValue: null,
      },
      map: {
        type: DataTypes.STRING,
        field: 'map',
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: true,
        allowNull: true,
      },
      order: {
        type: DataTypes.STRING,
        field: 'order',
        defaultValue: true,
        allowNull: true,
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('maps')
  },
}
