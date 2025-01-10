import './Orderparent.css';
import React, { useState } from 'react';
import "react-step-progress-bar/styles.css";
import "react-step-progress/dist/index.css";

// Importing Material UI components
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '@mui/material';

const OrderParent = () => {
  const steps = ['Cart', 'Payment', 'Confirm'];
  const [quantity, setQuantity] = useState(1);  // Initialize quantity to 1
  const [paymentMethod, setPaymentMethod] = useState('');
  const availableQuantities = [1, 2, 3, 4];  // Fixed set of quantities
  
  // Retrieve saved data from sessionStorage (if any)
  const savedAddress = JSON.parse(sessionStorage.getItem('address')) || {};
  const savedSelectedItem = JSON.parse(sessionStorage.getItem('selectedProduct')) || {};

  const [address, setAddress] = useState(savedAddress);
  const [totalPrice, setTotalPrice] = useState(Number(savedSelectedItem.price));

  // Recalculate the total price whenever quantity changes
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * Number(savedSelectedItem.price)); // Update total price when quantity changes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);  // Update payment method state
  };

  const [activeStep, setActiveStep] = useState(0);

  // Navigation handlers
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }

    sessionStorage.setItem('orderDetails', JSON.stringify(address));
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="containerParent">
            <div className="cardParent">
              <img src={savedSelectedItem.image} alt="Tomato" className="product-image" />
              <div className="product-info">
                <h3>{savedSelectedItem.title}</h3>
                <p className="product-price">Price: ₹{savedSelectedItem.price}</p>
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity: </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-dropdown"
                  >
                    {availableQuantities.map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <p>Total Price: ₹{totalPrice}</p>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="payment-container">
            <div className="step-title">Shipping Address</div>
            <div className="address-form">
              {['name', 'address1', 'address2', 'city', 'state', 'zipcode'].map((field) => (
                <div className="form-group" key={field}>
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={address[field] || ''}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${field}`}
                    className="input-field"
                  />
                </div>
              ))}
            </div>

            <div className="step-title">Payment Method</div>
            <div className="payment-method">
              {['COD', 'UPI'].map((method) => (
                <div className="payment-option" key={method}>
                  <input
                    type="radio"
                    id={method}
                    name="payment-method"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={handlePaymentChange}
                    className="payment-radio"
                  />
                  <label htmlFor={method} className="payment-label">{method}</label>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="order-summary-container">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-details">
            <div className="summary-item">
              <strong>Item Name:</strong> {savedSelectedItem.title}
            </div>
            <div className="summary-item">
              <strong>Price:</strong> ₹{savedSelectedItem.price}
            </div>
            <div className="summary-item">
              <strong>Quantity:</strong> {quantity}
            </div>
            <div className="summary-item">
              <strong>Total Price:</strong> ₹{totalPrice}
            </div>
            
            <div className="address-container">
              <h3 className="address-title">Delivery Address</h3>
              <div className="address-details">
                <p>{address.name}</p>
                <p>{address.address1}</p>
                <p>{address.address2 && address.address2}</p>
                <p>{address.city}, {address.state} - {address.zipcode}</p>
              </div>
            </div>
            
            <div className="payment-method-container">
              <h3 className="payment-title">Payment Method</h3>
              <p>{paymentMethod}</p>
            </div>
          </div>
        </div>
        
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      <Box sx={{ width: '100%',marginTop:'3rem' }}>
        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}
        <Box sx={{ mt: 2 }}>
          {getStepContent(activeStep)}
        </Box>

        {/* Navigation Buttons at the bottom */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between',paddingRight:'5rem',paddingLeft:'5rem',paddingBottom:'3rem' }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default OrderParent;
