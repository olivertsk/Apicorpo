import { DataTypes, type QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('post_products', {
      id: { type: DataTypes.UUID, primaryKey: true },
      postId: {
        type: DataTypes.UUID,
        field: 'post_id',
        references: { model: 'posts', key: 'id' },
        onDelete: 'CASCADE',
      },
      productId: {
        type: DataTypes.UUID,
        field: 'product_id',
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
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
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('post_products')
  },
}
