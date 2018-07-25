import React from 'react';

const Stars = ({ num }) => Array(5).fill('').map((star, i) => {
  // temporarily using buttons until I find nice star svgs
  const content = (
    <button type="button">
      O
    </button>
  );
  if (i < num) {
    return (
      <button type="button">
        X
      </button>
    );
  }
  return content;
});

export default Stars;
