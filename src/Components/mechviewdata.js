
import "./DestinationStyles.css"
import "./HeroStyles.css";
function Mechviewdata (props) {
    return(
        <>
        <div className={props.cName}>
         <img alt="HeroImg" src={props.heroImg}/>
 
         <div className="hero-text">
             <h1>{props.title}</h1>
             <p>{props.text}</p>
             <button onClick={props.onClick} className={props.btnClass}>
            {props.buttonText}
          </button>
         </div>
 
        </div>
        </>
     );
 };



export default Mechviewdata;