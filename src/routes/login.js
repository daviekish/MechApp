import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../Components/SignUpStyles.css";
import Navbar from "../Components/Navbar";



const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    
   const handleSubmit = async (e) => 
   {
        e.preventDefault();
        
        try{
            const response = await axios.post('http://localhost:5000/login',
            {
                email,
                password: pass
            });

            if (response.data.success) {
                // Login successful
                alert('Login successful');
                // Redirect to the desired page
                navigate('/mechview');
            } else {
                // Login failed
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during login');
        }

        
        
    }

    return (
        <>
       <Navbar/>
       
       <div className="login">
       <div className="auth-form-container">
            <h2>Mechanic Login</h2>
         <form className= "login-form" onSubmit={ handleSubmit }>
            <label htmlFor="email">email</label>
            <input value={ email } onChange= {(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={ pass } onChange= {(e) => setPass(e.target.value)} type="password" placeholder=" ******* " id="password" name="password" />
            <button className="login-button" type="submit">Log in</button>

        </form>
        <Link to="/register" className= "link-btn" type="submit"> Don't have an account? Register here. </Link>
        </div>
       </div>

       
        </>
    )

};

export default Login;