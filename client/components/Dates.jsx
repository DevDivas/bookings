import React from 'react';
import Calendar from './Calendar';

const moment = require('moment');

const Dates = (props) => {
  const { currentYear, currentMonth, numDaysInMonth, monthlyBookings, availableRoom, changeMonth } = props;
  const createMonth = () => {
    const dayOfWeek = moment(`${currentYear}-${currentMonth}-01`).day();
    return Array(numDaysInMonth + dayOfWeek).fill(null).map((day, index) => {
      if (index < dayOfWeek) {
        return null;
      }
      return index - dayOfWeek + 1;
    });
  };
  return (
    <div>
      <div>
        <input type="text" value="Check In" />
        <img alt="" />
        <input type="text" value="Check Out" />
      </div>
      <Calendar
        calendarOpen={true}
        month={currentMonth}
        year={currentYear}
        bookings={monthlyBookings}
        dates={createMonth()}
        selectDate={availableRoom}
        changeMonth={changeMonth}
      />
    </div>
  );
};

export default Dates;
