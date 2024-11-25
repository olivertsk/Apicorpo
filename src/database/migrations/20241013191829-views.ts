import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('views', {
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
        defaultValue: null,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        defaultValue: null,
        allowNull: true
      },
      route: {
        type: DataTypes.STRING,
        field: 'route',
        defaultValue: null,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        field: 'url',
        defaultValue: null,
        allowNull: true
      }
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('views')
  },
}
