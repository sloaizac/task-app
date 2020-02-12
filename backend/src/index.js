const express = require("express");
const app = express();

//db

//settings

app.set('port', process.env.PORT || 4000);

//middlewares

//global variables

//routes

//static files

//server listening

app.listen(app.get("port"), () => {
    console.log("Server on port " + app.get("port"));
});