// src/ChangePasswordModal.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        console.log("Changing password...");
        // Add your password change logic here (e.g., API call)
        
        // Show success toast message
        toast.success("Password changed successfully!");
        
        onClose(); // Close modal after submission
    };

    if (!isOpen) return null; // Don't render anything if the modal is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg" style={{ width: '600px', height: '400px' }}>
                <h2 className="text-lg font-bold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        placeholder="Enter your current password"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <label className="block text-sm font-medium text-gray-700 mt-4">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Enter your new password"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <label className="block text-sm font-medium text-gray-700 mt-4">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        placeholder="Confirm your new password"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Change Password
                    </button>
                </form>
                <button 
                    onClick={onClose} 
                    className="mt-2 text-red-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ChangePasswordModal;