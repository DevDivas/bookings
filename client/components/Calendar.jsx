import React from 'react';

const moment = require('moment');

const Calendar = (props) => {
  const {
    calendarOpen, month, year, bookings, dates,
  } = props;
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  if (calendarOpen) {
    return (
      <div>
        <div>
          <span>
            <img alt="" />
          </span>
          <span>
            {`${moment(month).format('MMMM')} ${year}`}
          </span>
          <span>
            <img alt="" />
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
            {dates.map(day => (
              <li>
                {day}
              </li>))}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

export default Calendar;
