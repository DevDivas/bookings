import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Calendar.css';

const moment = require('moment');

const Calendar = (props) => {
  const {
    calendarOpen, month, year, bookings, dates, selectDate,
    changeMonth, checkin, checkinSelected, checkout, updated, blackoutAfter, highlightedDates,
  } = props;
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const bookingsMap = {};
  bookings.forEach((booking) => {
    for (let i = Number(booking[0]); i <= Number(booking[1]); i += 1) {
      bookingsMap[i] = true;
    }
  });

  const checkinDay = moment(checkin).format('DD');
  const checkinMonth = moment(checkin).format('MM');

  // create jsx for each date, styling depends on whether the date is available for booking or not
  const datesArr = dates.map((date) => {
    // if the day is not available for booking
    const currentFullDate = `${year}-${month}-${date < 10 ? `0${date}` : date}`;
    if ((checkinSelected && moment(blackoutAfter).isBefore(currentFullDate))
      || (checkinSelected && moment(checkin).isAfter(currentFullDate))
      || bookingsMap[date]) {
      // console.log(Object.keys(bookingsMap));
      return (
        <li className={`booked dates${!date ? ' blank' : ''}`}>
          {date}
        </li>
      );
    } if (!date) {
      return (
        <li className="blank dates">
          {date}
        </li>
      );
    }
    // if the day is available
    const selectedDate = (month === checkinMonth && Number(checkinDay) === date)
      || (month === moment(checkout).format('MM') && date === Number(moment(checkout).format('DD')));
    const betweenDates = (highlightedDates.indexOf(currentFullDate) > -1);
    return (
      <li
        className={`available dates${selectedDate ? ' selectedDate' : ''}${betweenDates ? ' betweenDates' : ''}`}
        onClick={() => { selectDate(`${year}-${month}-${date}`); }}
      >
        {date}
      </li>
    );
  });

  const daysAgo = (lastUpdate) => {
    const diff = moment().diff(moment(lastUpdate, 'YYYY-MM-DD'), 'days');
    return diff ? ` ${diff} days ago` : ' today';
  };

  if (calendarOpen) {
    return (
      <div className="calendarContainer">
        <div className="innerCalContainer">
          <div className="header">
            <span>
              <img alt="" />
              <button type="button" id="calendarLeftArr" onClick={() => { changeMonth('prev'); }} />
            </span>
            <span className="monthLabel">
              {`${moment(month).format('MMMM')} ${year}`}
            </span>
            <span>
              <img alt="" />
              <button type="button" id="calendarRightArr" onClick={() => { changeMonth('next'); }} />
            </span>
          </div>
          <div className="calendar">
            <ul>
              {daysOfWeek.map(day => (
                <li key={day} className="weekdays">
                  {day}
                </li>))}
            </ul>
            <ul>
              {datesArr}
            </ul>
          </div>
          <div className="calendarFooter">
            <p>
              <b>
                {'1 night '}
              </b>
              minimum stay
            </p>
            <p>
              Updated
              {daysAgo(updated)}
            </p>
          </div>
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
  checkout: PropTypes.string,
  checkinSelected: PropTypes.bool,
  updated: PropTypes.string.isRequired,
  blackoutAfter: PropTypes.string,
  highlightedDates: PropTypes.arrayOf(PropTypes.string),
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
  checkout: '2018-01-01',
  checkinSelected: false,
  //updated: '2018-07-23',
  blackoutAfter: '2018-01-01',
  highlightedDates: [],
};

export default Calendar;
