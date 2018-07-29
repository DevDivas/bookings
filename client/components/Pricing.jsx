import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Pricing.css';

const Pricing = (props) => {
  const { roomDetails, stayLength } = props;
  const basePrice = roomDetails.roomRateBase * stayLength;

  return (
    <div>
      <table>
        <tbody>
          <tr className="row">
            <td className="cell chargeType">
              {`$${roomDetails.roomRateBase} x ${stayLength} nights`}
            </td>
            <td className="cell price">
              $
              {basePrice}
            </td>
          </tr>
          <tr lassName="row">
            <td className="cell chargeType">
              Service Fee
            </td>
            <td className="cell price">
              {`$${roomDetails.serviceFee}`}
            </td>
          </tr>
          <tr lassName="row">
            <td className="cell chargeType">
              Cleaning Fee
            </td>
            <td className="cell price">
              {`$${roomDetails.cleaningFee}`}
            </td>
          </tr>
          <tr lassName="row">
            <td className="cell chargeType bottomRow">
              <b>
                Total
              </b>
            </td>
            <td className="cell price bottomRow">
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
