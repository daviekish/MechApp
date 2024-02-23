import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import IMG_08 from '../assets/IMG_05.jpg';
import Trip from "../Components/trip";
function Service(){

    return(
        <>
         <Navbar/>
        <Hero 
        cName="hero-mid"
        heroImg={IMG_08}
        title="Services"
        btnClass="hide"
        />

        <Trip/>
        <Footer/>
        </>
     
    )
}
export default Service;