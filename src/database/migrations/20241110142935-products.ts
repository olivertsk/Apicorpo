import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('products', {
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
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        field: 'code',
        allowNull: false,
        unique: true,
      },
      departmentId: {
        type: DataTypes.UUID,
        field: 'department_id',
        allowNull: true,
        references: {
          model: 'departments',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.UUID,
        field: 'category_id',
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: true,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        field: 'description',
        allowNull: true,
        defaultValue: null,
      },
      longDescription: {
        type: DataTypes.TEXT,
        field: 'long_description',
        allowNull: true,
        defaultValue: null,
      },
      price: {
        type: DataTypes.FLOAT,
        field: 'price',
        allowNull: false,
      },
      promotionalPrice: {
        type: DataTypes.FLOAT,
        field: 'promotional_price',
        allowNull: true,
        defaultValue: null,
      },
      stock: {
        type: DataTypes.INTEGER,
        field: 'stock',
        allowNull: true,
        defaultValue: 0,
      },
      brand: {
        type: DataTypes.STRING,
        field: 'brand',
        allowNull: true,
        defaultValue: null,
      },
      taxRate: {
        type: DataTypes.FLOAT,
        field: 'tax_rate',
        allowNull: true,
        defaultValue: 0,
      },
      coverImage: {
        type: DataTypes.STRING,
        field: 'cover_image',
        allowNull: true,
        defaultValue: null,
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('products')
  },
}
