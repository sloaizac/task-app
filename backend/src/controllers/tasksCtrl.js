const db = require('../db/database')

const tasksCtrl = {};

tasksCtrl.getTasks = (req, res) => {
    let sql = "SELECT * FROM tasks WHERE tasks.project_id = " + req.params.id;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

tasksCtrl.createTask = (req, res) => {
    const { project_id, title, description } = req.body;
    let sql = "INSERT INTO tasks (project_id, title, description) VALUES (?,?,?)"
    let values = [project_id, title, description];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send("Successfully query");
    })
}

tasksCtrl.deleteTask = (req, res) => {
    const id = req.params.id;
    let sql = "DELETE FROM tasks WHERE tasks.id = " + id;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send("Successfully query");
    })
}

tasksCtrl.updateTask = (req, res) => {
    const { id, title, description, done } = req.body;
    let sql = "UPDATE tasks SET title = ? , description =  ?, done = ?  WHERE id = " + id;
    let values = [title, description, done];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send("Sucessfully query");
    })
}

module.exports = tasksCtrl;