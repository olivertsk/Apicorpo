import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('payment_methods', {
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
      type: {
        type: DataTypes.STRING,
        field: 'type',
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
      },
      dni: {
        type: DataTypes.STRING,
        field: 'dni',
        defaultValue: null,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        defaultValue: null,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
        defaultValue: null,
        allowNull: true,
      },
      numberAccount: {
        type: DataTypes.STRING,
        field: 'number_account',
        defaultValue: null,
        allowNull: true,
      },
      accountType: {
        type: DataTypes.STRING,
        field: 'account_type',
        defaultValue: null,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: true,
        allowNull: true,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('payment_methods')
  },
}
