import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';
import '../styles/Header.css';

const Headers = ({ roomDetails }) => (
  <div>
    <div>
      <span className="roomPrice">
        {`$${roomDetails.roomRateBase} `}
      </span>
      <span className="label">
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
