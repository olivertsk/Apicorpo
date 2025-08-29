import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('chat_answers', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
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
      chatQuestionId: {
        field: 'chat_question_id',
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'chat_questions',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        allowNull: true,
        defaultValue: true,
      },
      type: {
        type: DataTypes.STRING,
        field: 'type',
        defaultValue: null,
        allowNull: true,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('chat_answers')
  },
}
