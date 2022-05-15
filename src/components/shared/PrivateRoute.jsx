import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to='/register' />;
};

export default PrivateRoute;
