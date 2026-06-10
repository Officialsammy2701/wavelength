import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import api from '../lib/api';

const useAuth = () => {
  const { user, token, setUser, setToken } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('wl_token');
    if (storedToken && !user) {
      setToken(storedToken);
      api.get('/user/profile')
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('wl_token');
          navigate('/');
        });
    }
  }, []);

  return { user, token };
};

export default useAuth;