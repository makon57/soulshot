const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Image, Album, AlbumImage } = require('../../db/models')

const { validateCreate } = require('../../utils/images');


router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const albumList = await Album.findByPk(id, {
    include: [{
      model: Image,
      through: {
        attributes: []
      }
    }]
  });
  console.log(albumList);
  res.json(albumList);
}));

router.post('/', asyncHandler(async (req, res) => {
  const user = await req.body;
  const albums = await Album.findAll({ where: { userId: user.id } });
  res.json(albums);
}));

router.post('/create', asyncHandler(async (req, res) => {
  const album = await Album.create(req.body);
  res.json(album);
}));

router.post('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { imageId, albumId } = req.body;

  let albumItem = await AlbumImage.findOne({where: {imageId, albumId}});
  if (albumItem) {
    ;
  } else {
    albumItem = await AlbumImage.create({imageId, albumId});
  }

  const aId = albumItem.albumId;
  const album = await Album.findByPk(aId);
  res.json(album);
}));

// edit/delete album item
router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { imageId, albumId } = req.body;

  await AlbumImage.destroy({where: {imageId, albumId}});

  res.json(albumId);
}));

router.delete('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const albumId = Number(id);
  const album = await Album.findByPk( albumId );

  await AlbumImage.destroy({
    where: {
      albumId: id
    }
  });

  await album.destroy();

  const albums = await Album.findAll({ order: [["updatedAt","DESC"]] });
  res.json(albums);
}));

module.exports = router;
