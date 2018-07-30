import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import '../styles/Dates.css';

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
      id: roomid,
      blackoutAfter: '',
    };
    this.changeMonth = this.changeMonth.bind(this);
    this.fetch = this.fetch.bind(this);
    this.findBlackoutDate = this.findBlackoutDate.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { datesRerender, resetDatesRender, checkinSelected, checkin } = this.props;
    const { bookings } = this.state;
    if (datesRerender !== prevProps.datesRerender) {
      if (datesRerender === true) {
        this.fetch();
        resetDatesRender();
      }
    }
    if (checkinSelected !== prevProps.checkinSelected) {
      this.findBlackoutDate(checkin, bookings);
    }
  }

  getCurrentMonthBookings(currentMonth, allBookings, numDaysInMonth) {
    const monthBookings = allBookings.reduce((bookingsPerMonth, booking) => {
      const bookingStartArr = booking.start_date.split('-');
      const bookingEndArr = booking.end_date.split('-');
      const bookingStartMonth = bookingStartArr[1];
      const bookingEndMonth = bookingEndArr[1];
      const bookingStartDay = bookingStartArr[2].split('T')[0];
      const bookingEndDay = bookingEndArr[2].split('T')[0];
      if (bookingStartMonth === currentMonth) {
        if (bookingEndMonth === currentMonth) {
          bookingsPerMonth.push([bookingStartDay, bookingEndDay]);
        } else {
          bookingsPerMonth.push([bookingStartDay, numDaysInMonth]);
        }
      } else if (bookingEndMonth === currentMonth) {
        bookingsPerMonth.push([1, bookingEndDay]);
      }
      return bookingsPerMonth;
    }, []);
    return monthBookings;
  }
  
  fetch() {
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

  findBlackoutDate(checkinDate, allBookings) {
    let dateDiff = 365;
    let closestDate = '';
    allBookings.forEach((booking) => {
      if (moment(booking.start_date).isAfter(checkinDate)) {
        const currentDiff = moment(booking.start_date).diff(checkinDate, 'days');
        if (currentDiff < dateDiff) {
          dateDiff = currentDiff;
          closestDate = booking.start_date;
        }
      }
    });
    this.setState({
      blackoutAfter: closestDate,
    });
  }

  render() {
    const {
      monthlyBookings, currentMonth, currentYear, blackoutAfter,
    } = this.state;
    const {
      selectDate, checkin, checkout, checkinSelected,
      calendarOpen, openCalendar, updated,
    } = this.props;

    return (
      <div>
        <div className="datesHeader">
          <input
            type="text"
            value={checkin === 'Check In' ? 'Check In' : moment(checkin, 'YYYY-MM-DD').format('MM/DD/YYYY')}
            className="dateInput"
            id="checkin"
            onClick={openCalendar}
          />
          <img alt="" id="middleArrow" src="https://s3-us-west-1.amazonaws.com/fecimages/radatesdgray.png" />
          <input
            type="text"
            value={checkout === 'Check Out' ? 'Check Out' : moment(checkout, 'YYYY-MM-DD').format('MM/DD/YYYY')}
            className={`dateInput${checkinSelected ? ' selectCheckout' : ''}`}
            id="checkout"
            onClick={openCalendar}
          />
        </div>
        <Calendar
          calendarOpen={calendarOpen}
          month={currentMonth}
          year={currentYear}
          bookings={monthlyBookings}
          dates={this.createMonth()}
          selectDate={selectDate}
          changeMonth={this.changeMonth}
          checkin={checkin}
          checkout={checkout}
          checkinSelected={checkinSelected}
          updated={updated}
          blackoutAfter={blackoutAfter}
        />
      </div>
    );
  }
}

Dates.propTypes = {
  roomid: PropTypes.string,
  selectDate: PropTypes.func,
  checkin: PropTypes.string,
  checkout: PropTypes.string,
  checkinSelected: PropTypes.bool,
  calendarOpen: PropTypes.bool,
  openCalendar: PropTypes.func,
  datesRerender: PropTypes.bool,
  resetDatesRender: PropTypes.func,
  updated: PropTypes.string,
};

Dates.defaultProps = {
  roomid: '1',
  selectDate: () => {},
  checkin: '2018-01-01',
  checkout: '2018-01-01',
  checkinSelected: false,
  calendarOpen: false,
  openCalendar: () => {},
  datesRerender: false,
  resetDatesRender: () => {},
  updated: moment().format('YYYY-MM-DD'),
};

export default Dates;
