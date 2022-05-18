import React from 'react';
import classes from './Alert.module.css';

const Alert = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default Alert;
