import React, { useState } from 'react';
import classes from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className={classes['container']}>
      <h1>Login</h1>
      <main>
        <form className={classes['form']}>
          <input
            type='email'
            className={classes['emailInput']}
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChangeHandler}
          />

          <div className={classes['passwordInputDiv']}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={classes['passwordInput']}
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChangeHandler}
            />
            <AiOutlineEye
              onClick={() => setShowPassword((prevState) => !prevState)}
              size={32}
              className={classes['showPassword']}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
