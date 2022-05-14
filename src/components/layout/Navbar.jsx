import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  return (
    <div className={classes['navbar']}>
      <div className={classes['container']}>
        <NavLink
          to='/'
          style={({ isActive }) =>
            isActive ? { borderColor: '#fff' } : undefined
          }
        >
          Posts
        </NavLink>
        <NavLink
          to='/profile'
          style={({ isActive }) =>
            isActive ? { borderColor: '#fff' } : undefined
          }
        >
          Profile
        </NavLink>

        <GiHamburgerMenu size={30} className={classes['hamburger']} />
      </div>
    </div>
  );
};

export default Navbar;
