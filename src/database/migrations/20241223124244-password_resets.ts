import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('password_resets', {
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
      code: {
        type: DataTypes.STRING,
        field: 'code',
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('password_resets')
  },
}
