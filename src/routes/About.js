import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import IMG_08 from '../assets/IMG_04.jpg';
import AboutUs from "../Components/AboutUs";

function About(){

    return(
        <>
         <Navbar/>
        <Hero 
        cName="hero-mid"
        heroImg={IMG_08}
        title="Your Vehicle Our Problem"
        
        btnClass="hide"
        />
        <AboutUs/>
        <Footer/>
        </>
    )
}
export default About;