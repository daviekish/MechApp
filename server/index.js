const express = require("express");
const mysql = require('mysql2');
const cors = require('cors')
const bcrypt = require('bcrypt');
const path = require ('path')
const WebSocket = require('ws');


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

//Admin registration route
app.post('/admin/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // hashed password


    const sql = 'INSERT INTO admin(username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hashedPassword];

    db.query(sql, values, (error, result) => {
        if(error) {
            return res.json({ success: false, message: 'Error: ' + error.message});

        }
        return res.json({ success: true, message: 'Admin registred successfuly' });
    });
    
});

// Admin login route
app.post('/admin/login', (req, res) =>{
    const { email, password } = req.body;

    db.query('SELECT * FROM admin WHERE email = ?',[email], async (error, result) => {
        if (error) {
            return res.json({ success: false, message: 'Error: ' + error.message });
        }

        if (result.length > 0) {
            const admin = result[0]
            const match = await bcrypt.compare(password, admin.password )

            if (match) {
                return res.json({ success: true, message: 'Login succesful'});
            } else {
                return res.json({ success: false, message: 'Invalid email or password'});
            }
        } else {
            return res.json ({ success:false, message: 'Invalid email or password' });
        }
    })
} )

// user register
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
//User login

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

//Admin task list
app.get('/admin/mechanic-registrations', (req, res) => {
    db.query('SELECT * FROM mechanicregister WHERE status = "pending"', (error, results) => {
        if (error) {
            return res.json({success: false, message: 'Error: ' + error.message});
        }

        return res.json({ success: true, mechanics: results });
    });
});

// Accept Mechanic Registration
app.post('/admin/approve-mechanic', (req, res) => {
    const { id } = req.body;
    db.query('UPDATE mechanicregister SET status = "approved" WHERE id' , [id], (error, result) => {
        if (error) {
            return res.json({success: false, message: 'Error: ' + error.message });
        } 

        return res.json({ success: true, message:'Mechanic approved successfuly' });
    });
});

// Decline Mechanic Registration
app.post('/admin/decline-mechanic', (req, res) => {
    const { id } = req.body;
    db.query('UPDATE mechanicregister SET status = "declined" WHERE id = ?' , [id], (error, result) =>{
        if (error) {
            return res.json({success: false, message: 'Error: ' + error.message });
        } 

        return res.json({ success: true, message:'Mechanic declined successfuly' });
    });
});


//Download Certificate
app.get('/admin/download-certificate/:id', (req,res) => {
    const { id } = req.params;
    db.query('SELECT certificate FROM mechanicregister WHERE id = ?', [id], (error, result) => {
        if (error || result.length === 0) {
            return res.status(404).json({ success: false, message: 'Certificate not found'});
        }

        const certificatePath = path.join(__dirname, 'uploads', result[0].certificate);
        res.download(certificatePath);
            
        });
    });

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'locationUpdate') {
            const { mechanicId, latitude, longitude } = parsedMessage;

            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ mechanicId, latitude, longitude }));
        }
    });
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Endpoint to update mechanic's location
app.post('/update-location', (req, res) => {
    const { mechanicId, latitude, longitude } = req.body;
    // Update the location in the database if needed
    const sql = 'UPDATE mechanicregister SET latitude = ?, longitude = ? WHERE id = ?';
    db.query(sql, [latitude, longitude, mechanicId], (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error: ' + error.message });
        }
        // Broadcast the location update to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ mechanicId, latitude, longitude }));
            }
        });
        res.json({ success: true, message: 'Location updated successfully' });
    });
});


app.use('/mechanic', mechanicFormHandler);
app.use('/location', locationformhandler);
app.use("/mechanic/submitform", fetchRequests)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});


