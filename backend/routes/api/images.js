const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Image } = require('../../db/models')

const { validateCreate } = require('../../utils/images');

router.get('/', asyncHandler(async (req, res) => {
  const images = await Image.findAll({ order: [["updatedAt","DESC"]] });
  res.json(images);
}));

router.post('/', validateCreate, asyncHandler(async (req, res) => {
  const image = await Image.create(req.body);
  res.json(image);
}));

router.put('/:id(\\d+)', validateCreate, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const imageId = Number(id);
  const image = await Image.findByPk( imageId );

  await image.update(req.body);
  res.json(image);
}));

router.delete('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const imageId = Number(id);
  const image = await Image.findByPk( imageId );

  await image.destroy();

  const images = await Image.findAll({ order: [["updatedAt","DESC"]] });
  res.json(images);
}));

module.exports = router;
