import { DataTypes, type QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('suggestions', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(), //'PENDIENTE', 'EN_REVISION', 'RESUELTO', 'RECHAZADO'
        defaultValue: 'PENDIENTE',
      },
      priority: {
        type: DataTypes.STRING(), //'BAJA', 'MEDIA', 'ALTA', 'URGENTE'
        defaultValue: 'MEDIA',
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      responseDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('suggestions')
  },
}
