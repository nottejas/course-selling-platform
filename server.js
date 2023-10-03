// server.js
import express from 'express';
import { json } from 'body-parser';
const app = express();
const port = 3000;

app.use(json());

const users = []; // Simple in-memory data storage (in a real app, use a database)

// Signup route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  
  // Check if the user already exists
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { email, password };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
