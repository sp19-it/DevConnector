// import libraries
const express = require('express'); // router
const mongoose = require('mongoose'); // talks to MongoDB
const bodyParser = require('body-parser'); //parses html to json

// break into 3 js files. don't write all in server.js
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');

// create an instance of express. instanciate express. loading the whole express in memory
const app = express();

// body parser middleware(fuction/configuration). parse body of html and create json with only data that is needed
app.use(bodyParser.urlencoded({ extended: false })); // encodes special characters
app.use(bodyParser.json());

// DB config. read the config file and pass it to mongoose
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
.connect(db)
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.log(err));

// Passport middleware. 
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// write the first route
// when user comes to the homepage "/"
app.get("/", (req, res) => res.send("Hello! World!"));

// routing. when you see 'api/users' then take them to users. 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// write port
const port = 8020;
app.listen(port, () => console.log(`Server running on port${port}`));

