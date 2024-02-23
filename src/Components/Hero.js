import React, {useState, useRef} from 'react';
import CarModal from "./CarModal";
import "./HeroStyles.css";

function Hero(props) {
const [isModalOpen, setIsModalOpen] = useState(false);
const modalRef = useRef(null);

const openModal = () => {
    console.log('Button clicked!');
    setIsModalOpen(true);}
const closeModal = () => setIsModalOpen(false);

if (modalRef.current) {
    modalRef.current.scrollIntoView({ behavior: 'smooth' });
}

const handleSubmit = (make, year) => {
        console.log(make, year);
        closeModal();
    }

    return(
       <>
       <div className={props.cName}>
        <img alt="HeroImg" src={props.heroImg}/>

        <div className="hero-text">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <a href={props.url} className= 
            {props.btnClass} onClick={ (e) => {e.preventDefault(); openModal();}}> 
            {props.buttonText}
            </a>
        </div>

       </div>
       <CarModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
       </>
    );
}
export default Hero;