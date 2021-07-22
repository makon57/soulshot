const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Album } = require('../../db/models')

const { validateCreate } = require('../../utils/images');


router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const list = await AlbumImages.findAll();
  res.json(list);
}));

router.post('/', asyncHandler(async (req, res) => {
  const user = await req.body;
  console.log(user);
  // const userE = user.email;
  const albums = await Album.findAll({ where: { userId: user.id } });
  res.json(albums);
}));

router.post('/create', asyncHandler(async (req, res) => {
  const album = await Album.create(req.body);
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
