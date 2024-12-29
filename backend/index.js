const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoDB = require('./db');
const port = 5000;


// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,              // Allow cookies and credentials
}));

const _dirname = path.resolve();
// Middleware to parse incoming JSON
app.use(express.json());

// Basic route
// app.get('/', (req, res) => {
//     res.send("Hello World!!");
// });

// Register routes with more explicit paths
app.use('/api/', require("./Routes/CreateUser"));
app.use('/api/', require("./Routes/DisplayData"));
app.use('/api/', require("./Routes/OrderData"));

// Call the function to connect to MongoDB
mongoDB().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});
app.use(express.static(path.join(_dirname, '/frontend/build')));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'));
});
