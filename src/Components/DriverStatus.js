import React, { useState, useEffect } from 'react';
import "./MechStatus.css"
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import IMG_12 from '../assets/IMG_12.jpg';
import IMG_11 from '../assets/IMG_11.jpg';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
//import FlutterwavePayment from './FlutterwavePayment';
//import PayPalPayment from './PayPalPayment';
//import MpesaPayment from './MpesaPayment'

const containerStyle = {
  width: '100%',
  height: '400px'
};

const DriverStatus = ({ requestedData }) => {
  const [timer, setTimer] = useState(2400); // 2400 seconds = 40 minutes
  const [requestAccepted, setRequestAccepted] = useState(false);
  //const [paymentMethod, setPaymentMethod] = useState('');
  const [mechanicLocation, setMechanicLocation] = useState({ lat: null, long: null});
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyANHPdgAwHCbmYQtsG5PuuEP59pS6eYvQc'
  });

  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    if(requestAccepted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [requestAccepted]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessge = (event) => {
      const locationData = JSON.parse(event.data);
      setMechanicLocation({lat: locationData.latitude, lng:locationData.longitude });

    };

    return () => ws.close();
    }, []);

  const [carMake] = useState(localStorage.getItem('carMake') || '');
  const [yearOfManufacture] = useState(localStorage.getItem('yearOfManufacture') || '');
  const [description] = useState(localStorage.getItem('description') || '');
  
  const handleCancel = () => {
    navigate('/');
  };

  /*const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  }*/

  return (
    <>
      <Navbar/>
      <div className="MechStatus">
        <div className="form-container">
          <h2>Mechanic is on the way!</h2>
          <p>Estimated time of arrival: {Math.floor(timer / 60)} minutes</p>
          <div className="ProfilePhoto">
            <img alt="Profilephoto" src={IMG_11}></img>
          </div>
          
          {carMake && (
             <div className="CarDetails">
                <h3>Car Details</h3>
                    <ul>
                        <li><strong>Make:</strong> {carMake}</li>
                        <li><strong>Year of Manufacture:</strong> {yearOfManufacture}</li>
                        <li><strong>Description:</strong> {description}</li>
                    </ul>
                </div>
            )}
            <button onClick={handleCancel} className="decline-button">Cancel</button>
            
        </div>
        <div className="Main">
          <img alt="display" src={IMG_12}></img>
        </div>
        {isLoaded && mechanicLocation.lat && mechanicLocation.lng && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mechanicLocation}
            zoom={14}
          >
            <Marker position={mechanicLocation} />
          </GoogleMap>
        )}
      </div>
    </>
  );
};

export default DriverStatus;

/* <h3>Select Payment Method</h3>
<div className="payment-options">
<button onClick={() => handlePaymentMethodChange('flutterwave')}>Pay with Card/M-pesa</button>
<button onClick={() => handlePaymentMethodChange('paypal')}>Pay with PayPal</button>
</div>
<div className="payment-container">
{paymentMethod === 'flutterwave' && <FlutterwavePayment />}
{paymentMethod === 'paypal' && <PayPalPayment />}
</div>*/