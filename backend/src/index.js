const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const flash =  require("express-flash");
const passport = require("passport");
const FileStore = require('session-file-store')(session);
require("./passport/passport");


//settings

app.set('port', process.env.PORT || 4000);


//middlewares

app.use(cors());
app.use(express.json()); 
app.use(session({
    store: new FileStore,
    secret: "secretapp4532",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables 

//routes 


 
app.use(require('./routes/index'));
app.use('/projects', require('./routes/projects'));
app.use('/tasks', require('./routes/tasks'));
app.use('/notes', require('./routes/notes'));
app.use('/events', require('./routes/events'));

//static files  

//server listening

app.listen(app.get("port"), () => {
    console.log("Server on port " + app.get("port"));
});
