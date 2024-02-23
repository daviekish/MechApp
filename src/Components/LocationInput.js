import React, {useEffect, useState} from "react";
import "./LocationInputStyles.css";
import { useNavigate } from "react-router-dom";
import "./ServicesStyles.css"

const LocationInput = ({ onSubmit }) => {
    const [location, setLocation] = useState('');
    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const navigate = useNavigate();

    const NOMINATIM_API_ENDPOINT = 'https://nominatim.openstreetmap.org/search';
    // Function to fetch suggested locations based on the user input
    const fetchSuggestions = async (input) => {
        try {
            const response = await fetch(`${NOMINATIM_API_ENDPOINT}?q=${input}&format=json`);
            const data = await response.json();

            if (data && data.length > 0) {
                setSuggestedLocations(data.map(place => place.display_name));
            } else {
                console.error('No suggestions found');
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }

    };

    useEffect(() => {
        //Fetch initial suggestion (optional)
        fetchSuggestions('');
    }, []);

    const handleInputChange = async (e) => {

        const input = e.target.value;
        setLocation(input);

        fetchSuggestions(input);
    };
const sendLocationToBackend = async (locationData) =>{
    const { selectedLocation } = locationData;
    try{
        const response = await fetch("http://localhost:5000/location/location", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `location=${encodeURIComponent(selectedLocation)}`
        });
        const data = await response.json();
        console.log(data);

        localStorage.setItem('location', location);
    }catch(error) {
        console.error("Error sending location data:", error);
    }
};
    const handleLocationSubmit = async() => {

        //obtain current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    console.log('User Location', userLocation);

                    sendLocationToBackend({
                        selectedLocation: location,
                        userLocation: userLocation, 
                    });
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            console.error('Geolocation id not supported by this browser');
        }
        navigate('/driverstatus');
    };

    return (
        <div className="requests">
            <div className="form-container">
            <div className="location-input">
            <h2>Please enter your location</h2>
                <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={handleInputChange}
                />
                <ul className="suggestions"  >
                    {/* Display suggested locations in a dropdown */}
                    {suggestedLocations.map((suggestion) => (
                    <li key={suggestion} onClick={() => setLocation(suggestion)}>
                        {suggestion}
                    </li>
                    ))}
                </ul>
                <button onClick={handleLocationSubmit}>Submit Location</button>
                </div>
            </div>
            
        </div>
       
    );
};

export default LocationInput;