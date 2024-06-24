const { DataTypes } = require('sequelize');
const sequelize = require('../config/database_connection');

const userDetails = sequelize.define('user_details', {
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    last_name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(16) },
    password: { type: DataTypes.STRING(60), allowNull: false },
    birthday: { type: DataTypes.STRING(200), allowNull: false  },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    last_modified: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    timestamps: false,
    hooks: {
        beforeUpdate: (user) => {
            user.last_modified = new Date();
        }
    }
});

module.exports = userDetails;
