import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = ({ toggleModal }) => {
  return (
    <div className={classes['navbar']}>
      <div className={classes['container']}>
        <NavLink
          to='/'
          style={({ isActive }) =>
            isActive ? { borderColor: '#a6adba' } : undefined
          }
        >
          Posts
        </NavLink>

        <NavLink
          to='/add-post'
          style={({ isActive }) =>
            isActive ? { borderColor: '#a6adba' } : undefined
          }
        >
          Add Post
        </NavLink>
        <NavLink
          to='/profile'
          style={({ isActive }) =>
            isActive ? { borderColor: '#a6adba' } : undefined
          }
        >
          Profile
        </NavLink>

        <GiHamburgerMenu
          size={30}
          className={classes['hamburger']}
          onClick={toggleModal}
        />
      </div>
    </div>
  );
};

export default Navbar;
