const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lesson_students', {
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
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    visit: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'lesson_students',
    schema: 'public',
    timestamps: false
  });
};
