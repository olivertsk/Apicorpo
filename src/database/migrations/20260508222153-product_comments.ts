import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable(
      'product_comments', // Tabla product_comments
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        productId: {
          type: DataTypes.UUID,
          field: 'product_id',
          references: { model: 'products', key: 'id' },
        },
        userId: {
          type: DataTypes.UUID,
          field: 'user_id',
          references: { model: 'users', key: 'id' },
        },
        // El ID del comentario al que se está respondiendo
        parentId: {
          type: DataTypes.UUID,
          field: 'parent_id',
          allowNull: true, // Null si es comentario de nivel superior
          references: { model: 'product_comments', key: 'id' },
        },
        isApproved: { type: DataTypes.BOOLEAN, field: 'is_approved', defaultValue: false },
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
      }
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('product_comments')
  },
}
