import React, { useEffect } from 'react';
import { useNavigate, redirect } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      navigate('/');
      console.log('Unauthorized')
    }
  }, [token, navigate]);

  return token ? children : null;
}
