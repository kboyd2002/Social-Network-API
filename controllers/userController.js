const User = require('../models/user');
const Thought = require('../models/thought')

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v -password')
      .sort({ createdAt: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v -password')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json({ message: 'User updated successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User deleted successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json({ message: 'Friend added successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json({ message: 'Friend removed successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

module.exports = userController;
