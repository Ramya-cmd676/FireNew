const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as needed

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://mind-quest:Dheeraj2004@mindquest.oefn1.mongodb.net/constitution?retryWrites=true&w=majority&appName=mindquest'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');

  const users = [];

  // 15 users ending with _01
  for (let i = 1; i <= 15; i++) {
    const userNum = String(i).padStart(2, '0'); // ensures two-digit format
    users.push({
      username: `Traveller${userNum}_01`,
      password: 'samplepass', // Plain password; change or hash for production
    });
  }

  // 15 users ending with _02
  for (let i = 1; i <= 15; i++) {
    const userNum = String(i).padStart(2, '0');
    users.push({
      username: `Traveller${userNum}_02`,
      password: 'samplepass',
    });
  }

  try {
    await User.insertMany(users);
    console.log('30 Traveller users added successfully!');
  } catch (err) {
    console.error('Error inserting users:', err);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => console.error('MongoDB connection error:', err));