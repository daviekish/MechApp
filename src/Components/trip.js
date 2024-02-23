import "./TripStyles.css";
import TripData from "./tripData";
import IMG_04 from '../assets/IMG_07.jpg';
import IMG_05 from '../assets/IMG_09.jpg';
import IMG_06 from '../assets/IMG_02.jpg';

function trip() {
    
    return (
        <div className="trip">
            <h1>Chose a subscription</h1>
            <p>Get premium services as a User</p>
       <div className="tripcard">

    <TripData
        img={IMG_04}
        heading = "Basic Plan"
        text ="Basic Plan offers essential features to meet your needs without breaking the bank. With this plan, you'll get access to all the core functionalities of MechApp, allowing you to request mechanics and manage your jobs efficiently. While it may not include all the bells and whistles of our premium plans, the Basic Plan provides reliable service at an affordable price, making it perfect for those who prioritize functionality and value.tus risus, ."


        />

    <TripData
        img={IMG_06}
        heading = "Premium plan"
        text ="Upgrade to our Premium Plan for an enhanced MechApp experience. With this plan, you'll unlock advanced features and exclusive benefits designed to streamline your interactions with mechanics and optimize your user experience. Enjoy priority access to top-rated mechanics, faster response times, and additional support options to ensure your vehicle gets the attention it deserves"

        

        />
    <TripData
        img={IMG_05}
        heading = "Pro Plan"
        text ="Take your MechApp experience to the next level with our Pro Plan, the ultimate subscription tier for discerning users. With this plan, you'll enjoy all the features included in the Basic and Premium Plans, plus a host of exclusive perks reserved for our most dedicated members. From premium customer support and extended warranty options to special discounts and VIP access to events, the Pro Plan offers unparalleled value for those who demand nothing but the best. If you're serious about maintaining your vehicle and want access to the highest level of service and support, the Pro Plan is the perfect choice for you."
        />

       </div>
        </div>
    );

}

export default trip;