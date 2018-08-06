import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Guests from '../components/Guests';

describe('Guests', () => {
  const props = {
    numGuests: 1,
    toggleGuests: true,
    changeGuestNum: () => {},
    maxGuests: 5,
    toggleGuestMenu: () => {}
  };
  const wrap = shallow(<Guests {...props} />);

  it('should exist', () => {
    expect(wrap.exists()).toBeTruthy();
  });

  it('should render overallGuests div', () => {
    expect(wrap.find('.overallGuests').length).toBe(1);
  });

  it('should render guestsContainer div when toggleGuests is true', () => {
    expect(wrap.find('.guestsContainer').length).toBe(1);
  });


});