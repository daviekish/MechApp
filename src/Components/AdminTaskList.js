import axios from "axios";
import { useState ,useEffect } from "react";
import Navbar from "./Navbar";
import IMG_08 from '../assets/IMG_05.jpg';
import "../Components/AdminTaskListStyles.css";
import Hero from "./Hero";

const AdminTaskList = () => {
    const [mechanics, setMechanics] = useState([]);


    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/mechanic-registrations');
                if (response.data.success) {
                    setMechanics(response.data.mechanics);
                }
            } catch (error) {
                console.error('Error fetching mechanic registrations:', error)
            }
        };

        fetchMechanics();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await axios.post('http://localhost:5000/admin/approve-mechanic',{ id });
            if (response.data.success) {
                setMechanics(mechanics.filter(mechanic => mechanic.id !== id));
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error approving mechanic:', error)
        }
    };

    const handleDecline = async (id) => {
        try {
            const response = await axios.post('http://localhost:5000/admin/decline-mechanic', { id });
            if (response.data.success) {
                setMechanics(mechanics.filter(mechanic => mechanic.id !== id));
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error declining mechanic:', error);
        }
    };

    const handleDownloadCertificate = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/download-certificate/${id}` , {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `certificate_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading certificate', error)
        }
    };
    return (<>
    <Navbar/>
    <Hero 
        cName="hero-mid"
        heroImg={IMG_08}
        title="Admin Portal"
        btnClass="hide"
        />
        <div className="MechList"> 
            <h2>Mechanic Register List</h2>
            <br></br>
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Certificate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mechanics.map(mechanic => (
                        <tr key={mechanic.id}>
                            <td>{mechanic.username}</td>
                            <td>{mechanic.email}</td>
                            <td>{mechanic.make}</td>
                            <td>{mechanic.model}</td>
                            <td>
                                <button onClick={() => handleDownloadCertificate(mechanic.id)}>Download Certificate</button>
                            </td>
                            <td>
                                <button onClick={() => handleApprove(mechanic.id)}>Approve</button>
                                <button onClick={() => handleDecline(mechanic.id)}>Decline</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
        
    )
}
export default AdminTaskList;