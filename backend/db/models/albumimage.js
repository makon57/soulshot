'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumImage = sequelize.define('AlbumImage', {
    imageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    albumId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  AlbumImage.associate = function(models) {
    // associations can be defined here
  };
  return AlbumImage;
};
