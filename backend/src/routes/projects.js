const {Router} = require("express");
const router = Router();
const {isAuthenticated} = require("../helpers/auth");
const projectsCrtl = require("../controllers/projectsCtrl");

router.route('/')
    .get(isAuthenticated, projectsCrtl.getProjects)
    .post(projectsCrtl.createProject)

    
router.route('/:id')
    .get(isAuthenticated, projectsCrtl.getProject)    
    .put(projectsCrtl.updateProject)
    .delete(projectsCrtl.deleteProject)
    
module.exports = router;
