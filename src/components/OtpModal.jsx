import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';

const OtpModal = ({ isOpen, onClose, userId }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false); // New loading state for resend
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    let countdown; // Declare countdown variable

    useEffect(() => {
        if (isOpen) {
            resetTimer(); // Reset timer when modal opens
        }
        return () => clearInterval(countdown); // Cleanup on unmount
    }, [isOpen]);

    const resetTimer = () => {
        setTimer(60); // Reset timer to 60 seconds
        setCanResend(false); // Disable resend initially
        clearInterval(countdown); // Clear any existing interval

        countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown); // Clear interval when timer ends
                    setCanResend(true); // Enable resend after countdown ends
                    return 0;
                }
                return prev - 1; // Decrease timer by 1 second
            });
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("OTP Submitted: ", otp);
        
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, otp }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to verify OTP');
            }

            const data = await response.json();
            toast.success(data.message);
            onClose();

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true); // Set loading state for resend OTP
        try {
            const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to resend OTP');
            }

            toast.success('OTP resent successfully!');
            resetTimer(); // Reset timer after resending OTP
        } catch (error) {
            toast.error(error.message || 'An error occurred while resending OTP.');
        } finally {
            setResendLoading(false); // Reset loading state after API call
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
                <form onSubmit={handleSubmit}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                            width: '3rem',
                            height: '3rem',
                            margin: '0 0.5rem',
                            fontSize: '24px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <button 
                        type="submit" 
                        className={`mt-4 w-full ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
                
                {/* Timer and Resend Link */}
                <div className="mt-4 text-center">
                    {timer > 0 ? (
                        <p>Resend OTP in {timer} seconds</p>
                    ) : (
                        canResend && (
                            <button 
                                onClick={handleResendOtp} 
                                className={`text-blue-500 hover:text-blue-700 font-semibold ${resendLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                disabled={resendLoading} // Disable button while loading
                            >
                                {resendLoading ? 'Sending...' : 'Resend OTP'}
                            </button>
                        )
                    )}
                </div>

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

export default OtpModal;