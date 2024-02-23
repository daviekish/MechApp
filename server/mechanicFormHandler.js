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

router.post('/submitform', (req, res) =>{

    const { 
      make,
      model,
      phoneNo,
      description,
    
    } = req.body;

    const sql = 'INSERT INTO submitform (make, model, phoneNo, description) VALUES (?, ?, ?, ?)';
    const values = [make, model, phoneNo ,description];


    db.query(sql, values, (error, result) => {
        if (error){
            return res.json({ success: false, message: 'Error: ' + error.message});
        }

        return res.json({ success: true, message: 'Data inserted successfully'});
    });
});
router.route('/submitform')
  .get((req, res) => {
    const sql = 'SELECT id, make, model, description FROM submitform';

    db.query(sql, (error, results) => {
      if (error) {
        return res.json({ success: false, message: 'Error: ' + error.message });
      }

      return res.json({ success: true, data: results });
    });
  })


module.exports = router;