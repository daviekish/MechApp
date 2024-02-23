import IMG_12 from '../assets/IMG_12.jpg';
import IMG_11 from '../assets/IMG_11.jpg';
import React, { useState, useEffect } from 'react';
import "./MechStatus.css"
import Navbar from './Navbar';

const MechStatus = ({ requestedData }) => {
  const [timer, setTimer] = useState(2400); // 2400 seconds = 40 minutes
  const [requestAccepted, setRequestAccepted] = useState(false);
  const [carMake] = useState(localStorage.getItem('location') || '');
  const [phoneNo] = useState(localStorage.getItem('phoneNo') || '');

  useEffect(() => {
    let interval;

    if(requestAccepted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [requestAccepted]);
  
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
          {requestedData && (
            <div className="RequestDetails">
              <h3>Request Details</h3>
              <ul>
                <li><strong>ID:</strong> {requestedData.id}</li>
                <li><strong>User:</strong> {requestedData.user}</li>
                <li><strong>Make:</strong> {requestedData.make}</li>
                <li><strong>Model:</strong> {requestedData.model}</li>
                <li><strong>Description:</strong> {requestedData.description}</li>
                <li><strong>location :</strong> {carMake}</li>
                <li><strong>phone No :</strong> {phoneNo}</li>
              </ul>
            </div>
          )}


        </div>
        <div className="Main">
          <img alt="display" src={IMG_12}></img>
        </div>
      </div>
    </>
  );
};

export default MechStatus;