const router = require('express').Router();
const { getProfile, getSoundIdentity, getResonanceReport } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/profile', protect, getProfile);
router.get('/sound-identity', protect, getSoundIdentity);
router.get('/resonance-report', protect, getResonanceReport);

module.exports = router;