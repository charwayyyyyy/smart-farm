const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const User = require('./User');
const Crop = require('./Crop');

const FarmerSubscription = sequelize.define('FarmerSubscription', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  cropId: {
    type: DataTypes.UUID,
    references: {
      model: Crop,
      key: 'id'
    },
    allowNull: false
  },
  plantingDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fieldSize: {
    type: DataTypes.FLOAT, // in acres or hectares
    allowNull: true
  },
  sizeUnit: {
    type: DataTypes.ENUM('acres', 'hectares'),
    defaultValue: 'acres'
  },
  notificationPreference: {
    type: DataTypes.ENUM('sms', 'email', 'both'),
    defaultValue: 'sms'
  },
  reminderFrequency: {
    type: DataTypes.ENUM('daily', 'weekly', 'critical_only'),
    defaultValue: 'critical_only'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lastNotificationSent: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'cropId', 'plantingDate']
    }
  ]
});

// Set up associations
User.hasMany(FarmerSubscription, { foreignKey: 'userId' });
FarmerSubscription.belongsTo(User, { foreignKey: 'userId' });

Crop.hasMany(FarmerSubscription, { foreignKey: 'cropId' });
FarmerSubscription.belongsTo(Crop, { foreignKey: 'cropId' });

module.exports = FarmerSubscription;