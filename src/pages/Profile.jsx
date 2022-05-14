import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Profile.module.css';
import { getAuth } from 'firebase/auth';

const Profile = () => {
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const logoutHander = () => {
    auth.signOut();
    navigate('/');
  };
  console.log(setFormData)

  return (
    <div className={classes['container']}>
      <header>
        <h1>{name}'s Profile</h1>
      </header>
      <p>{email}</p>
      <button className={classes['logout-button']} onClick={logoutHander}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
