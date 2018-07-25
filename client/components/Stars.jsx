import React from 'react';

const Stars = ({ num }) => Array(5).fill('').map((star, i) => {
  if (i < num) {
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

export default Stars;
