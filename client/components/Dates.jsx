import React from 'react';
import Calendar from './Calendar';

const moment = require('moment');

class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: moment().format('MM'),
      currentYear: moment().format('YYYY'),
      calendarOpen: true, // might need to move this to App because clicking a date affects this AND checkinDate on App
      numDaysInMonth: moment(`${moment().format('YYYY')}-${moment().format('MM')}`, 'YYYY-MM').daysInMonth(),
      allBookings: this.props.bookings,
      monthlyBookings: [],
    };
    // this.createMonth = this.createMonth.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  componentDidMount() {
    // set monthlyBookings
    const { currentMonth, allBookings, numDaysInMonth } = this.state;
    console.log(allBookings);
    this.getCurrentMonthBookings(currentMonth, allBookings, numDaysInMonth);
    console.log('blah blah');
  }

  getCurrentMonthBookings(currentMonth, allBookings, numDaysInMonth) {
    console.log(allBookings);
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
    this.setState({
      monthlyBookings: monthBookings,
    });
  }

  createMonth() {
    const { currentYear, currentMonth, numDaysInMonth } = this.state;
    const dayOfWeek = moment(`${currentYear}-${currentMonth}-01`).day();
    return Array(numDaysInMonth + dayOfWeek).fill(null).map((day, index) => {
      if (index < dayOfWeek) {
        return null;
      }
      return index - dayOfWeek + 1;
    });
  }

  selectDate(date) {
    console.log('clicked' + date);
  }



  render() {
    const {
      currentMonth, calendarOpen, currentYear, allBookings, numDaysInMonth,
    } = this.state;

    return (
      <div>
        <div>
          <input type="text" value="Check In" />
          <img alt="" />
          <input type="text" value="Check Out" />
        </div>
        <Calendar
          calendarOpen={calendarOpen}
          month={currentMonth}
          year={currentYear}
          bookings={this.getCurrentMonthBookings(currentMonth, allBookings, numDaysInMonth)}
          dates={this.createMonth()}
          selectDate={this.selectDate}
        />
      </div>
    );
  }
}

export default Dates;
