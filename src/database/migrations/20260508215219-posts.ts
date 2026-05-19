import { DataTypes, type QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('posts', {
      id: { type: DataTypes.UUID, primaryKey: true },
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
      title: { type: DataTypes.STRING, allowNull: false },
      // SEO: URL amigable basada en el título
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      excerpt: { type: DataTypes.STRING, allowNull: true }, // Para metas y listados
      coverImage: { type: DataTypes.STRING, field: 'cover_image' },
      type: {
        type: DataTypes.ENUM('article', 'recipe'),
        defaultValue: 'article',
      },
      // SEO Técnico
      metaTitle: { type: DataTypes.STRING, field: 'meta_title' },
      metaDescription: { type: DataTypes.STRING, field: 'meta_description' },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
      authorId: {
        type: DataTypes.UUID,
        field: 'author_id',
        references: { model: 'users', key: 'id' },
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('posts')
  },
}
