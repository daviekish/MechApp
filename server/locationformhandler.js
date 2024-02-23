const express = require("express");
const mysql = require('mysql2');
const cors = require('cors')
const router = express.Router();

router.use(cors());
router.use(express.urlencoded({extended: true}));
router.use(express.json());

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

router.post('/location', (req, res) =>{

    const { 
      location,
      
    
    } = req.body;

    const sql = 'INSERT INTO location (location) VALUES (?)';
    db.execute(sql, [location], (error, result) => {
        if (error){
            return res.status(500).json({ success: false, message: 'Error: ' + error.message});
        }

        return res.status(201).json({ success: true, message: 'Data inserted successfully'});
    });
});
router.get('/location', (req, res) => {
    const sql = 'SELECT location FROM location';

    db.query(sql, (error, results) => {
      if (error) {
        return res.json({ success: false, message: 'Error: ' + error.message });
      }

      return res.json({ success: true, data: results });
    });
  })


module.exports = router;