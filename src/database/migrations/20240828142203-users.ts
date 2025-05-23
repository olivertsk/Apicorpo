import { DataTypes, type QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('users', {
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
      name: {
        type: DataTypes.STRING,
        field: 'name',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        field: 'avatar',
        defaultValue: null,
        allowNull: true,
      },
      dni: {
        type: DataTypes.INTEGER,
        field: 'dni',
        defaultValue: null,
        allowNull: true,
      },
      dniType: {
        type: DataTypes.STRING,
        field: 'dni_type',
        defaultValue: null,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
        defaultValue: null,
        allowNull: true,
      },
      dob: {
        type: DataTypes.STRING,
        field: 'date_of_birthdate',
        defaultValue: null,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
        defaultValue: null,
      },
      rolId: {
        type: DataTypes.UUID,
        field: 'rol_id',
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: true,
        allowNull: true,
      },
      tokenPush: {
        type: DataTypes.STRING,
        field: 'token_push',
        defaultValue: true,
        allowNull: true,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('users')
  },
}
