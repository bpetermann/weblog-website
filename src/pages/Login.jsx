import React, { useState } from 'react';
import classes from './Login.module.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error(`Sorry, we couldn't log you in`);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <main>
        <form className={classes['form']} onSubmit={onSubmit}>
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
          <div className={classes['button-container']}>
            <button className={classes['loginButton']}>Login</button>
            <Link to='/register' className={classes['registerButton']}>
              Sign Up
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
