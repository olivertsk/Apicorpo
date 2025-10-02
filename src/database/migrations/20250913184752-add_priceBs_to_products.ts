import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.addColumn('products', 'price_bs', {
        type: DataTypes.FLOAT,
        field: 'price_bs',
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('products', 'promotional_price_bs', {
        type: DataTypes.FLOAT,
        field: 'promotional_price_bs',
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('products', 'priceWith_tax_bs', {
        type: DataTypes.FLOAT,
        field: 'priceWith_tax_bs',
        allowNull: true,
        defaultValue: null,
      }),
    ])
  },

  async down(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.removeColumn('products', 'price_bs'),
      queryInterface.removeColumn('products', 'promotional_price_bs'),
      queryInterface.removeColumn('products', 'priceWith_tax_bs'),
    ])
  },
}
