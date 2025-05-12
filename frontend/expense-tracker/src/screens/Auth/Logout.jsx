import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Logout = () => {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext); 

  useEffect(() => {
    
    localStorage.removeItem('token');
    
    
    clearUser();

    
    navigate("/login");
  }, [navigate, clearUser]);

  return null; 
};

export default Logout;
