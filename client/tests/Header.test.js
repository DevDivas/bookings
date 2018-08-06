import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Header from '../components/Header';
import Stars from '../components/Stars';

describe('Header', () => {
  const props = { roomDetails: {} };
  const wrap = shallow(<Header {...props} />);

  it('should exist', () => {
    expect(wrap.exists()).toBeTruthy();
  });

  it('renders one <Stars /> components', () => {
    expect(wrap.find(Stars).length).toBe(1);
  });

  // it('have 5 img elements', () => {
  //   expect(wrap.find().length).toBe(5);
  // });

  console.log(wrap.find('.starsContainer'));
});