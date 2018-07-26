import React from 'react';
import Calendar from './Calendar';

const moment = require('moment');

class Dates extends React.Component {
  constructor(props) {
    super(props);
    const { bookings } = this.props;
    this.state = {
      currentMonth: moment().format('MM'),
      currentYear: moment().format('YYYY'),
      calendarOpen: false, // might need to move this to App because clicking a date affects this AND checkinDate on App
      numDaysInMonth: moment(`${this.state.currentYear}-${this.state.currentMonth}`, 'YYYY-MM').daysInMonth(),
      allBookings: bookings,
      monthlyBookings: [],
    };
    // this.createMonth = this.createMonth.bind(this);
  }

  componentDidMount() {
    // set monthlyBookings
    const { currentMonth, allBookings } = this.state;
    this.getCurrentMonthBookings(currentMonth, allBookings);
  }

  getCurrentMonthBookings(currentMonth, allBookings) {
    const monthBookings = allBookings.reduce((bookingsPerMonth, booking) => {
      if (booking.start_date.slice(5, 7) === currentMonth) {
        bookingsPerMonth.push(booking);
      } else if (booking.end_date.slice(5, 7) === currentMonth) {
        bookingsPerMonth.push(booking);
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

  render() {
    const {
      currentMonth, calendarOpen, currentYear, monthlyBookings,
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
          bookings={monthlyBookings}
          dates={this.createMonth()}
        />
      </div>
    );
  }
}

export default Dates;
