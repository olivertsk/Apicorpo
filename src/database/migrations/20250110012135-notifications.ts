import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('notifications', {
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
      title: {
        type: DataTypes.STRING,
        field: 'title',
      },
      body: {
        type: DataTypes.STRING,
        field: 'body',
      },
      data: {
        type: DataTypes.STRING,
        field: 'data',
        allowNull: true,
        defaultValue: null,
      },
      type: {
        type: DataTypes.STRING,
        field: 'type',
        allowNull: true,
        defaultValue: null,
      },
      url: {
        type: DataTypes.STRING,
        field: 'url',
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        defaultValue: null,
        allowNull: true,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      isView: {
        type: DataTypes.BOOLEAN,
        field: 'is_view',
        defaultValue: false,
        allowNull: true,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('notifications')
  },
}
