import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('favorite_products', {
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
      productId: {
        type: DataTypes.UUID,
        field: 'product_id',
        defaultValue: null,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        defaultValue: null,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('favorite_products')
  },
}
