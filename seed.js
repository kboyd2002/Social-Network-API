const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const User = require('./models/user');
const Thought = require('./models/thought');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate random user data
const generateUser = () => {
  const user = {
    username: generateRandomString(),
    email: generateRandomEmail(),
    password: generateRandomString()
  };

  return user;
};

// Generate random thought data
const generateThought = (userId) => {
  const thought = {
    thoughtText: generateRandomSentence(),
    username: generateRandomString(),
    userId: userId
  };

  return thought;
};

// Helper function to generate a random string
const generateRandomString = () => {
  return Math.random().toString(36).substring(7);
};

// Helper function to generate a random email
const generateRandomEmail = () => {
  return `${generateRandomString()}@example.com`;
};

// Helper function to generate a random sentence
const generateRandomSentence = () => {
  const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
  const randomWords = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
  }
  return randomWords.join(' ');
};

// Seed data
const seedData = async () => {
  try {
    // Seed users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const user = generateUser();
      const createdUser = await User.create(user);
      users.push(createdUser);
    }

    // Seed thoughts
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const thought = generateThought(randomUser._id);
      await Thought.create(thought);
    }

    console.log('Seed data successfully added!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
