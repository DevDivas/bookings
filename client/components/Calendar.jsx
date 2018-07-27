import React from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');

const Calendar = (props) => {
  const {
    calendarOpen, month, year, bookings, dates, selectDate, changeMonth, checkin, checkinSelected,
  } = props;
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const bookingsMap = {};
  console.log(bookings);
  bookings.forEach((booking) => {
    for (let i = Number(booking[0]); i <= Number(booking[1]); i += 1) {
      bookingsMap[i] = true;
    }
  });
  let stopBookingsFromHere = '';
  const checkinDate = checkin.split('-');
  const checkinDay = checkinDate[2];
  const checkinMonth = checkinDate[1];
  if (checkinSelected && checkinMonth === month) {
    bookingsMap[checkinDay] = true;
    const bookedDates = Object.keys(bookingsMap).sort((a, b) => a - b);
    stopBookingsFromHere = bookedDates[bookedDates.indexOf(checkinDay) + 1];
  }
  const datesArr = dates.map((date) => {
    if ((checkinSelected && month === checkinMonth && (date >= Number(stopBookingsFromHere) || date < Number(checkinDay)))
      // || (checkinSelected && checkinMonth === moment(month, 'MM').subtract(1, 'month').format('MM'))
      || bookingsMap[date]) {
      console.log('here');
      return (
        <li className="booked">
          {date}
        </li>
      );
    }
    return (
      <li className="available">
        <button type="button" onClick={() => { selectDate(`${year}-${month}-${date}`); }}>
          {date}
        </button>
      </li>
    );
  });
  if (calendarOpen) {
    return (
      <div>
        <div>
          <span>
            <img alt="" />
            <button type="button" onClick={() => { changeMonth('prev'); }}>
              Left
            </button>
          </span>
          <span>
            {`${moment(month).format('MMMM')} ${year}`}
          </span>
          <span>
            <img alt="" />
            <button type="button" onClick={() => { changeMonth('next'); }}>
              Right
            </button>
          </span>
        </div>
        <div>
          <ul>
            {daysOfWeek.map(day => (
              <li key={day}>
                {day}
              </li>))}
          </ul>
          <ul>
            {datesArr}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

Calendar.propTypes = {
  calendarOpen: PropTypes.bool,
  month: PropTypes.string,
  year: PropTypes.string,
  bookings: PropTypes.arrayOf(PropTypes.array),
  dates: PropTypes.arrayOf(PropTypes.number),
  selectDate: PropTypes.func,
  changeMonth: PropTypes.func,
  checkin: PropTypes.string,
  checkinSelected: PropTypes.bool,
};

Calendar.defaultProps = {
  calendarOpen: false,
  month: '01',
  year: '2018',
  bookings: [],
  dates: [],
  selectDate: () => {},
  changeMonth: () => {},
  checkin: '2018-01-01',
  checkinSelected: false,
};

export default Calendar;
