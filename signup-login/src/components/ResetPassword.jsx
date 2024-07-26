import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Token from URL:', token); // Ensure token is being logged correctly
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Invalid token');
      return;
    }

    try {
      const response = await axios.post(`https://signup-login-server.onrender.com/reset-password/${token}`, { password });
      if (response.status === 200) {
        toast.success('Password reset successfully');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Error resetting password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-gray-700">New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
