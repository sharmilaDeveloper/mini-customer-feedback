const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Feedback = sequelize.define("Feedback", {
  customerName: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  feedbackText: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  timeStamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Feedback;
