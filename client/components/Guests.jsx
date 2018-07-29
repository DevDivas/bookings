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
    return (
      <div className="toggleContainer dtc">
        <div className="innerToggleContainer">
          <div className="minus dtc">
            <button
              type="button"
              className={`minusButton guestsButtons${number && (numGuests.adults > 1) ? '' : ' inactive'}`}
              onClick={() => {
                if (number && numGuests.adults > 1) {
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
    <div>
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
