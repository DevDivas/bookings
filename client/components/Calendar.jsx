import React from 'react';

const moment = require('moment');

const Calendar = (props) => {
  const {
    calendarOpen, month, year, bookings, dates, selectDate,
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
      <li className="available" onClick={() => { selectDate(`${year}-${month}-${date}`); }}>
          {date}
      </li>
    );
  });
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
            {datesArr}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

export default Calendar;
