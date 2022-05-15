import React, { useState } from 'react';
import { toast } from 'react-toastify';
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
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    specialChars: false,
    passwordTouched: false,
  });
  const [confirmPasswordTouched, setConfirmPasswordIsTouched] = useState(false);

  const { name, email, password, confirmPassword } = formData;
  const { length, specialChars, passwordTouched } = passwordValidation;

  // eslint-disable-next-line
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const passwordIsValid = Object.values(passwordValidation).every(
    (value) => value === true
  );
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

  const passwordInputBlurHandler = (e) => {
    e.preventDefault();
    setPasswordValidation({
      passwordTouched: true,
      length: e.target.value.trim().length >= 6,
      specialChars: format.test(e.target.value),
    });
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
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      toast.error('Sorry, something went wrong with registration');
    }
  };

  return (
    <div>
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
                !passwordIsInavlid
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
            <p className={classes['password-info']}>
              Create a password that is at least 6 characters long and includes
              1 special character
            </p>
            {passwordIsInavlid && !length && (
              <p className={classes['invalid-message']}>
                *Your password must be at least 6 characters long
              </p>
            )}

            {passwordIsInavlid && !specialChars && (
              <p className={classes['invalid-message']}>
                *Your password must contain at least 1 special character
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
