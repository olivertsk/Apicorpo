import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('survey_users', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt',
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt',
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      surveyId: {
        type: DataTypes.UUID,
        field: 'survey_id',
        allowNull: false,
        references: {
          model: 'surveys',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: true,
        defaultValue: null,
      },
      lastname: {
        type: DataTypes.STRING,
        field: 'lastname',
        allowNull: true,
        defaultValue: null,
      },
      phoneNumber: {
        type: DataTypes.TEXT,
        field: 'phone_number',
        allowNull: true,
        defaultValue: null,
      },
      date: {
        type: DataTypes.STRING,
        field: 'date',
        allowNull: true,
        defaultValue: null,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('survey_users')
  },
}
