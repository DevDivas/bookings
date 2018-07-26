import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

const axios = require('axios');
const moment = require('moment');

class Dates extends React.Component {
  constructor(props) {
    super(props);
    const { roomid } = this.props;
    this.state = {
      currentMonth: moment().format('MM'),
      currentYear: moment().format('YYYY'),
      numDaysInMonth: moment(`${moment().format('YYYY')}-${moment().format('MM')}`, 'YYYY-MM').daysInMonth(),
      monthlyBookings: [],
      bookings: [],
      calendarOpen: true,
      id: roomid,
    };
    this.changeMonth = this.changeMonth.bind(this);
  }

  componentDidMount() {
    const { id } = this.state;
    axios.get(`/rooms/${id}/bookings`)
      .then((response) => {
        const { currentMonth, numDaysInMonth } = this.state;
        const roomBookings = response.data;
        const monthBookings = this.getCurrentMonthBookings(currentMonth, roomBookings, numDaysInMonth);
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
      monthlyBookings, currentMonth, currentYear, calendarOpen,
    } = this.state;
    const { selectDate } = this.props;
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
          selectDate={selectDate}
          changeMonth={this.changeMonth}
        />
      </div>
    );
  }
}

Dates.propTypes = {
  roomid: PropTypes.string,
  selectDate: PropTypes.func,
};

Dates.defaultProps = {
  roomid: '1',
  selectDate: () => {},
};

export default Dates;
