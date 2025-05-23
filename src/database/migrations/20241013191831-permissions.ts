import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('permissions', {
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
      rolId: {
        type: DataTypes.UUID,
        field: 'rol_id',
        defaultValue: null,
        allowNull: true,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      viewId: {
        type: DataTypes.UUID,
        field: 'view_id',
        defaultValue: null,
        allowNull: true,
        references: {
          model: 'views',
          key: 'id',
        },
      },
      post: {
        type: DataTypes.BOOLEAN,
        field: 'post',
        defaultValue: null,
        allowNull: true,
      },
      put: {
        type: DataTypes.BOOLEAN,
        field: 'put',
        defaultValue: null,
        allowNull: true,
      },
      delete: {
        type: DataTypes.BOOLEAN,
        field: 'delete',
        defaultValue: null,
        allowNull: true,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('permissions')
  },
}
