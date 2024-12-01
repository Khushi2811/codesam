import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reset Password Email: ", email);
        
        // Show success toast message
        toast.success("Reset link successfully sent to your email. Please check your inbox!");

        // Add your password reset logic here (e.g., API call)
        
        onClose(); // Close modal after submission
    };

    if (!isOpen) return null; // Don't render anything if the modal is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg" style={{ width: '600px', height: '400px' }}>
                <h2 className="text-lg font-bold mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Send Reset Link
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

export default ForgotPasswordModal;