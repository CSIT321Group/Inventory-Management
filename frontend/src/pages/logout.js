import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.removeItem('jwt');
    onLogout();  // Update the loggedIn state
    navigate('/login');
  }, [navigate, onLogout]);

  return null;
}

export default Logout;