const express = require('express');
const app = express();
const cors = require('cors');
const mongoDB = require('./db');
const port = 5000;

// Use CORS middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept"
}));

// Middleware to parse incoming JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send("Hello World!!");
});

// Register routes with more explicit paths
app.use('/api/', require("./Routes/CreateUser"));
app.use('/api/', require("./Routes/DisplayData"));

// Call the function to connect to MongoDB
mongoDB().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});
