// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './styles/tailwind.css'; // Importing Tailwind CSS

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        {/* Add ToastContainer here */}
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          closeOnClick 
          pauseOnHover 
          draggable 
          theme="light" 
        />
      </div>
    </Router>
  );
};

export default App;