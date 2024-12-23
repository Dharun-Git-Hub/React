const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Users table created or already exists.');

        // Insert a user directly from the command line
       /* const args = process.argv.slice(2);
        if (args.length === 2) {
          const [username, password] = args;
          insertUser(username, password);
        } else {
          console.log('Usage: node server.cjs <username> <password>');
        }*/
      }
    });
  }
});

// Insert user data directly from command line
const insertUser = (username, password) => {
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
    if (err) {
      console.error('Error inserting user:', err.message);
    } else {
      console.log('User registered successfully');
    }
  });
};

// Handle login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else if (row) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Login failed');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
