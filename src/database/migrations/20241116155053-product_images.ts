import { DataTypes, type QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('product_images', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: () => uuidv4(),
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
      file: {
        type: DataTypes.STRING,
        field: 'file',
        allowNull: false,
      },
      alt: {
        type: DataTypes.STRING,
        field: 'alt',
        allowNull: true,
        defaultValue: null,
      },
      position: {
        type: DataTypes.INTEGER,
        field: 'position',
        allowNull: true,
        defaultValue: 0,
      },
      isVideo: {
        type: DataTypes.BOOLEAN,
        field: 'is_video',
        allowNull: true,
        defaultValue: false,
      },
      productId: {
        type: DataTypes.UUID,
        field: 'product_id',
        allowNull: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('product_images');
  },
};
