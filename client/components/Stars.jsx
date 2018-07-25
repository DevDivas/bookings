import React from 'react';

const Stars = ({ num }) => {
  const starsArr = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < num) {
      starsArr.push('X');
    } else {
      starsArr.push('O');
    }
  }
  const stars = starsArr.map((star) => {
    if (star === 'X') {
      return (
        <button type="button">
          X
        </button>
      );
    }
    return (
      <button type="button">
        O
      </button>
    );
  });
  return (
    <span>
      {stars}
    </span>
  );
};

export default Stars;
