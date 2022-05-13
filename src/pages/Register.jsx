import React, { useState } from 'react';
import classes from './Register.module.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordIsTouched] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const passwordIsValid = password.trim().length >= 6;
  const passwordIsInavlid = !passwordIsValid && passwordTouched;
  const confirmPasswordIsValid = password === confirmPassword ? true : false;
  const confirmPasswordIsInvalid =
    !confirmPasswordIsValid && confirmPasswordTouched;

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const passwordInputBlurHandler = (event) => {
    event.preventDefault();
    setPasswordTouched(true);
  };

  const confirmPasswordBlurHandler = (event) => {
    event.preventDefault();
    setConfirmPasswordIsTouched(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!passwordIsValid || !confirmPasswordIsValid) {
      return;
    }
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      delete formDataCopy.confirmPassword;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes['container']}>
      <h1>Register</h1>
      <main>
        <form className={classes['form']} onSubmit={onSubmit}>
          <input
            type='text'
            className={classes['nameInput']}
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChangeHandler}
            required
          />

          <input
            type='email'
            className={classes['emailInput']}
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChangeHandler}
            required
          />

          <div className={classes['passwordInputDiv']}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChangeHandler}
              onBlur={passwordInputBlurHandler}
              className={
                !confirmPasswordIsInvalid
                  ? classes['passwordInput']
                  : `${classes['passwordInput']} ${classes['invalid']}`
              }
              required
            />
            <AiOutlineEye
              onClick={() => setShowPassword((prevState) => !prevState)}
              size={32}
              className={classes['showPassword']}
            />
            {passwordIsInavlid && (
              <p className={classes['invalid-message']}>
                *Your password must be at least 6 characters long
              </p>
            )}
          </div>

          <div className={classes['passwordInputDiv']}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={onChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              className={
                !confirmPasswordIsInvalid
                  ? classes['passwordInput']
                  : `${classes['passwordInput']} ${classes['invalid']}`
              }
              required
            />
            <AiOutlineEye
              onClick={() => setShowPassword((prevState) => !prevState)}
              size={32}
              className={classes['showPassword']}
            />
            {confirmPasswordIsInvalid && (
              <p className={classes['invalid-message']}>
                *Passwords do not match
              </p>
            )}
          </div>
          <div className={classes['button-container']}>
            <button className={classes['submit-button']}>Sign Up</button>
            <Link to='/login' className={classes['registerButton']}>
              Login
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;
