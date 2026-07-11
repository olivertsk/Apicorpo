import { DataTypes, type QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('product_alert_queue', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      product_id: {
        type: DataTypes.UUID,
        field: 'product_id',
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      previous_price: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'previous_price',
        allowNull: true,
      },
      current_price: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'current_price',
        allowNull: true,
      },
      previous_stock: {
        type: DataTypes.INTEGER,
        field: 'previous_stock',
        allowNull: true,
      },
      current_stock: {
        type: DataTypes.INTEGER,
        field: 'current_stock',
        allowNull: true,
      },
      alert_type: {
        type: DataTypes.ENUM('price_drop', 'stock_available'),
        field: 'alert_type',
        allowNull: false,
      },
      processed: {
        type: DataTypes.BOOLEAN,
        field: 'processed',
        allowNull: false,
        defaultValue: false,
      },
      processed_at: {
        type: DataTypes.DATE,
        field: 'processed_at',
        allowNull: true,
      },
    })

    // Índices para mejorar performance
    await queryInterface.addIndex('product_alert_queue', ['processed'])
    await queryInterface.addIndex('product_alert_queue', ['product_id'])
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('product_alert_queue')
  },
}
