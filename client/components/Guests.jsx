import React from 'react';

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
      <div className="toggleContainer" style={{ display: 'table-cell' }}>
        <div className="minus" style={{ display: 'table-cell' }}>
          <button
            type="button"
            onClick={() => {
              if (number) {
                changeGuestNum(guestType, '-');
              }
            }}
          >
            -
          </button>
        </div>
        <div className="numGuests" style={{ display: 'table-cell' }}>
          {number}
        </div>
        <div className="plus" style={{ display: 'table-cell' }}>
          <button
            type="button"
            onClick={() => {
              if (!maxGuestsReached || (maxGuestsReached && guestType === 'Infants')) {
                changeGuestNum(guestType, '+');
              }
            }}
          >
            +
          </button>
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
    <div style={{ display: 'table' }}>
      <div style={{ display: 'table-cell' }}>
        <div>
          {guestType.title}
        </div>
        <div>
          {guestType.subtitle}
        </div>
      </div>
      {createToggles(guestType.title, guestType.number)}
    </div>
  ));

  return (
    <div>
      <div onClick={toggleGuestMenu}>
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
          {renderGuests}
        </div>
      )}
    </div>
  );
};

export default Guests;
