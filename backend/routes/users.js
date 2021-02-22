const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getProfile);
router.get('/:_id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
