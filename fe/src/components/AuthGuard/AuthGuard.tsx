import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { read } from '../../utils/localStorage';

const AuthGuard = ({ children }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (read('token') === null) {
      navigate('/');
    }
  }, []);

  // Render the children if the user is logged in
  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard;
