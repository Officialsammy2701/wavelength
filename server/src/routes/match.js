const router = require('express').Router();
const { getMatches, getCompatibility } = require('../controllers/match.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getMatches);
router.get('/:userId', protect, getCompatibility);

module.exports = router;