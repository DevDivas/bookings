import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';

const Headers = ({ roomDetails }) => (
  <div>
    <div>
      <span>
        {roomDetails.roomRateBase}
      </span>
      <span>
        per Night
      </span>
    </div>
    <div>
      <Stars num={roomDetails.stars} />
    </div>
  </div>
);

Headers.propTypes = {
  roomDetails: PropTypes.shape({
    roomRateBase: PropTypes.number,
    stars: PropTypes.number,
  }),
};

Headers.defaultProps = {
  roomDetails: {},
};

export default Headers;
