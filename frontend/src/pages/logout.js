import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Clear the user session (JWT token in this case)
    localStorage.removeItem('jwt');

    // Redirect the user to the main page or any other page you prefer
    navigate('/login'); // This will navigate to the home page.
  }, [navigate]);

  // Return null because we don't want to render anything
  return null;
}

export default Logout;