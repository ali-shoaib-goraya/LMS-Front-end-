import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import logo from '../assets/logo.png';
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useAuthInit from '../hooks/useAuthInit';
import { useEffect } from 'react';

function StudentLogin() {
  const { initializeAuth } = useAuthInit();

  useEffect(() => {
    initializeAuth();
  }, []);
  
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  if (token && user?.Type === 'Faculty') {
    return <Navigate to="/dashboard" />;
  }

  if (token && user?.Type === 'Student') {
    return <Navigate to="/student" />;
  }
  

  // Function to handle successful login
  const handleLoginSuccess = () => {
    navigate('/student');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <Link to="/" className="mb-6">
            <img className="h-16 w-auto" src={logo} alt="University Logo" />
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight">
            Student Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Please fill out the fields below to access your account.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
          <LoginForm userType="Student" />
        </div>

      </div>
    </div>
  );
}

export default StudentLogin;
