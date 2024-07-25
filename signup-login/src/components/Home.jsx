import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (

    <div>Home
       <p className="text-gray-700 text-sm">
          Forgot password? <Link to="/forgotpassword" className="text-blue-500 hover:underline">Forgot password</Link>
        </p>
    </div>
    
  )
}

export default Home