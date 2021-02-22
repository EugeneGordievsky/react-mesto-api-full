const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getUsersMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/users/me', getUsersMe);
router.get('/:_id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
