const {Router} = require("express");
const router = Router();
const {withAuth} = require('../middlewares/middlewares');
const projectsCrtl = require("../controllers/projectsCtrl");

router.route('/')
    .get(withAuth, projectsCrtl.getProjects)
    .post(projectsCrtl.createProject)

    
router.route('/:id')
    .get(withAuth, projectsCrtl.getProject)    
    .put(projectsCrtl.updateProject)
    .delete(projectsCrtl.deleteProject)
    
module.exports = router;
