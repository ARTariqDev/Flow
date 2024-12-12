const mongoURI = 'mongodb+srv://ddrd7718:Y1kfswkTzR9uIRpP@cluster0.ainle.mongodb.net/flow2?retryWrites=true&w=majority';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line for CORS
const app = express();

app.use(cors()); // Enable CORS with default options

app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required!' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
