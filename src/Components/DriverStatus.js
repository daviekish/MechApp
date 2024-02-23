import IMG_12 from '../assets/IMG_12.jpg';
import IMG_11 from '../assets/IMG_11.jpg';
import React, { useState, useEffect } from 'react';
import "./MechStatus.css"
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const DriverStatus = ({ requestedData }) => {
  const [timer, setTimer] = useState(2400); // 2400 seconds = 40 minutes
  const [requestAccepted, setRequestAccepted] = useState(false);
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

  const [carMake] = useState(localStorage.getItem('carMake') || '');
  const [yearOfManufacture] = useState(localStorage.getItem('yearOfManufacture') || '');
  const [description] = useState(localStorage.getItem('description') || '');
  
  const handleCancel = () => {
    navigate('/');
  };
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
      </div>
    </>
  );
};

export default DriverStatus;