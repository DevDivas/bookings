/* eslint-env browser */

import React from 'react';
import Header from './Header';
import Dates from './Dates';

const axios = require('axios');
const moment = require('moment');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomid: /\d+/g.exec(window.location.pathname)[0],
      bookings: [],
      roomDetails: {},
      currentMonth: moment().format('MM'),
      currentYear: moment().format('YYYY'),
      numDaysInMonth: moment(`${moment().format('YYYY')}-${moment().format('MM')}`, 'YYYY-MM').daysInMonth(),
      monthlyBookings: [],
    };
    this.availableRoom = this.availableRoom.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
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
        const monthBookings = this.getCurrentMonthBookings(this.state.currentMonth, roomBookings, this.state.numDaysInMonth);
        this.setState({
          bookings: roomBookings,
          monthlyBookings: monthBookings,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCurrentMonthBookings(currentMonth, allBookings, numDaysInMonth) {
    const monthBookings = allBookings.reduce((bookingsPerMonth, booking) => {
      if (booking.start_date.slice(5, 7) === currentMonth) {
        if (booking.end_date.slice(5, 7) === currentMonth) {
          bookingsPerMonth.push([booking.start_date.slice(8, 10), booking.end_date.slice(8, 10)]);
        } else {
          bookingsPerMonth.push([booking.start_date.slice(8, 10), numDaysInMonth]);
        }
      } else if (booking.end_date.slice(5, 7) === currentMonth) {
        bookingsPerMonth.push([1, booking.end_date.slice(8, 10)]);
      }
      return bookingsPerMonth;
    }, []);
    return monthBookings;
  }

  availableRoom(date) {
    console.log('clicked! ' + date);
  }

  changeMonth(direction) {
    const { currentMonth, bookings, currentYear } = this.state;
    let newMonth = '';
    if (direction === 'prev') {
      newMonth = moment(currentMonth, 'MM').subtract(1, 'month').format('MM');
    } else if (direction === 'next') {
      newMonth = moment(currentMonth, 'MM').add(1, 'month').format('MM');
    }
    const newNumDays = moment(`${currentYear}-${newMonth}`, 'YYYY-MM').daysInMonth();
    const newBookings = this.getCurrentMonthBookings(newMonth, bookings, newNumDays);
    this.setState({
      currentMonth: newMonth,
      numDaysInMonth: newNumDays,
      monthlyBookings: newBookings,
    });
  }

  render() {
    const {
      roomDetails, monthlyBookings, currentMonth, currentYear, numDaysInMonth,
    } = this.state;

    return (
      <div>
        <Header roomDetails={roomDetails} />
        <hr />
        <Dates
          monthlyBookings={monthlyBookings}
          currentMonth={currentMonth}
          currentYear={currentYear}
          numDaysInMonth={numDaysInMonth}
          availableRoom={this.availableRoom}
          changeMonth={this.changeMonth}
        />
      </div>
    );
  }
}

export default App;
