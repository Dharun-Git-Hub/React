import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      navigate('/mainmenu');
    } else {
      navigate('/mainmenu');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
      <img
        id="pngg"
        src="./Assets/wave.png"
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: -1 }}
        alt="Wave"
      />
      <img
        src="./Assets/unlock.svg"
        id="imagefor"
        className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        alt="Unlock"
      />
      <form id="firm" className="flex flex-col justify-center items-center w-1/2" onSubmit={handleSubmit}>
        <img src="/Assets/avatar.svg" className="w-32" alt="Avatar" />
        <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
          Welcome!
        </h2>
        <div className="relative">
          <i className="fa fa-user absolute text-primarycolor text-xl"></i>
          <input
            type="text"
            placeholder="username"
            className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative mt-8">
          <i className="fa fa-lock absolute text-primarycolor text-xl"></i>
          <input
            type="password"
            placeholder="password"
            className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="#" id="forget" className="self-end mt-4 text-gray-600 font-bold">
          Forgot password?
        </a>
        <a
          href="#"
          onClick={handleSubmit}
          className="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
        >
          Login
        </a>
        <div className="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500">
          SignUp
        </div>
      </form>
    </div>
  );
};

export default Login;
