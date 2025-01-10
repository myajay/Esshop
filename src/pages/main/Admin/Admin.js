import React, { useEffect, useState } from 'react';
import { FaUserShield } from 'react-icons/fa'; // Admin Icon
import './Admin.css';  // Add your CSS for styling

const AdminPage = () => {
  // State to hold the order details from sessionStorage
  const [orderDetails, setOrderDetails] = useState(null);

  // Use state to track status (whether each entry is active or not)
  const [status, setStatus] = useState(false);

  const [numMobile , MobileNum] = useState();

  const [selectedProduct , setSelectedItem] = useState();


  

  // Fetch order details from sessionStorage
  useEffect(() => {
    const orderData = JSON.parse(sessionStorage.getItem('orderDetails'));
    const numMobile = JSON.parse(sessionStorage.getItem('userMobile'));
    const selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct'));

    

    MobileNum(numMobile)
    

    // If data is found, update state
    if (orderData) {
      setOrderDetails(orderData);
      setSelectedItem(selectedProduct);

    }
  }, []);

  // Toggle status on checkbox click
  const handleStatusChange = () => {
    setStatus(prevStatus => !prevStatus);
  };

  if (!orderDetails) {
    return (
      <div className="admin-container">
        <h2>No order details found in sessionStorage.</h2>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-icon">
        <FaUserShield size={50} color="darkblue" />
        <h2>Order Details</h2>
      </div>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>City</th>
              <th>State</th>
              <th>ZIP Code</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>

              <th>Mobile No</th>
              <th>Status</th>  {/* New Status Column */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orderDetails.name}</td>
              <td>{orderDetails.address1}</td>
              <td>{orderDetails.address2}</td>
              <td>{orderDetails.city}</td>
              <td>{orderDetails.state}</td>
              <td>{orderDetails.zipcode}</td>
              <td>{selectedProduct.title}</td>
              <td>{selectedProduct.price}</td>
              <td>{selectedProduct.description}</td>


              
              <th>{numMobile}</th>

              {/* Status Column with Checkbox */}
              <td>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={handleStatusChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
