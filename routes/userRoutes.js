const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../controllers/userController');

router.get('/users', getAllUsers);

router.get('/users/:id', getSingleUser);

router.post('/users', createUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

router.post('/users/:userId/friends/:friendId', addFriend);

router.delete('/users/:userId/friends/:friendId', removeFriend);

module.exports = router;
