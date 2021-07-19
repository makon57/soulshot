'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    title: {
      type: DataTypes.STRING(50),
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {});
  Image.associate = function(models) {
    Image.hasMany(models.Comment, { foreignKey: 'imageId' })
    Image.belongsToMany(models.Album, {
      through: 'AlbumImage',
      foreignKey: 'imageId',
      otherKey: 'albumId'
    })
  };
  return Image;
};
