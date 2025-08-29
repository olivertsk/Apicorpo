import { DataTypes, type QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('conversations', {
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
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        field: 'userId',
        allowNull: true,
        references: {
          model: 'users', // Ajusta según tu modelo de usuarios
          key: 'id',
        },
      },
      status: {
        type: DataTypes.TINYINT,
        field: 'status',
        defaultValue: 1,
        allowNull: false,
      },
      context: {
        type: DataTypes.JSON,
        field: 'context',
        allowNull: true,
        defaultValue: null,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('conversations')
  },
}
