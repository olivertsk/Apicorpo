import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('order_products', {
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
      orderId: {
        type: DataTypes.UUID,
        field: 'order_id',
        defaultValue: null,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      code: {
        type: DataTypes.STRING,
        field: 'code',
        // comment: 'Codigo de producto',
      },
      salePrice: {
        type: DataTypes.FLOAT,
        field: 'sale_price',
        // comment: 'Precio marcado al momento de venta del producto',
      },
      valueTax: {
        type: DataTypes.FLOAT,
        field: 'value_tax',
        // comment: 'Tax del producto producto',
      },
      quantity: {
        type: DataTypes.INTEGER,
        field: 'quantity',
      },
      subtotalTax: {
        type: DataTypes.FLOAT,
        field: 'subtotal_tax',
        // comment: 'Tax del producto por cantidad',
      },
      subtotal: {
        type: DataTypes.FLOAT,
        field: 'subtotal',
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('order_products')
  },
}
