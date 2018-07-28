import React from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');

const Calendar = (props) => {
  const {
    calendarOpen, month, year, bookings,
    dates, selectDate, changeMonth, checkin, checkinSelected, blackoutMonth, setBlackoutMonth,
  } = props;
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const bookingsMap = {};
  bookings.forEach((booking) => {
    for (let i = Number(booking[0]); i <= Number(booking[1]); i += 1) {
      bookingsMap[i] = true;
    }
  });


  // figure out what date to start blocking off in same month once a checkin day is selected
  const checkinDate = checkin.split('-');
  const checkinDay = checkinDate[2];
  const checkinMonth = checkinDate[1];
  let stopBookingsFromHere = '';
  if (checkinSelected && checkinMonth === month && blackoutMonth === '') {
    bookingsMap[checkinDay] = true;
    const bookedDates = Object.keys(bookingsMap).sort((a, b) => a - b);
    stopBookingsFromHere = bookedDates[bookedDates.indexOf(checkinDay) + 1];
  } else if (checkinSelected
    && Object.keys(bookingsMap).length > 0
    && blackoutMonth === ''
    && moment(month, 'MM').isAfter(moment(checkinMonth, 'MM'))) {
    // figure out what the next booking is if no dates are blocked off for the same checkin month
    setBlackoutMonth(month);
  }
  if (month === blackoutMonth) {
    const bookedDates = Object.keys(bookingsMap).sort((a, b) => a - b);
    stopBookingsFromHere = bookedDates[0];
  }


  // create jsx for each date, styling depends on whether the date is available for booking or not
  // TODO: CLEAN THIS UP
  const datesArr = dates.map((date) => {
    // if the day is not available for booking
    if ((checkinSelected && month === checkinMonth
      // blackout dates in same month that are not possible after checkin day selection
      && (date >= Number(stopBookingsFromHere) || date < Number(checkinDay)))
      // blackout all days before checkin (prev months)
      || (checkinSelected && moment(month, 'MM').isBefore(moment(checkinMonth, 'MM')))
      // we have found first booking following checkin date (if there are none in the same month)
      || (checkinSelected && blackoutMonth !== ''
      // blackout everything after this date if you are in the same month
      && ((month === blackoutMonth && date >= Number(stopBookingsFromHere))
      // black out everything after that
      || moment(month, 'MM').isAfter(moment(blackoutMonth, 'MM'))))
      // this date is booked already (regardless of whether checkin day was selected)
      || bookingsMap[date]) {
      return (
        <li className="booked">
          <button type="button">
            {date}
          </button>
        </li>
      );
    }
    // if the day is available
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
  blackoutMonth: PropTypes.string,
  setBlackoutMonth: PropTypes.func.isRequired,
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
  blackoutMonth: '',
};

export default Calendar;
