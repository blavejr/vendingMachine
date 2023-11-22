import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { read } from '../utils/localStorage';

const AuthGuard = ({ children }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (adjust the condition based on your authentication logic)
    const isLoggedIn = !!read('token');

    // If the user is not logged in, navigate to the login page
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // Render the children if the user is logged in
  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard;
