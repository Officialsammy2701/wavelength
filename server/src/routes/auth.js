const router = require('express').Router();
const { spotifyLogin, spotifyCallback, refreshToken, logout } = require('../controllers/auth.controller');

router.get('/login', spotifyLogin);
router.get('/callback', spotifyCallback);
router.get('/refresh', refreshToken);
router.get('/logout', logout);

module.exports = router;