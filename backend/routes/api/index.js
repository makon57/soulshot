const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');


router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

router.get('/set-token-cookie', asyncHandler(async(req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    },
  })
  setTokenCookie(res, user);
  return res.json({ user });
}));

module.exports = router;
