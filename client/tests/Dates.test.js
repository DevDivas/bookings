import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Dates from '../components/Dates';
const moment = require('moment');

describe('Calendar', () => {
  const props = {
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
  const wrap = shallow(<Dates {...props} />);

  it('should exist', () => {
    expect(wrap.exists()).toBeTruthy();
  });

  it('have 2 date inputs', () => {
    expect(wrap.find('.dateInput').length).toBe(2);
  });
});