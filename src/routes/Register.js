import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "../Components/SignUpStyles.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

const Register = () => {

    // const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [registrationType, setRegistrationType] = useState("user");
    const [make, setMake ] = useState("");
    const [model, setModel] = useState("");
    const [certificate, setCertificate] = useState(null);

    const handleSubmit = async e  => {
        e.preventDefault();

    const fromData = new URLSearchParams();
    fromData.append("username", username);
    fromData.append("email", email);
    fromData.append("password", password);
   
    // Validate registrationType
    if (!registrationType) {
        alert('Invalid registration case');
        return;
    }
    console.log(registrationType)
    fromData.append("registrationType", registrationType.toLowerCase());

    if(registrationType === "mechanic"){
        fromData.append("make", make);
        fromData.append("model", model);
        if (certificate) {
            fromData.append("certificate", certificate);
        }
    }
    
    console.log("Form Data:", fromData.toString);

    try{
        const response = await axios.post('http://localhost:5000/register', fromData, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
        });

        console.log("Response:", response.data);
        
        if (response.data.success) {
            alert('Registration successful');
            // Optionally, redirect to login or another page
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error(error);
        if (error.response) {
          
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received. Request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error during request setup:', error.message);
        }
        alert('An error occurred');
    }

    };
    
    
    return (
        <>
        <Navbar/>
        <div className="login">
        <div className="auth-form-container">
            <h2>Register</h2>
         <form className= "register-form" onSubmit={ handleSubmit }>
            <label htmlFor="username">Full name</label>
            <input value={username} onChange= {(e) => setUsername (e.target.value)} required type = "username" placeholder="Full name" id="username" name="username"/>
            
            <label htmlFor="email">email</label>
            <input value={email} onChange= {(e) => setEmail(e.target.value)} required type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            
            <label htmlFor="password">password</label>
            <input value={password} onChange= {(e) => setPassword(e.target.value)} required type="password" placeholder=" ******* " id="password" name="password" />
            {/* Mechanic Registration */}

            {registrationType === "mechanic" && (
                <>
                    <label htmlFor="make">Car Make</label>
                    <input type ="text" placeholder="Car Make" id="make" name="make" onChange={(e) => setMake(e.target.value)}/>

                    <label htmlFor="model">Car Model</label>
                    <input type="text" placeholder="Car Model" id="model" name="model" onChange={(e) => setModel(e.target.value)}/>

                    <label htmlFor="Certificate">Certificate Upload</label>
                    <input type="file" id="certificate" name="certificate" accept=".pdf, .doc, .docx" onChange={(e) => setCertificate(e.target.files[0])}/>
                </>
            )}
           
                
        
        <div>
            <button type="submit" className="link-btn" onClick={() => setRegistrationType("user")} >Register as User</button>
            <button type="submit" className="link-btn" onClick={() => setRegistrationType("mechanic")}>Resister as Mechanic
            </button>
        </div>
        <button type="submit" name="register">Register</button>
        </form>
        <Link to="/login" className= "link-btn" type="submit" > Don't have an account? Login here. </Link>
        </div>
        </div>
        </>
      
    )
};

export default Register;

