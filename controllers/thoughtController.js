const Thought = require('../models/thought');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ createdAt: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json({ message: 'Thought created successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json({ message: 'Thought updated successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.id },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this thought!' });
        }
        res.json({ message: 'Thought deleted successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json({ message: 'Reaction created successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json({ message: 'Reaction deleted successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

module.exports = thoughtController;
