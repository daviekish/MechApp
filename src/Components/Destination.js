import "./DestinationStyles.css"
import MechanicData from "./MechanicData";
import IMG_00 from '../assets/IMG_05.jpg';
import IMG_01 from '../assets/IMG_06.jpg';
import IMG_02 from '../assets/IMG_01.jpg';
import IMG_03 from '../assets/IMG_02.jpg';

const Destination = () =>{
    return(
        <div className="destinations">
            <h1>Popular Services</h1>
            <p>We give you the assuarance of safety and compitence</p>
            
           <MechanicData
           className="first-des"
           
           heading = "Request a Mechanic"
           text="Need a mechanic at your doorstep? Look no further! With MechApp, you can request a skilled 
           mechanic to fix your vehicle without leaving your home. Simply select the 'Get Services' button, fill out the form with your details
            and the issue you're facing, and we'll connect you with a qualified mechanic right away. Get back 
            on the road quickly and hassle-free with MechApp's convenient mechanic request service."

           img1={IMG_00}
           img2={IMG_01}

           
           />

        <MechanicData
        className="first-des-reverse"

           
           heading = "Become Our Mechanic"
           text=" Are you a talented mechanic looking for more job opportunities? 
           Join our team at MechApp and start getting jobs today! Becoming a MechApp
            mechanic is easy – just sign up, create your profile, and start accepting 
            service requests. With MechApp, you'll have the flexibility to choose your
             working hours and locations, giving you the freedom to work on your own terms. 
             Join MechApp's network of skilled mechanics and start earning more today!






           "

           img1={IMG_02}
           img2={IMG_03}

           
           />
           
       
        </div>
    );
};

export default Destination;