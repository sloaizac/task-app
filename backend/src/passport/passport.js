const passport =  require("passport");
const LocalStrategy =  require("passport-local").Strategy;
const db = require("../db/database");

/*/Defino la estrategia a utilizar y los datos que voy a recibir, y paso como parametro la 
funcion que voy a utilizar para buscar las credenciales*/
passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
}, async (username, password, done) => {
 

    
    let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    let values = [username, password]
    await db.query(sql, values, (err, result) => {
        if(err){
            throw err;
        } 
        const user = result[0];       
        if(!user){
            return done(null, false, {message: "User or password incorrect"})
        }
        return done(null, user);
    })
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) =>{
    let sql = "SELECT * FROM users WHERE id = ?";
    let values = [id]
    await db.query(sql, values, (err, result) => {
        done(err, result)
    })
});