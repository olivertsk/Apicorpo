import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('survey_answer_options', {
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
      questionId: {
        type: DataTypes.UUID,
        field: 'question_id',
        allowNull: false,
        references: {
          model: 'survey_questions',
          key: 'id',
        },
      },
      text: {
        type: DataTypes.STRING,
        field: 'text',
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        field: 'type',
        allowNull: true,
        defaultValue: 'selection',
      },
      order: {
        type: DataTypes.INTEGER,
        field: 'order',
        allowNull: true,
        defaultValue: 0,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('survey_answer_options')
  },
}
