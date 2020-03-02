// Import libraries
const express = require('express'); // Router
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');

// Break into 3 file. Don't write all in server.js
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Create an instance of express. Instanciate express. Whole express memory.
const app = express();

// Body parser middleware(fuction/configuration). parse body of html and create json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config. Read the config file and pass it to mongoose
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db)
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.log(err));

// Write the first route
// When user comes to the homepage "/"
app.get("/", (req, res) => res.send("Hello! World!"));

// Routing. When you see 'api/users' then take them to users. 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Write port
const port = 8020;
app.listen(port, () => console.log(`Server running on port${port}`));

