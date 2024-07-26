import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
  //const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
 const navigate = useNavigate();

  const onSubmit = async (data) => {
   try {
     const response = await axios.post('https://signup-login-server.onrender.com/login',data)
     console.log("data:", response);
     toast.success("Login successfully")
     // Handle login logic here
     // On successful login, redirect to the dashboard or home page
     navigate('/home');
   } catch (error) {
    console.error('error:', error)
      toast.error('signup failed. Please try again')
    
   }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            {...register('email')}
            className={`border p-2 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            {...register('password')}
            className={`border p-2 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">Login</button>
        <p className="text-gray-700 text-sm">
          Create account <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
        </p>
       
        <p className="text-gray-700 text-sm">
          Forgot password? <Link to="/forgotpassword" className="text-blue-500 hover:underline">Forgot password</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
