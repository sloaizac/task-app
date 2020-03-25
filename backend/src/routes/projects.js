const {Router} = require("express");
const router = Router();

const projectsCrtl = require("../controllers/projectsCtrl");

router.route('/')
    .get(projectsCrtl.getProjects)
    .post(projectsCrtl.createProject)

    
router.route('/:id')
    .get(projectsCrtl.getProject)    
    .put(projectsCrtl.updateProject)
    .delete(projectsCrtl.deleteProject)
    
module.exports = router;
