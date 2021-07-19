'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      allowNul: false,
      type: DataTypes.INTEGER,
    },
    imageId: {
      allowNul: false,
      type: DataTypes.INTEGER,
    },
    comment: {
      allowNul: false,
      type: DataTypes.TEXT
    },
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
    Comment.belongsTo(models.Image, { foreignKey: 'imageId' })
  };
  return Comment;
};
