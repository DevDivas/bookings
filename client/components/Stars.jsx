import React from 'react';

const Stars = ({ num }) => Array(5).fill('').map((star, i) => {
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
