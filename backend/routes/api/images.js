const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Image, Comment } = require('../../db/models')

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
    where: {
      imageId: image
    },
    include: [{
      model: User,
      through: {
        attributes: []
      }
    }]
  });
  if (comments) {
    res.json(comments);
  }
}));

router.post('/:id(\\d+)/comments', validateComment, asyncHandler(async (req, res) => {
  const comment = await Comment.create( req.body );
  res.json(comment);
}));


module.exports = router;
