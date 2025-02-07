// src/components/Greeting.js
// import React from 'react';
import PropTypes from 'prop-types';

const Greeting = ({ name }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to our website.</p>
    </div>
  );
};


Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
