const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Crop = sequelize.define('Crop', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scientificName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  growingPeriod: {
    type: DataTypes.INTEGER, // in days
    allowNull: false
  },
  wateringFrequency: {
    type: DataTypes.INTEGER, // in days
    allowNull: false
  },
  fertilizingSchedule: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  pestControlSchedule: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  harvestingIndicators: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  climateZones: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  plantingSeasons: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Crop;