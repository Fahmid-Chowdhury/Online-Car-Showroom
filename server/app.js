const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import the 'cors' middleware

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the 'cors' middleware to enable CORS for all routes
app.use(cors());

//MYSQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cars',
});

app.get('/api/cars', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(req.body);
    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM CAR', (err, rows) => {
      connection.release();

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

//Listening to the port
app.listen(port, () => console.log(`Listening on port ${port}`));
