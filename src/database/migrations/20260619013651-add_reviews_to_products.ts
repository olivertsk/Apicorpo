import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.addColumn('products', 'review_count', {
        field: 'review_count',
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      }),
      queryInterface.addColumn('products', 'average_rating', {
        field: 'average_rating',
        type: DataTypes.DECIMAL(3, 2), // ej. 4.50
        defaultValue: 0,
        allowNull: false,
      }),
    ])
  },

  async down(queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.removeColumn('products', 'review_count'),
      queryInterface.removeColumn('products', 'average_rating'),
    ])
  },
}
