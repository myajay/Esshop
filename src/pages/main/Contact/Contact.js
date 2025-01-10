import React from 'react';
import { FaEnvelope } from 'react-icons/fa';  // For the envelope icon
import './Contact.css';  // For styling the page

const ContactPage = () => {
  const email = 'ajaymyaka@gmail.com';  // Replace with your actual email

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or need support, feel free to reach out to us.</p>
      
      <div className="contact-info">
        <FaEnvelope size={40} color="green" />
        <span className="email-address">{email}</span>
      </div>

      <div className="note">
        <p>We will get back to you as soon as possible!</p>
      </div>
    </div>
  );
};

export default ContactPage;
