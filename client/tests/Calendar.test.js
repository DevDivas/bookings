import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Calendar from '../components/Calendar';

describe('Calendar', () => {
  const props = {
    calendarOpen: true,
    month: '01',
    year: '2018',
    bookings: [],
    dates: [],
    selectDate: () => {},
    changeMonth: () => {},
    checkin: '2018-01-01',
    checkout: '2018-01-01',
    checkinSelected: false,
    updated: '2018-07-23',
    blackoutAfter: '2018-01-01',
    highlightedDates: [],
    handleMouseEnter: () => {},
    clearDates: () => {},
  };
  const wrap = shallow(<Calendar {...props} />);

  it('should exist', () => {
    expect(wrap.exists()).toBeTruthy();
  });

  it('have 7 days in the week', () => {
    expect(wrap.find('.weekdays').length).toBe(7);
  });
});