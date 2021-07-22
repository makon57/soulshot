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
  // console.log(albumList);
  // const arrayIds = await Object.values(albumList[imageId]);
  // let images = [];

  // arrayIds.forEach(id => {
  //   const image = Image.findOne(id);
  //   images.push(image);
  // });

  // console.log(images);
  res.json(albumList);
}));

router.post('/', asyncHandler(async (req, res) => {
  const user = await req.body;
  console.log(user);
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



router.put('/:id(\\d+)', validateCreate, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const albumId = Number(id);
  const album = await Album.findByPk( albumId );

  await album.update(req.body);
  res.json(album);
}));

router.delete('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const albumId = Number(id);
  const album = await Album.findByPk( albumId );
  const list = await AlbumImages.findAll( albumId );

  await list.destroy();
  await album.destroy();

  const albums = await Album.findAll({ order: [["updatedAt","DESC"]] });
  res.json(albums);
}));

module.exports = router;
