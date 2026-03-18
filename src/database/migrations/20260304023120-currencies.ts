import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('currencies', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Ej: "Dólar BCV", "Euro"
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
      code: {
        type: DataTypes.STRING(10),
        allowNull: false, // Ej: "USD", "EUR", "CNY"
      },
      symbol: {
        type: DataTypes.STRING(5),
        allowNull: true, // Ej: "$", "€"
      },
      exchangeRate: {
        type: DataTypes.DECIMAL(18, 4), // Para precisión en tasas de cambio
        allowNull: false,
        defaultValue: 0,
      },
      autoUpdate: {
        type: DataTypes.BOOLEAN,
        field: 'auto_update',
        defaultValue: true,
        allowNull: false,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('currencies')
  },
}
