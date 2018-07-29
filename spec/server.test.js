const request = require('supertest');
const app = require('../server/index.js');
const db = require('../database/index.js');

describe('Root path', () => {
  test('It should have proper status code for a GET request', (done) => {
    request(app).get('/rooms/25').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('Test the bookings path', () => {
  test('It should have proper status code for a GET request', (done) => {
    request(app).get('/rooms/25/bookings').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('It should send back proper data type', (done) => {
    request(app).get('/rooms/25/bookings').then((response) => {
      expect(Array.isArray(response.body)).toBe(true);
      done();
    });
  });
  test('It should send back the right data', (done) => {
    // db.getAllBookings(['25'], (err, bookings) => {
    //   if (err) {
    //     console.log('testing api error: ' + err);
    //   } else {
    //     request(app).get('/rooms/25/bookings').then((response) => {
    //       expect(JSON.stringify(response.body[0])).toEqual(JSON.stringify(bookings[0]));
    //       done();
    //     });
    //   }
    // });
  });
  test('It should have proper status code for a POST request', (done) => {
    request(app)
      .post('/rooms/25/bookings')
      .send({
        startDate: '2018-07-28',
        endDate: '2018-07-29'
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('dates posted!');
        done();
      });
  });
});

// describe('Test the bookings/month path', () => {
//   test('It should have proper status code for a GET request', (done) => {
//     request(app).get('/rooms/25/bookings/07').then((response) => {
//       expect(response.statusCode).toBe(200);
//       done();
//     });
//   });
// });

describe('Test the room path', () => {
  test('It should have proper status code for a GET request', (done) => {
    request(app).get('/rooms/25/room').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('It should send back proper data type', (done) => {
    request(app).get('/rooms/25/room').then((response) => {
      expect(typeof response.body).toBe('object');
      done();
    });
  });
  // test('It should send back the right data', (done) => {
  //   db.getRoomInfo(['25'], (err, roomInfo) => {
  //     if (err) {
  //       console.log('testing api error: ' + err);
  //     } else {
  //       request(app).get('/rooms/25/room').then((response) => {
  //         expect(response.body).toEqual(roomInfo);
  //         done();
  //       });
  //     }
  //   });
  // });
});
