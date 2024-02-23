const express = require("express");
const mysql = require('mysql2');
const cors = require('cors')
const mechanicFormHandler = require('./mechanicFormHandler');
const locationformhandler = require('./locationformhandler');
const fetchRequests = require('./fetchRequests');
const app = express();
const port = 5000;


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const db = mysql.createConnection({

    host:"localhost",
    user:"david",
    password:"Nakada5612.",
    database:"mechapp",
    port: "3306",
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from(''),
    },
    });

    db.connect(err => {
        if (err) throw err;
        console.log('Connected to MySQL database!');
    });

    app.use((req, res, next) => {
        console.log(req.method, req.url);
        next();
    });

app.post('/register', (req, res) =>{

    const { 
        username, 
        email, 
        password,
        registrationType,
        make,
        model,
        certificate,
    
    } = req.body;
const hashedPasssword = password;
console.log('Request Body:', req.body);
console.log(registrationType)
let sql;
let values;
const lowerCaseRegistrationType = registrationType;

if (registrationType.toLowerCase() === 'user'){
    sql ='INSERT INTO userregister(username, email, password, registrationType) VALUES (?,?,?,?)';
    values = [username, email, hashedPasssword, registrationType];
} else if(registrationType.toLowerCase() === 'mechanic') {
    sql='INSERT INTO mechanicregister(username, email, password, registrationType, make, model, certificate) VALUES (?,?,?,?,?,?,?)'
    values = [username, email, hashedPasssword,registrationType, make, model, certificate];
} else {
    return res.json({ success: false, message: 'Invalid registration type' });
}

    db.query(sql, values, (error, result) => {
        if (error){
            return res.json({ success: false, message: 'Error: ' + error.message});
        }

        return res.json({ success: true, message: 'User registered successfully'});
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM userregister WHERE email = ? AND password = ?', [email, password], (error, result) => {
        if (error) {
            return res.json({ success:false, message: 'Error: ' + error.message});
        }

        if (result.length > 0) {

            return res.json({ success: true, message: 'Login successful' });
        }else {
            return res.json({ success:false, message : 'Invalid email or password'})
        }
    });
});
app.use('/mechanic', mechanicFormHandler);
app.use('/location', locationformhandler);
app.use("/mechanic/submitform", fetchRequests)
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
