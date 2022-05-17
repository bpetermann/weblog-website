import React from 'react';
import classes from './NavbarModal.module.css';
import { Link } from 'react-router-dom';
import Backdrop from './Backdrop';

const NavbarModal = ({ onClose }) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className={classes.container}>
        <Link to='/'>Posts</Link>
        <Link to='/add-post'>Add Post</Link>
        <Link to='/profile'>Profile</Link>
      </div>
    </>
  );
};

export default NavbarModal;
