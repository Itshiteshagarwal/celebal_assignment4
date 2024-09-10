const mysql = require('mysql2/promise');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

//connection
const pool = mysql.createPool({
  host: 'localhost',       
  user: 'root',   
  password: '', 
  database: 'study_web',
});

//get all the user
app.get('/users', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM admin');
    res.json(results);
  } catch (err) {
    console.error('Error fetching data: ', err);
    res.status(500).send('Error fetching data from the database');
  }
});

//insert a user in the table
app.post('/users', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO admin (name, email, password, role) VALUES (?, ?, ?, ?)', 
      [name, email, password, role]
    );
    res.json({ message: 'User created', id: result.insertId });
  } catch (err) {
    console.error('Error inserting data: ', err);
    res.status(500).send('Error inserting data into the database');
  }
});

//update a user from the table
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
  
    try {
      const [result] = await pool.query(
        'UPDATE admin SET name = ?, email = ?, password = ?, role = ? WHERE id = ?', 
        [name, email, password, role, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    } catch (err) {
      console.error('Error updating user: ', err);
      res.status(500).send('Error updating user in the database');
    }
  });


//delete a user from the table
  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query('DELETE FROM admin WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user: ', err);
      res.status(500).send('Error deleting user from the database');
    }
  });


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
