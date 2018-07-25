import React from 'react';
import Stars from './Stars';

const Headers = () => (
  <div>
    <div>
      <span>
        PRICE
      </span>
      <span>
        per Night
      </span>
    </div>
    <div>
      <Stars num={2} />
    </div>
  </div>
);

export default Headers;
