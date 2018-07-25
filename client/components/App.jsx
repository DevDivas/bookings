/* eslint-env browser */

import React from 'react';
import Header from './Header';

const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomid: /\d+/g.exec(window.location.pathname)[0],
      month: '05',
      bookings: [],
      bookingsThisMonth: [],
      roomDetails: {},
    };
  }

  componentDidMount() {
    const { roomid, month } = this.state;
    axios.get(`/rooms/${roomid}/room`)
      .then((response) => {
        const roomDetails = response.data[0];
        this.setState({
          roomDetails: {
            roomRateBase: roomDetails.room_rate_base,
            roomRatepeak: roomDetails.room_rate_peak,
            cleaningFee: roomDetails.cleaning_fee,
            serviceFee: roomDetails.service_fee,
            maxGuests: roomDetails.max_guests,
            stars: roomDetails.stars,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(`/rooms/${roomid}/bookings`)
      .then((response) => {
        const roomBookings = response.data;
        const monthlyBookings = roomBookings.reduce((bookingsPerMonth, booking) => {
          if (booking.start_date.slice(5, 7) === month) {
            bookingsPerMonth.push(booking);
          } else if (booking.end_date.slice(5, 7) === month) {
            bookingsPerMonth.push(booking);
          }
          return bookingsPerMonth;
        }, []);
        this.setState({
          bookings: roomBookings,
          bookingsThisMonth: monthlyBookings,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    const { roomDetails, stars } = this.state;
    return (
      <div>
        <Header roomDetails={roomDetails} stars={stars} />
        <hr />
      </div>
    );
  }
}

export default App;
