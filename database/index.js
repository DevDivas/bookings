const db = require('./config.js');

const getAllBookings = (params, callback) => {
  const queryString = 'SELECT * FROM bookedDates WHERE room_id = ?';
  db.query(queryString, params, (err, results) => {
    if (err) {
      throw err;
    } else {
      callback(null, results);
    }
  });
};

const getRoomInfo = (params, callback) => {
  const queryString = 'SELECT * FROM rooms WHERE room_id = ?';
  db.query(queryString, params, (err, results) => {
    if (err) {
      throw err;
    } else {
      callback(null, results);
    }
  });
};

const addBooking = (params, callback) => {
  const queryString = 'INSERT INTO bookings (start_date, end_date, room_id) VALUES (?, ?, ?)';
  db.query(queryString, params, (err, results) => {
    if (err) {
      throw err;
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getAllBookings,
  getRoomInfo,
  addBooking,
};
