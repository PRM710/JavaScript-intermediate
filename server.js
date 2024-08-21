const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());


// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your actual password
    database: 'intermediate' // Replace with your actual database name
});

// Middleware
app.use(express.json()); // Use built-in middleware to parse JSON

// Define the login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
