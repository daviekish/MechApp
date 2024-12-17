import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Components/AccessControlStyles.css";
import Navbar from "../Components/Navbar";
import { useState } from 'react';

const AdminRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/admin/register',{
                username,
                email,
                password,
            });
            
            if (response.data.success) {
                alert('Admin registration Succesfully');
                navigate('/admin/login')
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occured during registration');
        }
    };

    return (
        <>
        <Navbar />
            <div className="loginB">
                <div className="auth-form-container">
                    <h2>Admin Register</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="username">Full name</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} required type="text" placeholder="Full name" id="username" name="username" />
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="*******" id="password" name="password" />
                        <button type="submit" className="register-button">Register</button>
                    </form>
                    <Link to="/admin/login" className="link-btn">Already have an account? <b>Admin Login.</b></Link>
                    <Link to="/login" className= "link-btn" type="submit"> <b>User Login</b> </Link>
                </div>
            </div>
        </>
    )
}

export default AdminRegister;