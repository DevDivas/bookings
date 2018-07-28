/* eslint-env browser */

import React from 'react';
import Header from './Header';
import Dates from './Dates';
import Pricing from './Pricing';
import Guests from './Guests';

const axios = require('axios');
const moment = require('moment');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomid: /\d+/g.exec(window.location.pathname)[0],
      roomDetails: {},
      checkin: 'Check In',
      checkout: 'Check Out',
      checkinSelected: false,
      datesSelected: false,
      calendarOpen: false,
      numGuests: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      toggleGuests: false,
      datesRerender: false,
    };
    this.selectDate = this.selectDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.changeGuestNum = this.changeGuestNum.bind(this);
    this.toggleGuestMenu = this.toggleGuestMenu.bind(this);
    this.resetDatesRender = this.resetDatesRender.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
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
    if (date.slice(8).length === 1) {
      newDate = `${date.slice(0, 8)}0${date.slice(8)}`;
    }
    const { checkinSelected } = this.state;
    if (checkinSelected) {
      this.setState({
        checkout: newDate,
        checkinSelected: false,
        calendarOpen: false,
        datesSelected: true,
      });
    } else {
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

  changeGuestNum(guestType, direction) {
    const guest = guestType.toLowerCase();
    const { numGuests } = this.state;
    if (direction === '-') {
      numGuests[guest] -= 1;
    } else if (direction === '+') {
      numGuests[guest] += 1;
    }
    this.setState({
      numGuests,
    });
  }

  toggleGuestMenu() {
    const { toggleGuests } = this.state;
    this.setState({
      toggleGuests: !toggleGuests,
    });
  }

  resetDatesRender() {
    const { datesRerender } = this.state;
    this.setState({
      datesRerender: !datesRerender,
    });
  }

  handleBookClick() {
    const { checkin, checkout, datesSelected, roomid } = this.state;
    if (datesSelected) {
      axios.post(`/rooms/${roomid}/bookings`, {
        startDate: checkin,
        endDate: checkout,
      }).then((response) => {
        console.log(response);
        alert('Thank you! Your Cloudbnb stay has been booked!');
        this.setState({
          datesRerender: true,
          checkin: 'Check In',
          checkout: 'Check Out',
          checkinSelected: false,
          datesSelected: false,
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert('Please select dates first!');
    }
  }

  render() {
    const {
      roomDetails,
      roomid,
      checkin,
      checkout,
      checkinSelected,
      calendarOpen,
      datesSelected,
      numGuests,
      toggleGuests,
      datesRerender,
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
          datesRerender={datesRerender}
          resetDatesRender={this.resetDatesRender}
        />
        <Guests
          numGuests={numGuests}
          toggleGuests={toggleGuests}
          maxGuests={roomDetails.maxGuests}
          changeGuestNum={this.changeGuestNum}
          toggleGuestMenu={this.toggleGuestMenu}
        />
        {datesSelected
          && (
            <Pricing
              roomDetails={roomDetails}
              stayLength={moment(checkout, 'YYYY-MM-DD').diff(moment(checkin, 'YYYY-MM-DD'), 'days')}
            />
          )
        }
        <button type="button" onClick={this.handleBookClick}>
          Request to Book
        </button>
        <div>
          You won’t be charged yet
        </div>
      </div>
    );
  }
}

export default App;
