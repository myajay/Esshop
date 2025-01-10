import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope , FaUserPlus } from 'react-icons/fa';
// import GB from '../../../assets/GB.jpg';
// import GB from '../../../assets/ES.jpg';
// import GB from '../../../assets/app-store.png';
import GB from '../../../assets/online-shop.png';



import { Modal } from 'react-bootstrap';
import Login from '../../main/Login/Login';
import OtpPage from '../../main/Login/Otp';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  // Check if the screen size is mobile (small)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [userName, setUserName] = useState('');

  // This useEffect will run only once when the component mounts
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);  // Set the userName from sessionStorage
    }

    // You can optionally listen for sessionStorage changes with a timeout or interval
    const intervalId = setInterval(() => {
      const updatedUserName = sessionStorage.getItem('userName');
      if (updatedUserName && updatedUserName !== userName) {
        setUserName(updatedUserName); // Update state if it changes
      }
    }, 1000); // Check every second

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [userName]); // We check userName to see if it's changed


    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);
    const [showModalOtp, setShowModalOtp] = useState(false);


    // Function to handle opening the modal
    const handleShow = () => setShowModal(true);
    const handleShowOtp = () => setShowModalOtp(true);

  
    // Function to handle closing the modal
    const handleClose1 = () => setShowModal(false);
    const handleCloseOtp = () => setShowModalOtp(false);

    function handleLoginSuccess(){
      handleClose1();
      handleShowOtp();
    }

    const handleOtp =()=>{
      handleCloseOtp();
    }


  return (
    <div>

 
    <AppBar position="sticky" sx={{ backgroundColor: '#36739e' }}> {/* Light Green Color */}
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          {/* Left Side - Logo */}
          <Box sx={{ flexShrink: 0 }}>
          <Link to='/Home'  style={{ color: 'white', textDecoration: 'none' }}>

            <img src={GB} alt="Logo" className='white-image' style={{ width: '100px', height: '50px' ,backgroundColor:'#cadeed',border:'2px solid #cadeed',borderRadius:'20px 0px 20px 0px',boxShadow:'2px 2px 8px rgba(0, 0, 0, 0.2)' }} />
            </Link>
          </Box>

          {/* Right Side - User Info & Contact */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="menu"
                edge="end"
                onClick={handleMenuClick}
                sx={{ display: { md: 'none' } }} // Hide on desktop
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Button color="inherit" className="txtTrans" onClick={handleShow}>
                {/* Check if userName exists in sessionStorage */}
                {userName ? (
                  // If userName exists, show the user's name instead of Login
                  <span style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', fontSize: '1rem' }}>
                    Hi, {userName}
                  </span>
                ) : (
                  // If userName does not exist, show Login button
                  <Link  style={{ color: 'white', textDecoration: 'none' }}>
                   
                    <FaUser /> Login
                    
                  </Link>
                )}
              </Button>

              <Button color="inherit">
                <Link to='/contact'  style={{ color: 'white', textDecoration: 'none' }}>
                <FaEnvelope style={{ padding: '1px' }} /> Contact
                </Link>
              </Button>
              <Button color="inherit">
              <Link to='/admin'  style={{ color: 'white', textDecoration: 'none' }}>
                <FaUserPlus style={{ padding: '1px' }} /> Admin
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>

      {/* Mobile Menu Dropdown */}
      {isMobile && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link  style={{ color: 'black', textDecoration: 'none' }}>
              <FaUser /> 
              {userName ? (
                <span style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Cambria', fontSize: '1rem' }}>
                  Hi, {userName}
                </span>
              ) : (
                <span onClick={handleShow}>Login</span>
              )}
            </Link>
          </MenuItem>
          <MenuItem >
          <Link to='/contact'  style={{ color: 'black', textDecoration: 'none' }}>

            <FaEnvelope /> Contact

            </Link>
          </MenuItem>
          <MenuItem >
          <Link to='/admin'  style={{ color: 'black', textDecoration: 'none' }}>
          
            <FaUserPlus /> Admin

            </Link>
          </MenuItem>
        </Menu>
      )}
    </AppBar>



    <div>
   

      {/* Modal */}
      <Modal show={showModal} centered onHide={handleClose1}   >
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


      <Modal show={showModalOtp} centered onHide={handleCloseOtp}  >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <OtpPage otpSuccess ={handleOtp}></OtpPage>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOtp}>
            Close
          </Button>
       
        </Modal.Footer>
      </Modal>
    </div>


</div>




  );
};

export default Header;
