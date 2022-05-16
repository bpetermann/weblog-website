import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/user/RegisterForm';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

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
    <RegisterForm
      onSubmitHandler={onSubmitHandler}
      name={name}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      setFormData={setFormData}
    />
  );
};

export default Register;
