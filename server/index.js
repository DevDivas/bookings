const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();

app.use('/rooms/:id', express.static('../public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/rooms/:id/bookings', (req, res) => {
  db.getAllBookings([req.params.id], (err, bookingInfo) => {
    if (err) {
      throw err;
    } else {
      res.send(bookingInfo);
    }
  });
});

app.get('/rooms/:id/bookings/:month', (req, res) => {
  db.getAllBookings([req.params.id], (err, bookingInfo) => {
    if (err) {
      throw err;
    } else {
      const monthlyBookings = bookingInfo.reduce((month, booking) => {
        if (booking.start_date.getMonth() + 1 === Number(req.params.month)) {
          month.push(booking);
        }
        return month;
      }, []);
      res.send(monthlyBookings);
    }
  });
});

app.get('/rooms/:id/room', (req, res) => {
  db.getRoomInfo([req.params.id], (err, roomInfo) => {
    if (err) {
      throw err;
    } else {
      res.send(roomInfo);
    }
  });
});

app.post('/rooms/:id/bookings', (req, res) => {
  db.addBooking([req.body.startDate, req.body.endDate, req.params.id], (err) => {
    if (err) {
      throw err;
    } else {
      res.send('dates posted!');
    }
  });
});

app.listen(3003, () => console.log('Listening on port 3003'));
