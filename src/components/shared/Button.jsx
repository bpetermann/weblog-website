import React from 'react';
import classes from './Button.module.css';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={classes.button}>
      {' '}
      {children}
    </button>
  );
};

export default Button;
