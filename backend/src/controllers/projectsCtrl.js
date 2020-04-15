const db = require("../db/database");

const projectsCtrl = {};

projectsCtrl.getProjects = (req, res) => {

    let sql = "SELECT * FROM projects WHERE user_id = ?";
    values = [req.user]
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

projectsCtrl.createProject = (req, res) => {
    try {
        const { user_id, title, description } = req.body;
        let sql = "INSERT INTO projects (user_id, title, description) VALUES (?, ?, ?)";
        let values = [user_id, title, description];
        db.query(sql, values, (err, result) => {
            if (err) {
                throw err;
            }
            res.send("Successfully query");
        })
    }
    catch (e) {
        res.json({ message: e });
    }
}

projectsCtrl.updateProject = (req, res) => {
    const { id, title, description } = req.body
    let sql = "UPDATE projects SET title = ?, description= ? WHERE id = " + id;
    let values = [title, description];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

projectsCtrl.deleteProject = (req, res) => {
    const id = req.params.id
    let sql = "DELETE FROM tasks WHERE tasks.project_id =" + id;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        let sql2 = "DELETE FROM projects WHERE projects.id = " + id;
        db.query(sql2, (err, result) => {
            if (err) {
                throw err;
            }
        })
        res.send("Successfuly query");
    })
}



projectsCtrl.getProject = (req, res) => {
    let project = {
        id: "",
        title: "",
        description: "",
        tasks: ""
    }

    const id = req.params.id
    let sql = "SELECT * FROM projects WHERE id = " + id;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        let string = JSON.stringify(result);
        let json = JSON.parse(string);
        project.id = json[0].id;
        project.title = json[0].title;
        project.description = json[0].description;

        let sql_task = "SELECT * FROM tasks WHERE tasks.project_id = " + project.id;
        db.query(sql_task, (err, result) => {
            if (err) {
                throw err;
            }
            let string = JSON.stringify(result);
            let json = JSON.parse(string);
            project.tasks = json;
            res.json(project);
        })

    })



}


module.exports = projectsCtrl;