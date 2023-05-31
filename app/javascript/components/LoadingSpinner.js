import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ text }) => (
  <div className="page">
    <h2 className="page__title">{text}</h2>
    <div className="spinner">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

LoadingSpinner.propTypes = {
  text: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  text: 'Loading data from API ...',
};

export default LoadingSpinner;
