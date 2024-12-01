// src/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, onChangePassword }) => {
    return (
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
                        &times; {/* Close icon */}
                    </button>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li>
                            <Link to="/home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Home</Link>
                        </li>
                        <li>
                            <Link to="#" onClick={onChangePassword} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Change Password</Link>
                        </li>
                        {/* Add more links as needed */}
                        <li>
                            <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Upload File</Link>
                        </li>
                        <li>
                            <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">My Files</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;