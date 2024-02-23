import ContactForm from "../Components/ContactFrom";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import IMG_08 from '../assets/IMG_07.jpg';
function Contact(){

    return(
        <>
         <Navbar/>
        <Hero 
        cName="hero-mid"
        heroImg={IMG_08}
        title="Contact us"
        btnClass="hide"
        />
        <ContactForm/>
        <Footer/>
        </>
    )
}
export default Contact;