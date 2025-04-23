
import { DataTypes, type QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('survey_questions', {
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
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deletedAt',
        allowNull: true,
        defaultValue: null,
      },
      text: {
        type: DataTypes.TEXT,
        field: 'text',
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        field: 'type',
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        field: 'order',
        allowNull: true,
        defaultValue: 0,
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
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('survey_questions')
  },
}
    