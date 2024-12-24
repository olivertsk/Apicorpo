import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('orders', {
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
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        defaultValue: null,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      dni: {
        type: DataTypes.STRING,
        field: 'dni',
      },
      nameClient: {
        type: DataTypes.STRING,
        field: 'name_client',
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
        defaultValue: null,
        allowNull: true,
      },
      observation: {
        type: DataTypes.STRING,
        field: 'observation',
        defaultValue: null,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        field: 'date',
        defaultValue: null,
        allowNull: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        field: 'amount',
      },
      amountWithoutTax: {
        type: DataTypes.FLOAT,
        field: 'amount_without_tax',
      },
      valueTax: {
        type: DataTypes.FLOAT,
        field: 'value_tax',
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('orders')
  },
}
