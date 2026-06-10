import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useStore from '../store/useStore';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = useStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('wl_token', token);
      setToken(token);
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <p className="text-white text-xl">Connecting your sound...</p>
    </div>
  );
};

export default AuthSuccess;