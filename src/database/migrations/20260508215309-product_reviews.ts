import { DataTypes, type QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('product_reviews', {
      id: { type: DataTypes.UUID, primaryKey: true },
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
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      comment: { type: DataTypes.TEXT, allowNull: true },
      // Para moderación (evitar spam o insultos)
      isApproved: {
        type: DataTypes.BOOLEAN,
        field: 'is_approved',
        defaultValue: false,
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('product_reviews')
  },
}
