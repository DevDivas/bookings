const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: '1234',
  database: 'bookings',
});

// connection.connect();

module.exports = connection;
