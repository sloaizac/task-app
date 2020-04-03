const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash =  require("express-flash");



//settings

app.set('port', process.env.PORT || 4000);


//middlewares

app.use(cors({
    credentials: true,
    origin:"http://localhost:3000"
}));
app.use(express.json()); 
app.use(cookieParser());
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
