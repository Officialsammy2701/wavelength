const router = require('express').Router();
const { spotifyLogin, spotifyCallback, refreshToken } = require('../controllers/auth.controller');

router.get('/login', spotifyLogin);
router.get('/callback', spotifyCallback);
router.get('/refresh', refreshToken);

module.exports = router;