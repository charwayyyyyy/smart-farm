const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const User = require('./User');

const KnowledgeArticle = sequelize.define('KnowledgeArticle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  authorId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  cropTypes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  regions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  documentUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: 'en'
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  vectorEmbedding: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['tags']
    },
    {
      fields: ['cropTypes']
    },
    {
      fields: ['regions']
    },
    {
      fields: ['language']
    }
  ]
});

// Set up associations
User.hasMany(KnowledgeArticle, { foreignKey: 'authorId' });
KnowledgeArticle.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

module.exports = KnowledgeArticle;