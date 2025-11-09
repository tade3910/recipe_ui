import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = 'mockToken'; // get from API later
    login(token);
    navigate('/'); // redirect after login
  };

  return <button onClick={handleLogin}>Login</button>;
}
