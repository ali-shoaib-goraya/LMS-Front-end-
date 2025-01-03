import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import EyeIcon from '@/assets/eye.png';
import EyeSlashIcon from '@/assets/eyeslash.png';

function LoginForm({ userType = 'student' }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulated login logic
      const { username, password } = formData;
      if (username === 'student' && password === 'password') {
        // Redirect to student dashboard
        navigate('/student');
      } else if (username === 'admin' && password === 'password') {
        // Redirect to admin dashboard
        navigate('/dashboard');
      } else {
        // Invalid credentials
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <div className="relative">
        <InputField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <img src={EyeSlashIcon} alt="Hide Password" className="h-5 w-5" />
          ) : (
            <img src={EyeIcon} alt="Show Password" className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500">
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>

      {userType === 'student' ? (
        <p className="text-sm text-gray-600 text-center">
          Are you a Faculty?{' '}
          <Link to="/faculty-login" className="text-primary-600 hover:text-primary-500">
            Login Here
          </Link>
        </p>
      ) : (
        <p className="text-sm text-gray-600 text-center">
          Are you a Student?{' '}
          <Link to="/student-login" className="text-primary-600 hover:text-primary-500">
            Login Here
          </Link>
        </p>
      )}
    </form>
  );
}

export default LoginForm;
