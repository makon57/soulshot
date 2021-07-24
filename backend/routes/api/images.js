const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Image, Comment, User } = require('../../db/models')

const { validateCreate } = require('../../utils/images');
const { validateComment } = require('../../utils/comments');

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

/*---------------------------------COMMENTS----------------------------*/

router.get('/:id(\\d+)/comments', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const image = Number(id);
  const comments = await Comment.findAll({
    include: [{
      model: User,
      attributes: ['username']
    }],
    where: {
      imageId: image
    },
  });
  if (comments) {
    res.json(comments);
  }
}));

router.post('/:id(\\d+)/comments', validateComment, asyncHandler(async (req, res) => {
  const comment = await Comment.create( req.body );
  res.json(comment);
}));

router.put('/:id(\\d+)/comments/:id(\\d+)/', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const commentId = Number(id);
  const comment = await Comment.findByPk( commentId );

  await comment.update(req.body);

  res.json(comment);
}));

router.delete('/:id(\\d+)/comments/:id(\\d+)/delete', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const commentId = Number(id);
  const comment = await Comment.findByPk( commentId );

  await comment.destroy();

  const comments = await Comment.findAll({ order: [["updatedAt","DESC"]] });
  res.json(comments);
}));

module.exports = router;
