import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    console.log('Token from URL:', token);
    if (token) {
      setToken(token);
      console.log('Token saved, checking localStorage:', localStorage.getItem('token'));
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
      <p className="text-white text-xl animate-pulse">Connecting your sound...</p>
    </div>
  );
}