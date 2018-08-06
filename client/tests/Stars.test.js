import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Stars from '../components/Stars';

describe('Stars', () => {
  const props = { num: 2 };
  const wrap = shallow(<Stars {...props} />);

  it('should exist', () => {
    expect(wrap.exists()).toBeTruthy();
  });
  // it('should render a `.ratings`', () => {
  //   expect(wrap.find('img').length).toBe(1);
  // });
});