const db = require("../db/database");

const projectsCtrl = {};

projectsCtrl.getProjects = async (req, res) => {

    let sql = "SELECT * FROM projects WHERE user_id = ?";
    values = [1]
    await db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    }) 
}

projectsCtrl.createProject = async (req, res) => {
    try {
        const {title, description} = req.body;
        let sql = "INSERT INTO projects (user_id, title, description) VALUES (?, ?, ?)";
        let values = [1, title, description];
        await db.query(sql, values,(err, result) => {
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

projectsCtrl.updateProject = async (req, res) => {
    const {id, title, description} = req.body
    let sql = "UPDATE projects SET title = ?, description= ? WHERE id = " + id;
    let values = [title, description];
    await db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

projectsCtrl.deleteProject = async (req, res) => {
    const id = req.params.id
    let sql = "DELETE FROM tasks WHERE tasks.project_id =" + id;
    await db.query(sql, async (err, result) => {
        if (err) {
            throw err;
        }

        let sql2 = "DELETE FROM projects WHERE projects.id = " + id;
        await db.query(sql2, (err, result) => {
            if (err) {
                throw err;
            }
        })
        res.send("Successfuly query"); 
    })
}



projectsCtrl.getProject = async (req, res) => {
    let project = {
        id: "",
        title: "",
        description: "",
        tasks: ""
    }

    const id = req.params.id
    let sql = "SELECT * FROM projects WHERE id = " + id;
    await db.query(sql, async (err, result) => {
        if (err) {
            throw err;
        }
        let string = JSON.stringify(result);
        let json = JSON.parse(string);
        project.id = json[0].id;
        project.title = json[0].title;
        project.description = json[0].description;

        let sql_task = "SELECT * FROM tasks WHERE tasks.project_id = " + project.id;
        await db.query(sql_task, (err, result) => {
            if(err){
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