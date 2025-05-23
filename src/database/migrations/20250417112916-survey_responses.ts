import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('survey_responses', {
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
      questionId: {
        type: DataTypes.UUID,
        field: 'question_id',
        allowNull: false,
        references: {
          model: 'survey_questions',
          key: 'id',
        },
      },
      answerOptionId: {
        type: DataTypes.UUID,
        field: 'answer_option_id',
        allowNull: true,
        references: {
          model: 'survey_answer_options',
          key: 'id',
        },
      },
      text: {
        type: DataTypes.TEXT,
        field: 'text',
        allowNull: true,
      },
      surveyUserId: {
        type: DataTypes.UUID,
        field: 'survey_user_id',
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'survey_users',
          key: 'id',
        },
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('survey_responses')
  },
}
