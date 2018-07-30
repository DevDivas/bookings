import React from 'react';
import '../styles/Stars.css';

const Stars = ({ num }) => Array(5).fill('').map((star, i) => {
  // temporarily using buttons until I find nice star svgs
  const content = (
    <img alt="" className="ratings" src="https://s3-us-west-1.amazonaws.com/fecimages/ratingsgray.png" />
  );
  if (i < num) {
    return (
      <img alt="" className="ratings" src="https://s3-us-west-1.amazonaws.com/fecimages/ratingsteal.png" />
    );
  }
  return content;
});

export default Stars;
