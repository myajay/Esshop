import React, { useState } from 'react';
import './Login.css'
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'; 
function Login({ onLoginSuccess }) {
  // States to manage form data and errors
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate(); 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset any previous error
    setError('');

    

    // Validate the form fields
    if (!name || !mobile) {
      setError('Please enter both name and mobile number');
      return;
    }

    // Check if the mobile number is valid (basic validation)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Store data in sessionStorage
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userMobile', mobile);

   
    alert('OTP has been "sent" ');

    onLoginSuccess(true)


  };

  return (
    <div className="login-container">
      <h2 className='loginHeader'>Login</h2>
      
      {/* Show error message if there is one */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            placeholder="Enter your 10 digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

{/* <Link to='/otp'> */}
<button className='Loginbtn'  type="submit">Send OTP</button>

{/* </Link> */}
      </form>
    </div>
  );
}

export default Login;
