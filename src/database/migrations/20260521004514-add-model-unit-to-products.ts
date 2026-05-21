import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // Agregamos 'model' (Ej: "225GR")
    await queryInterface.addColumn('products', 'model', {
      type: DataTypes.STRING,
      field: 'model',
      allowNull: true,
      defaultValue: null,
    })

    // Agregamos 'unit' (Ej: "12UND")
    await queryInterface.addColumn('products', 'unit', {
      type: DataTypes.STRING,
      field: 'unit',
      allowNull: true,
      defaultValue: null,
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('products', 'model')
    await queryInterface.removeColumn('products', 'unit')
  },
}
