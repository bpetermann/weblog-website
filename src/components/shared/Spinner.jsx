import React from 'react';
import spinner from '../../assets/gifs/spinner.gif';

const Spinner = () => {
  return (
    <img
      src={spinner}
      alt='Loading...'
      style={{
        width: '50px',
        margin: 'auto',
        marginTop: '25%',
        display: 'block',
      }}
    />
  );
};

export default Spinner;
