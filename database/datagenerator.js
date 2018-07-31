const fs = require('fs');
const moment = require('moment');

const generateBookingDates = () => {
  const totalBookings = [];
  for (let i = 0; i < 100; i += 1) {
    const maxDateId = 365;
    // a guest can stay 14 days max
    const maxStayLength = 14;
    // holds all the bookings for this room
    const bookingsPerRoom = [];
    // generate the number of bookings for this room (min: 15, max: 45)
    const numBookings = 15 + Math.floor(31 * Math.random());
    // create the bookings
    for (let j = 0; j < numBookings; j += 1) {
      const currentStayLength = Math.floor(maxStayLength * Math.random());
      const currentStayStart = Math.floor(maxDateId * Math.random());
      const currentStayEnd = currentStayStart + currentStayLength;
      if (currentStayEnd <= maxDateId) {
        if (bookingsPerRoom.length === 0) {
          bookingsPerRoom.push([currentStayStart, currentStayEnd]);
        } else {
          const stop = bookingsPerRoom.length;
          for (let k = 0; k < stop; k += 1) {
            // check if the room is already occupied during this time
            if ((currentStayStart >= bookingsPerRoom[k][0]
              && currentStayStart < bookingsPerRoom[k][1])
              || (currentStayEnd > bookingsPerRoom[k][0]
              && currentStayEnd <= bookingsPerRoom[k][1])
              || (currentStayStart <= bookingsPerRoom[k][0]
              && currentStayEnd >= bookingsPerRoom[k][1])) {
              break;
            } else if (k === stop - 1) {
              // add this bookings to the current room's bookings
              bookingsPerRoom.push([currentStayStart, currentStayEnd]);
            }
          }
        }
      }
    }
    const bookingsPerRoomWithDates = bookingsPerRoom.map(booking => booking.map(date => moment([2018, 0, 1]).add(date, 'days').format('YYYY-MM-DD')));
    // add bookings for this room into the total bookings array
    totalBookings.push(bookingsPerRoomWithDates);
  }
  return totalBookings;
};

const generateBookedDatesCSV = (bookingsArray) => {
  let counter = 0;
  const csvLine = bookingsArray.map((room, roomIndex) => {
    const dateSetForRoom = room.map((dateArr) => {
      counter += 1;
      return `${counter}, ${dateArr[0]}, ${dateArr[1]}, ${roomIndex + 1}`;
    });
    return dateSetForRoom;
  });
  return csvLine.map(room => room.join('\r\n')).join('\r\n');
};

const generateRoomData = () => {
  const allRoomDetails = [];
  for (let i = 0; i < 100; i += 1) {
    // set room rate (off peak) $50-300
    const baseRate = 50 + Math.floor(250 * Math.random());
    // set peak rate ($20-50 + base rate)
    const peakRate = baseRate + (20 + Math.floor(30 * Math.random()));
    // set extra guests rate ($20-40/guest)
    const extraGuestRate = 20 + Math.floor(20 * Math.random());
    // set base guests (2-4)
    const baseGuests = 2 + Math.floor(2 * Math.random());
    // set cleaning fee
    const cleaningFee = Math.floor(100 * Math.random());
    // set service fee
    const serviceFee = Math.floor(100 * Math.random());
    // set max # of guests
    const maxGuests = Math.floor(2 + Math.floor(8 * Math.random()));
    // set stars
    const stars = Math.floor(5 * Math.random());
    const currentRoomDetails = [i + 1, baseRate, peakRate, extraGuestRate,
      cleaningFee, serviceFee, baseGuests, maxGuests, stars];
    allRoomDetails.push(currentRoomDetails);
  }
  return allRoomDetails;
};

const generateRoomDataCSV = roomDetailArray => roomDetailArray.map(room => room.join(', ')).join('\r\n');

fs.writeFile('database/fakeBookings.csv', generateBookedDatesCSV(generateBookingDates()), (err) => {
  if (err) throw err;
});

fs.writeFile('database/fakeRoomDetails.csv', generateRoomDataCSV(generateRoomData()), (err) => {
  if (err) throw err;
});
