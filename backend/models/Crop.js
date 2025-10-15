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
    allowNull: true
  },
  pestControlSchedule: {
    type: DataTypes.JSON,
    allowNull: true
  },
  harvestingIndicators: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  climateZones: {
    type: DataTypes.JSON,
    allowNull: true
  },
  plantingSeasons: {
    type: DataTypes.JSON,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Crop;