import React, {useState, forwardRef} from "react";
import LocationInput from "./LocationInput";
import IMG_10 from '../assets/IMG_10.jpg';
import "./ServicesStyles.css"


const CarModal =  forwardRef(({ isOpen, onClose, onSubmit }, ref) => {
    const [carMake, setCarMake] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [yearOfManufacture, setYearOfManufacture] = useState('');
    const [description, setDescription] = useState('');

    const [showLocationInput, setShowLocationInput] = useState(false);
    const handleSubmit = async () =>{
        // Fetch API to send data to the PHP script
        try{
            const response =  await fetch('http://localhost:5000/mechanic/submitform', {
                method:"POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `make=${encodeURIComponent(carMake)}&model=${encodeURIComponent(yearOfManufacture)}&phoneNo=${encodeURIComponent(phoneNo)}&description=${encodeURIComponent(description)}`,
            
            });
            const data = await response.text();
            console.log(data);

            if (data === 'Data inserted successfully'){

                console.log('Data inserted successfully');

                localStorage.setItem('carMake', carMake);
                localStorage.setItem('phoneNo', phoneNo);
                localStorage.setItem('yearOfManufacture', yearOfManufacture);
                localStorage.setItem('description', description);

                console.log('Stored carMake:', localStorage.getItem('carMake'));
                console.log('Stored yearOfManufacture:', localStorage.getItem('yearOfManufacture'));
                console.log('Stored description:', localStorage.getItem('description'));
            }else{
                console.error("Error:", data);

                setShowLocationInput(true);
                localStorage.setItem('carMake', carMake);
                localStorage.setItem('yearOfManufacture', yearOfManufacture);
                localStorage.setItem('description', description);

                console.log('Stored carMake:', localStorage.getItem('carMake'));
                console.log('Stored yearOfManufacture:', localStorage.getItem('yearOfManufacture'));
                console.log('Stored description:', localStorage.getItem('description'));
            }
        } catch (error) {
                console.error("Error:", error);

                setShowLocationInput(true);
            };
         };
          const handleLocationSubmit = (location) => {
            console.log('Selected Location', location);

            setShowLocationInput(false);
            onClose();
        }

    return isOpen ? (
        <div ref={ref} className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="requests" >
            <div className="form-container">
                <span className="close" onClick={onClose}>&times;</span>
                {!showLocationInput ? (
                <>
                    <h2>Fill the form to get a mechanic ASAP!</h2>
                    <form>
                       
                        <input placeholder="Make and model" type="text" id="carMake" value={carMake} onChange={(e) => setCarMake(e.target.value)}/>
                        
                        <input placeholder="Year of manufacture" type="text" id="yearOfManufacture" value={yearOfManufacture} onChange={(e) => setYearOfManufacture(e.target.value)}/>
                        
                        <input placeholder="Phone Number" type="text" id="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>

                        <textarea placeholder="Short desciption of issue" type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    
                        <button onClick={(e) => {e.preventDefault(); handleSubmit();}}>Request mechanic</button>
                    
                    </form>
                </>
                ) : (
                <LocationInput onSubmit={handleLocationSubmit} />)}
            </div>
            <div className="req-image">
                <img alt="request" src={IMG_10}></img>
            </div>

             
       
        </div>
        </div>
    ) : null;

});

export default CarModal;
