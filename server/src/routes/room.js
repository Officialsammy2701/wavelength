const router = require('express').Router();
const { createRoom, getRooms, joinRoom, deleteRoom } = require('../controllers/room.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createRoom);
router.get('/', protect, getRooms);
router.post('/:roomId/join', protect, joinRoom);
router.delete('/:roomId', protect, deleteRoom);

module.exports = router;