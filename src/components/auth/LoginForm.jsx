import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import EyeIcon from '@/assets/eye.png';
import EyeSlashIcon from '@/assets/eyeslash.png';
import { useLoginMutation } from "../../app/api/authApiSlice";
function LoginForm({ userType }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await login({
        email: formData.username,
        password: formData.password,
        type: userType,
        rememberMe: formData.rememberMe,
      }).unwrap();

      if (response){
      console.log ("Login Response", response);}

      setFormData({ username: '', password: '', rememberMe: false });
      navigate(userType === 'Student' ? '/student' : '/dashboard');
    } catch (err) {
      console.log("Backend Server Error",err);
      const errorMessages = {
        400: 'Missing Username or Password',
        401: 'Unauthorized',
      };
      setErrors({ form: errorMessages[err.originalStatus] || 'Login Failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && <div className="text-red-500 text-sm">{errors.form}</div>}

      <InputField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />

      <div className="relative">
        <InputField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img
            src={showPassword ? EyeSlashIcon : EyeIcon}
            alt={showPassword ? 'Hide Password' : 'Show Password'}
            className="h-5 w-5"
          />
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

      {userType === 'Student' ? (
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
