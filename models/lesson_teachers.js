const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lesson_teachers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'lessons',
        key: 'id'
      }
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teachers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'lesson_teachers',
    schema: 'public',
    timestamps: false
  });
};
