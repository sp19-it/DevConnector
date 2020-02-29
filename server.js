// Import libraries
const express = require("express");
const mongoose = require("mongoose");

// Create an instance of express. Instanciate express
const app = express();

// DB config. Read the config file and pass it to mongoose
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
.connect(db)
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.log(err));

// Write the first route
// When user comes to the homepage "/"
app.get("/", (req, res) => res.send("Hello! World!"));

// Write port
const port = 8020;
app.listen(port, () => console.log(`Server running on port${port}`));

