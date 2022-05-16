import React, { useState } from 'react';
import classes from './RegisterForm.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

const RegisterForm = ({
  onSubmitHandler,
  setFormData,
  name,
  email,
  password,
  confirmPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    specialChars: false,
    passwordTouched: false,
  });

  const [confirmPasswordTouched, setConfirmPasswordIsTouched] = useState(false);
  const { length, specialChars, passwordTouched } = passwordValidation;

  const passwordIsValid = Object.values(passwordValidation).every(
    (value) => value === true
  );
  const confirmPasswordIsValid = password === confirmPassword ? true : false;

  const passwordIsInavlid = !passwordIsValid && passwordTouched;
  const confirmPasswordIsInvalid =
    !confirmPasswordIsValid && confirmPasswordTouched;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!passwordIsValid || !confirmPasswordIsValid) {
      return;
    }
    onSubmitHandler(e);
  };

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // eslint-disable-next-line
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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

  return (
    <>
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
                Create a password that is at least 6 characters long and
                includes 1 special character
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
    </>
  );
};

export default RegisterForm;
