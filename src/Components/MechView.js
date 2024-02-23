import "./MechViewStyles.css"
import "./DestinationStyles.css"
import MechanicData from "./MechanicData"
import IMG_00 from '../assets/IMG_05.jpg';
import IMG_01 from '../assets/IMG_06.jpg';
import IMG_08 from '../assets/IMG_04.jpg';
import Navbar from "./Navbar";
import Table from "./Tables";
import React, { useEffect, useState } from "react";
import Mechviewdata from "./mechviewdata";
import axios from "axios";
import MechStatus from "./MechStatus";

const MechView = () =>{

    const [visibilityActivated, setVisibilityActivated ] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timer, setTimer] = useState(0);
    const [ selectedData, setSelectedData] = useState(null);
    const fetchData = async () => {
        try{
            setLoading(true);
            const response = await axios.get('http://localhost:5000/mechanic/submitform')

            if (response.data.success) {
                setTableData(response.data.data);
            }else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
       

        if (visibilityActivated) {
            fetchData();      
        }
    }, [visibilityActivated]);


useEffect(() => {
    let timerInterval;
    if (timer > 0) {
        timerInterval = setInterval(() => {
            setTimer((prevTimer) => prevTimer -1);
        }, 1000);
    } 

    return () => {
        clearInterval(timerInterval)
    };
}, [timer]);

    const handleAccept = async (row) => {
        console.log(`Accepted record with id: ${row.id}`);
        console.log('Accepting record:', row);
        console.log("Data:", row);
        setSelectedData(row);
        setTimer(2400);
        handleRequestAccept(true);
    }

    const handleDecline = (id) => {
        console.log(`Declined record with id: ${id}`)
    }

    const handleActivateVisibility = () => {
        setVisibilityActivated(true);

    };

    const handleDeactivateVisibility = () => {
        setVisibilityActivated(false);
        window.location.reload();
      };
    const handleRequestAccept = () => {
        
      }
    return(
        <>
        <Navbar/>
        <Mechviewdata
        cName="hero"
        heroImg={IMG_08}
        title="Your Car crisis manager"
        text="Get trusted Services"
        buttonText={visibilityActivated ? "Deactivate Visibility" : "Activate Visibility"}
        onClick={visibilityActivated ? handleDeactivateVisibility : handleActivateVisibility}
        url=""
        btnClass={`show ${visibilityActivated ? "activated" : ""}`}
        />
        
        <div className="destinations">
            <h1>Mechanic dashboard</h1>
            <p>We give you the assuarance of safety and compitence</p>
            
           <MechanicData
           className="first-des"
           
           heading = "Request a Mechanic"
           text=" Welcome to your dashboard where you can accept or pick your desried jobs as you would wish.
           Be sure to consider your location and the distance that it might take to get there."

           img1={IMG_00}
           img2={IMG_01}

           
           />

        {visibilityActivated && (
             <Table 
                data={tableData}
                handleAccept={handleAccept}
                handleDecline={handleDecline}
         />)}
        {selectedData &&(
        <MechStatus 
            requestedData = {selectedData}
             id = {selectedData.id}
             user = {selectedData.user}
             phoneNo= {selectedData.phoneNo}
             make= {selectedData.make}
             model = {selectedData.model}
             description={selectedData.description}
         />
        )};
         

         </div> 
        </>
        
    )
}

export default MechView;