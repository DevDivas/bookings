import React from 'react';
import PropTypes from 'prop-types';

const Pricing = (props) => {
  const { roomDetails, stayLength } = props;
  const basePrice = roomDetails.roomRateBase * stayLength;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              {`$${roomDetails.roomRateBase} x ${stayLength} nights`}
            </td>
            <td>
              $
              {basePrice}
            </td>
          </tr>
          <tr>
            <td>
              Service Fee
            </td>
            <td>
              {`$${roomDetails.serviceFee}`}
            </td>
          </tr>
          <tr>
            <td>
              Cleaning Fee
            </td>
            <td>
              {`$${roomDetails.cleaningFee}`}
            </td>
          </tr>
          <tr>
            <td>
              <b>
                Total
              </b>
            </td>
            <td>
              <b>
                {`$${basePrice + roomDetails.serviceFee + roomDetails.cleaningFee}`}
              </b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Pricing.propTypes = {
  roomDetails: PropTypes.shape({
    roomRateBase: PropTypes.number,
    serviceFee: PropTypes.number,
    cleaningFee: PropTypes.number,
  }),
  stayLength: PropTypes.number,
};

Pricing.defaultProps = {
  roomDetails: {},
  stayLength: 1,
};

export default Pricing;
