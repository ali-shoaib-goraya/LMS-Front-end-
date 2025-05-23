import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import logo from '../assets/logo.png'; 
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function FacultyLogin() {
  const { accessToken, user } = useAuth();
  
  // Handle authentication redirects
  if (accessToken) {
    if (user?.Type === 'Faculty' || user?.Type === 'CampusAdmin') {
      return <Navigate to="/dashboard" />;
    } else if (user?.Type === 'Student') {
      return <Navigate to="/student" />;
    } else if (user?.Type === 'Teacher') {
      return <Navigate to="/teacher" />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <Link to="/" className="mb-6">
            <img className="h-16 w-auto" src={logo} alt="University Logo" />
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight">
            Faculty Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Please fill out the fields below to access your account.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
          <LoginForm userType="Faculty" />
        </div>
      </div>
    </div>
  );
}

export default FacultyLogin;
