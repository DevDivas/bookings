import React from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');

const Calendar = (props) => {
  const {
    calendarOpen, month, year, bookings, dates, selectDate, changeMonth,
  } = props;
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const bookingsMap = {};
  bookings.forEach((booking) => {
    for (let i = Number(booking[0]); i <= Number(booking[1]); i += 1) {
      bookingsMap[i] = true;
    }
  });
  const datesArr = dates.map((date) => {
    if (bookingsMap[date]) {
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
};

Calendar.defaultProps = {
  calendarOpen: false,
  month: '01',
  year: '2018',
  bookings: [],
  dates: [],
  selectDate: () => {},
  changeMonth: () => {},
};

export default Calendar;
