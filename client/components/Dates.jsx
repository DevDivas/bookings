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
      highlightedDates: [],
    };
    this.changeMonth = this.changeMonth.bind(this);
    this.fetch = this.fetch.bind(this);
    this.findBlackoutDate = this.findBlackoutDate.bind(this);
    this.addHighlightDays = this.addHighlightDays.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { datesRerender, resetDatesRender, checkinSelected, checkin, checkout, datesSelected } = this.props;
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
    if (datesSelected !== prevProps.datesSelected) {
      this.addHighlightDays(checkin, checkout);
    }
  }

  getCurrentMonthBookings(currentMonth, allBookings, numDaysInMonth, currentYear) {
    const monthBookings = allBookings.reduce((bookingsPerMonth, booking) => {
      const bookingStartMonth = moment(booking.start_date).format('MM');
      const bookingEndMonth = moment(booking.end_date).format('MM');
      const bookingStartDay = moment(booking.start_date).format('DD');
      const bookingEndDay = moment(booking.end_date).format('DD');
      const bookingStartYear = moment(booking.start_date).format('YYYY');
      const bookingEndYear = moment(booking.end_date).format('YYYY');

      if (bookingStartMonth === currentMonth && bookingStartYear === currentYear) {
        if (bookingEndMonth === currentMonth) {
          bookingsPerMonth.push([bookingStartDay, bookingEndDay]);
        } else {
          bookingsPerMonth.push([bookingStartDay, numDaysInMonth]);
        }
      } else if (bookingEndMonth === currentMonth && bookingEndYear === currentYear) {
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
        const { currentMonth, numDaysInMonth, currentYear } = this.state;
        const roomBookings = response.data;
        const monthBookings = this.getCurrentMonthBookings(currentMonth, roomBookings, numDaysInMonth, currentYear);
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
    let newYear = '';
    if (direction === 'prev') {
      newMonth = moment(currentMonth, 'MM').subtract(1, 'month').format('MM');
      if (currentMonth === '01') {
        newYear = moment(currentYear, 'YYYY').subtract(1, 'year').format('YYYY');
      } else {
        newYear = currentYear;
      }
    } else if (direction === 'next') {
      newMonth = moment(currentMonth, 'MM').add(1, 'month').format('MM');
      if (currentMonth === '12') {
        newYear = moment(currentYear, 'YYYY').add(1, 'year').format('YYYY');
      } else {
        newYear = currentYear;
      }
    }
    const newNumDays = moment(`${currentYear}-${newMonth}`, 'YYYY-MM').daysInMonth();
    const newBookings = this.getCurrentMonthBookings(newMonth, bookings, newNumDays, newYear);
    this.setState({
      currentMonth: newMonth,
      numDaysInMonth: newNumDays,
      monthlyBookings: newBookings,
      currentYear: newYear,
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

  addHighlightDays(start, end) {
    let currentDay = moment(start).add(1, 'days').format('YYYY-MM-DD');
    const highlightedDayArr = [];
    while (moment(currentDay).isBefore(end)) {
      highlightedDayArr.push(currentDay);
      currentDay = moment(currentDay).add(1, 'days').format('YYYY-MM-DD');
    }
    this.setState({
      highlightedDates: highlightedDayArr,
    });
  }

  render() {
    const {
      monthlyBookings, currentMonth, currentYear, blackoutAfter, highlightedDates,
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
          highlightedDates={highlightedDates}
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
  datesSelected: PropTypes.bool,
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
  datesSelected: false,
};

export default Dates;
