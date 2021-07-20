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

  if (req.session.auth.userId !== image.userId) {
    const err = new Error("unauthorized");
    err.status = 401;
    err.message = "You are not authorized to edit this image.";
    err.title = "unauthorized";
    throw err;
  } else if (image) {
    await image.update({ description: req.body.description });
    res.json(image);
  }
}));

router.post('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.session.auth.userId;
  const image = await db.Image.findByOne({ where: { id, userId }});
  await image.destroy();
  res.json();
}));

module.exports = router;
