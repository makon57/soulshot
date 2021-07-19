const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { db } = require('../../config');


const { Image } = require('../../db/models');
const { validateCreate } = require('../../utils/images');

router.get('', asyncHandler(async (req, res) => {
  const images = await Image.findAll({ order: [["updatedAt","DESC"]] });
  res.json(images);
}));

router.post('', validateCreate, asyncHandler(async (req, res) => {
  const image = await Image.create(req.body);
  res.json(image);
}));

router.put('/:id(\\d+)', validateCreate, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const image = await db.Image.findByPk(id);
  res.json(image);
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const image = await db.Image.findByPk(id);
  await image.destroy();
  res.redirect(`/api/images`);
}));

module.exports = router;
