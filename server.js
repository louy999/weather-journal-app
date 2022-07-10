// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { Route } = require("express");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Get Route
app.get("/all", (req, res) => {
  // Callback function to complete GET '/all'
  res.send(projectData);
});

// Post Route
app.post("/add", (req, res) => {
  // Callback function to complete POST '/add'
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
});
// Setup Server
const port = 8000;
// Spin up the server
app.listen(port, () => {
  // Callback to debug
  console.log(`server is running at http://127.0.0.1:${port}`);
});
