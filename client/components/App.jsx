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
      roomDetails: {},
      checkin: 'Check In',
      checkout: 'Check Out',
      checkinSelected: false,
      calendarOpen: false,

    };
    this.selectDate = this.selectDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
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
  }

  selectDate(date) {
    let newDate = date;
    if (Number(date.slice(8)) < 10) {
      newDate = `${date.slice(0, 8)}0${date.slice(8)}`;
    }
    const { checkinSelected } = this.state;
    if (checkinSelected) {
      console.log('BLAH BALH');
      console.log('checkinstate' + checkinSelected);
      this.setState({
        checkout: newDate,
        checkinSelected: false,
        calendarOpen: false,
      });
    } else {
      console.log('test')
      console.log('checkinstate' + checkinSelected);
      this.setState({
        checkin: newDate,
        checkinSelected: true,
      });
    }
  }

  openCalendar() {
    const { calendarOpen } = this.state;
    this.setState({
      calendarOpen: !calendarOpen,
    });
  }


  render() {
    const {
      roomDetails, roomid, checkin, checkout, checkinSelected, calendarOpen,
    } = this.state;
    return (
      <div>
        <Header roomDetails={roomDetails} />
        <hr />
        <Dates
          roomid={roomid}
          selectDate={this.selectDate}
          checkin={checkin}
          checkout={checkout}
          checkinSelected={checkinSelected}
          calendarOpen={calendarOpen}
          openCalendar={this.openCalendar}
        />
      </div>
    );
  }
}

export default App;
