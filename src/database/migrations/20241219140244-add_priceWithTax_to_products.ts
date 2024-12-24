
import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.addColumn('products', 'price_with_tax', {
      type: DataTypes.FLOAT,
      field: 'price_with_tax',
      allowNull: true,
      defaultValue: null,
    })
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.removeColumn('products', 'price_with_tax')
  },
};
    