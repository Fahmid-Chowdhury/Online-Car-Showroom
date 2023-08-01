const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3001; // You can choose any available port

// Create a connection to your XAMPP MySQL database
const dbConnection = mysql.createConnection({
  host: 'localhost', // Change this to your database host if needed
  user: 'root', // Change this to your database username if needed
  password: '', // Change this to your database password if needed
  database: 'your_database_name', // Change this to your database name
});

// Connect to the database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Define an API endpoint to retrieve data from the database
app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM your_table_name'; // Change this to your table name
  dbConnection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
