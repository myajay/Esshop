import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import './Otp.css'

function OtpPage({otpSuccess}) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Format the mobile number to show last 3 digits and mask others
  const formatMobileNumber = (number) => {
    if (!number) return '';
    const lastFour = number.slice(-4);  // Get the last 4 digits
    const maskedNumber = 'XXXXXX' + lastFour;
    return maskedNumber;
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset error and success states
    setError('');
    setSuccess(false);

    // Validate OTP (it should be exactly 6 digits)
    if (otp.length !== 6 || isNaN(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    // Simulate OTP validation (you can implement your actual OTP validation logic here)
    if (otp === '123456') {  // You can change this to match the OTP sent or stored
      setSuccess(true);
      // setTimeout(() => {
        // Redirect to Add to Cart page after success
        navigate('/Home');  // Redirecting to Add to Cart page
        window.location.reload();
      // }, 1000); // Delay for a better UX experience
      otpSuccess(false)
      // navigate('/Home');  // Redirecting to Add to Cart page

    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  // On component mount, get mobile number from sessionStorage
  useEffect(() => {
    const storedMobileNumber = sessionStorage.getItem('userMobile');
    if (storedMobileNumber) {
      setMobileNumber(storedMobileNumber);
    }
  }, []);

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      
      {/* Display success message */}
      {success && <p style={{ color: 'green' }}>Login Successful!</p>}
      
      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="mobile-number-display">
        <p><strong>Mobile Number:</strong> {formatMobileNumber(mobileNumber)}</p>
        <div className="scrolling-text-container">
      <p className="scrolling-text">Please use OTP: 123456</p>
    </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP (6 digits):</label>
          <input
            type="text"
            maxLength="6" // Limit input to 6 digits
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP"
          />
        </div>

        <button className='otpbutton' type="submit">Submit OTP</button>
      </form>
    </div>
  );
}

export default OtpPage;
