import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Pricing from '../components/Pricing';

describe('Pricing', () => {
  const props = { roomDetails: {}, stayLength: 2 };
  const wrap = shallow(<Pricing {...props} />);

  it('should exist', () => {
    expect(wrap.exists()).toBeTruthy();
  });

  it('have 1 table elements', () => {
    expect(wrap.find('.tableContainer').length).toBe(1);
  });
});