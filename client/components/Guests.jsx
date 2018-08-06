import React from 'react';
import '../styles/Guests.css';

const Guests = (props) => {
  const {
    numGuests, toggleGuests, changeGuestNum, maxGuests, toggleGuestMenu,
  } = props;

  // determine how many guests/infants to display in the top bar
  let display = '';
  if (numGuests.adults + numGuests.children > 1) {
    display = `${numGuests.adults + numGuests.children} guests`;
  } else {
    display = '1 guest';
  }
  let infantsDisplay = '';
  if (numGuests.infants === 1) {
    infantsDisplay = '1 infant';
  } else if (numGuests.infants > 1) {
    infantsDisplay = `${numGuests.infants} infants`;
  }

  // create toggles for each type of guest
  const createToggles = (guestType, number) => {
    let maxGuestsReached = false;
    if (numGuests.adults + numGuests.children >= maxGuests) {
      maxGuestsReached = true;
    }
    let canDecrease = true;
    if ((guestType === 'Adults' && numGuests.adults === 1) || !number) {
      canDecrease = false;
    }

    return (
      <div className="toggleContainer dtc">
        <div className="innerToggleContainer">
          <div className="minus dtc">
            <button
              type="button"
              className={`minusButton guestsButtons${canDecrease ? '' : ' inactive'}`}
              onClick={() => {
                if (canDecrease) {
                  changeGuestNum(guestType, '-');
                }
              }}
            />
          </div>
          <div className="numGuests dtc">
            {number}
          </div>
          <div className="plus dtc">
            <button
              type="button"
              className={`addButton guestsButtons${maxGuestsReached && guestType !== 'Infants' ? ' inactive' : ''}`}
              onClick={() => {
                if (!maxGuestsReached || (maxGuestsReached && guestType === 'Infants')) {
                  changeGuestNum(guestType, '+');
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  // create array of guest numbers/info
  const adults = {
    title: 'Adults',
    subtitle: '',
    number: numGuests.adults,
  };
  const children = {
    title: 'Children',
    subtitle: 'Ages 2-12',
    number: numGuests.children,
  };
  const infants = {
    title: 'Infants',
    subtitle: 'Under 2',
    number: numGuests.infants,
  };
  const guests = [adults, children, infants];

  const renderGuests = guests.map(guestType => (
    <div className="dt guestsModal">
      <div className="guestTypeLabel dtc">
        <div>
          {guestType.title}
        </div>
        <div className="labelSubtitle">
          {guestType.subtitle}
        </div>
      </div>
      {createToggles(guestType.title, guestType.number)}
    </div>
  ));

  return (
    <div className="overallGuests">
      <button type="button" className="guestsDisplay" onClick={toggleGuestMenu}>
        <div className={`guestsDisplayInner${toggleGuests ? ' highlight' : ''}`}>
          <span>
            {display}
          </span>
          {numGuests.infants > 0 && (
            <span>
              ,
              <span>
                {` ${infantsDisplay}`}
              </span>
            </span>
          )}
        </div>
        {toggleGuests && (
          <div>
            <img alt="" className="arrowImg" src="https://s3-us-west-1.amazonaws.com/fecimages/up-arrow.png" />
          </div>
        )}
        {!toggleGuests && (
          <div>
            <img alt="" className="arrowImg" src="https://s3-us-west-1.amazonaws.com/fecimages/down-arrow.png" />
          </div>
        )}
      </button>
      {toggleGuests && (
        <div className="guestsContainer">
          {renderGuests}
          <div className="guestsModalFooter">
            <div className="maxGuestsText">
              {`${maxGuests} guests maximum. Infants don’t count toward the number of guests.`}
            </div>
            <button type="button" className="guestsCloseButton" onClick={toggleGuestMenu}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guests;
