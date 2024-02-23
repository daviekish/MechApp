const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');

router.use(cors());
router.use(express.urlencoded({extended: true}));
router.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'david',
  password: 'Nakada5612.',
  database: 'mechapp',
  port: '3306',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(''),
  },
});

router.get('/submitform', (req, res) => {
  const sql = 'SELECT id, phoneNo, make, model,  description FROM submitform'; // Adjust columns as needed

  db.query(sql, (error, results) => {
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    return res.json({ success: true, data: results });
  });
});

router.delete('/mechanic/submitform/:id', (req, res) => {
  const { id } = req.params;
  console.log('Deleting record with ID:', id);
  const sql = 'DELETE FROM submitform WHERE id = ?';

  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error deleting data:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    return res.json({ success: true, message: 'Record deleted successfully' });
  });
});
module.exports = router;
