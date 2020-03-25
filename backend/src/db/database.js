const mysql = require("mysql");

const db = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "database": "taskapp"
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("connected!");
})


module.exports = db;