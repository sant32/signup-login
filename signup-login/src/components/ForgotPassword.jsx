import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://signup-login-server.onrender.com/forgot-password', { email });
      toast.success('Password reset link sent to your email');
      // No need to navigate here, the user will navigate from the email link
    } catch (error) {
      toast.error('Error sending password reset link');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
