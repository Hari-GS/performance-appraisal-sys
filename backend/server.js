const cors = require("cors");
const express = require("express");
const sql = require("mssql/msnodesqlv8");

const app = express();
const port = 5000;

app.use(express.json());

// Enable CORS for your React frontend (localhost:3000)
app.use(cors({
  origin: '*', // Allow requests from localhost:3000
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow the listed methods
  credentials: true, // Allow credentials to be sent
  allowedHeaders: 'Content-Type,Authorization' // Allow these headers
}));

const db_config = {
  server: "DESKTOP-UVC16VL\\MSSQLSERVER02",
  database: "Eng360server",
  driver: "msnodesqlV8",
  options: {
    trustedConnection: true
  }
};

sql.connect(db_config)
  .then(() => {
    console.log("Connected to the database with Windows authentication");
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });


// Login route
app.post('/api/auth', async (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const result = await sql.query`SELECT * FROM eng_users WHERE UserName = ${UserName}`;

    if (result.recordset.length === 0) {
      return response.status(404).json({ message: 'User not found' });
    }

    const user = result.recordset[0];

    if (user.password !== password) {
      return response.status(401).json({ message: 'Invalid password' });
    }

    response.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error:', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
