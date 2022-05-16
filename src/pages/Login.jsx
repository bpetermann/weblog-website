import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import LoginForm from '../components/user/LoginForm';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();

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
    <LoginForm
      setFormData={setFormData}
      onSubmit={onSubmit}
      email={email}
      password={password}
    />
  );
};

export default Login;
