/* eslint-env browser */

import React from 'react';
import Header from './Header';
import Dates from './Dates';

const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomid: /\d+/g.exec(window.location.pathname)[0],
      bookings: [],
      roomDetails: {},
    };
  }

  componentDidMount() {
    const { roomid } = this.state;
    axios.get(`/rooms/${roomid}/room`)
      .then((response) => {
        const roomDetails = response.data;
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
        this.setState({
          bookings: roomBookings,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    const { roomDetails, bookings } = this.state;
    return (
      <div>
        <Header roomDetails={roomDetails} />
        <hr />
        <Dates bookings={bookings} />
      </div>
    );
  }
}

export default App;
