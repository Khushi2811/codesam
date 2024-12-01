import React, { useState } from 'react';
import ChangePasswordModal from './ChangePasswordModal'; // Import the Change Password Modal
import Sidebar from './Sidebar'; // Import Sidebar
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChangePassword = () => {
        setIsModalOpen(true); // Open the modal when the button is clicked
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onChangePassword={handleChangePassword} />

            {/* Main Content */}
            <div className="flex-grow p-6">
                <button onClick={toggleSidebar} className="mb-4 text-blue-500">
                    ☰ {/* Hamburger Icon */}
                </button>

                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">File Management Dashboard</h1>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </header>

                {/* File Management Section */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Sample File/Folders */}
                    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                        <h2 className="font-bold">Document 1</h2>
                        <p>Last modified: 2024-01-01</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                        <h2 className="font-bold">Document 2</h2>
                        <p>Last modified: 2024-01-02</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                        <h2 className="font-bold">Folder 1</h2>
                        <p>Contains: 5 files</p>
                    </div>
                    {/* Add more files/folders as needed */}
                </div>

                {/* Change Password Modal */}
                <ChangePasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
};

export default Home;