import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Destination from "../Components/Destination";
import IMG_08 from '../assets/IMG_06.jpg';
import Trip from "../Components/trip";
import Footer from "../Components/Footer";



function Home(){

    return(
        <>
        <Navbar/>
        <Hero 
        cName="hero"
        heroImg={IMG_08}
        title="Your Car crisis manager"
        text="Get trusted Services"
        buttonText="Get Services"
        url=""
        btnClass="show"
        />
        <Destination/>
        <Trip/>
        <Footer/>
       
        </>
    )
}
export default Home;