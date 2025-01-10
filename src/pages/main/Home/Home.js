import './Home.css';
// import tomatoImage from '../../../assets/tomoto1.jpg';
// import broccoliImage from '../../../assets/broccoil.jpg';
// import brinjalImage from '../../../assets/Brinzal.jpg';
// import bitterGourdImage from '../../../assets/BitterGourd.jpg';
// import carrotImage from '../../../assets/carrot.jpg';
// import cabbageImage from '../../../assets/cabbage.jpg';
// import potatoImage from '../../../assets/potato.jpg';
// import cauliflowerImage from '../../../assets/cauliflower.jpg';
import HeadphoneImage from '../../../assets/Headphone.jpg';
import ChargerImage from '../../../assets/charger.jpg';
import MobileImage from '../../../assets/Mobile.jpg';
import KettleImage from '../../../assets/Kettele.jpg';
import TrimmerImage from '../../../assets/Trimmer.jpg';
import SkruImage from '../../../assets/Skru.jpg';
import IronboxImage from '../../../assets/Ironbox.jpg';
import SpectsImage from '../../../assets/Spects.jpg';









import { Button } from '@mui/material';
import { FaHeart } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Login from '../../main/Login/Login';
import OtpPage from '../../main/Login/Otp';

// const products = new Array(8).fill(null).map((_, index) => {
//   if (index % 8 === 0) {
//     return { title: 'TOMATO', price: '30', description: '500g', image: tomatoImage };
//   } else if (index % 8 === 1) {
//     return { title: 'BROCCOLI', price: '25', description: '500g', image: broccoliImage };
//   } else if (index % 8 === 2) {
//     return { title: 'BITTER GOURD', price: '20', description: '250g', image: bitterGourdImage };
//   } else if (index % 8 === 3) {
//     return { title: 'BRINJAL', price: '22', description: '100g', image: brinjalImage };
//   } else if (index % 8 === 4) {
//     return { title: 'CARROT', price: '40', description: '500g', image: carrotImage };
//   } else if (index % 8 === 5) {
//     return { title: 'CABBAGE', price: '15', description: '500g', image: cabbageImage };
//   } else if (index % 8 === 6) {
//     return { title: 'POTATO', price: '36', description: '1kg', image: potatoImage };
//   } else {
//     return { title: 'CAULIFLOWER', price: '18', description: '1kg', image: cauliflowerImage };
//   }
// });


const products = new Array(8).fill(null).map((_, index) => {
  if (index % 8 === 0) {
    return { title: 'Headphone', price: '30', description: '500g', image: HeadphoneImage };
  } else if (index % 8 === 1) {
    return { title: 'Charger', price: '25', description: '500g', image: ChargerImage };
  } else if (index % 8 === 2) {
    return { title: 'Mobile', price: '20', description: '250g', image: MobileImage };
  } else if (index % 8 === 3) {
    return { title: 'Kettle', price: '22', description: '100g', image: KettleImage };
  } else if (index % 8 === 4) {
    return { title: 'Trimmer', price: '40', description: '500g', image: TrimmerImage };
  } else if (index % 8 === 5) {
    return { title: 'Wrench', price: '15', description: '500g', image: SkruImage };
  } else if (index % 8 === 6) {
    return { title: 'Iron Box', price: '36', description: '1kg', image: IronboxImage };
  } else {
    return { title: 'Glasses', price: '18', description: '1kg', image: SpectsImage };
  }
});

function Home() {
  const [isLiked, setIsLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalOtp, setShowModalOtp] = useState(false);

  const handleClose = () => setShowAlert(false);
  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleShow = () => setShowModal(true);
  const handleShowOtp = () => setShowModalOtp(true);
  const handleClose1 = () => setShowModal(false);
  const handleCloseOtp = () => setShowModalOtp(false);

  function handleLoginSuccess() {
    handleClose1();
    handleShowOtp();
  }

  const handleOtp = () => {
    handleCloseOtp();
  };

  const takeDetails = (product) => {
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
  };

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    console.log('Stored username from sessionStorage:', storedUserName); // Debugging line
    if (storedUserName) {
      setUserName(storedUserName); // Set the userName from sessionStorage
    }
    setLoading(false); // Set loading to false after fetching the username
  }, []); // Empty dependency array ensures this only runs on mount

  return (
    <div className='bgColorHome'>
      {showAlert && (
        <Alert variant="success" onClose={handleClose} dismissible>
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your item has been added to the wishlist.</p>
        </Alert>
      )}

      <div className="cards-container">
        {products.map((product, index) => (
          <div key={index} className="card">
            <div className="heart-icon-wrapper">
              <div
                style={{
                  display: 'inline-block',
                  padding: '0px 5px',
                  cursor: 'pointer',
                }}
                onClick={handleHeartClick}
              >
                <FaHeart
                  size={14}
                  color={isLiked ? 'red' : 'grey'}
                  style={{
                    transition: 'color 0.3s ease',
                  }}
                />
              </div>
            </div>
            <img src={product.image} alt={product.title} className="card-image" />
            <div className="card-content">
              <div className="card-header">
                <h3 className="card-title">{product.title}</h3>
                <h2 className="card-price">₹{product.price}</h2>
              </div>
              <div className="card-footer1">
                <p className="card-description">{product.description}</p>

                

                {loading ? (
                  <p>Loading...</p>
                ) : userName ? (
                  <button className="add-to-cart" onClick={() => takeDetails(product)}>
                    <Link className="add-to-cart1"  to='/AddToCart' >Add to Cart</Link>
                  </button>
                ) : (
                  <button className="add-to-cart" onClick={handleShow}>
                    Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Login */}
      <Modal show={showModal} centered onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLoginSuccess={handleLoginSuccess}></Login>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for OTP */}
      <Modal show={showModalOtp} centered onHide={handleCloseOtp}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OtpPage otpSuccess={handleOtp}></OtpPage>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOtp}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
