const cors = require("cors");
const express = require("express");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;


app.use(express.json());

// Enable CORS for React frontend (localhost:3000)
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from localhost:3000
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow listed methods
  credentials: true, // Allow credentials
  allowedHeaders: 'Content-Type,Authorization' // Allow these headers
}));

// Database configuration
const db_config = {
  server: "LAPTOP-QQFL6LU0\\SQLEXPRESS",
  database: "demo11",
  driver: "msnodesqlV8",
  options: {
    trustedConnection: true
  }
};

// Connect to the database
sql.connect(db_config)
  .then(() => {
    console.log("Connected to the database with Windows authentication");
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

  app.post('/', async (req, res) => {
    const { username, password } = req.body; // Destructure username and password from the request body
    try {
      // Query the database for the user
      const result = await sql.query`SELECT * FROM dbo.eng_users WHERE UserName = ${username}`;
      
      if (result.recordset.length === 0) {
        return res.status(401).json({ message: 'User not found' }); // Unauthorized if no user exists
      }
  
      const user = result.recordset[0]; // Retrieve the user record
  
      // Compare the input password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' }); // Unauthorized for wrong password
      }
  
      res.status(200).json({ message: 'Login successful', user: { username: user.UserName } }); // Login success
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Start server
app.listen(port, () => {
  console.log("Listening.........");
  console.log(`Server running on http://localhost:${port}`);
});
