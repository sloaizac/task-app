const db = require('../db/database')

const tasksCtrl = {};

tasksCtrl.getTasks = async (req, res) => {
    let sql = "SELECT * FROM tasks WHERE tasks.project_id = " + req.params.id;
    await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

tasksCtrl.createTask = async (req, res) => {
    const {project_id, title, description} = req.body;
    let sql = "INSERT INTO tasks (project_id, title, description) VALUES (?,?,?)"
    let values = [project_id, title, description];
    await db.query(sql, values,(err, result) => {
        if (err) {
            throw err;
        }
        res.send("Successfully query");
    })
}

tasksCtrl.deleteTask = async (req, res) => {
    const id = req.params.id;
    let sql = "DELETE FROM tasks WHERE tasks.id = " + id;
    await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send("Successfully query");
    })
}

module.exports = tasksCtrl;