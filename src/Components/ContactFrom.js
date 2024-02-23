import "./ContactformStyles.css"

function ContactForm() {
    return( 
        <div className="form-container">
            <h1>Send Message a to us!</h1>
            <form>
                <input placeholder="Name"/>
                <input placeholder="Email"/>
                <input placeholder="Subject"/>
                <textarea placeholder="Message"  className="textarea"></textarea>
                <button>Send Message</button>
            </form>
        </div>
    )
    
    
}

export default ContactForm;