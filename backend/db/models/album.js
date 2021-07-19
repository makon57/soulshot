'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, { foreignKey: 'userId'})
    Album.belongsToMany(models.Image, {
      through: 'AlbumImage',
      foreignKey: 'albumId',
      otherKey: 'imageId'
    })
  };
  return Album;
};
