const {Router} = require("express");
const router = Router();

const tasksCrtl = require("../controllers/tasksCtrl");

router.route('/')
    .post(tasksCrtl.createTask)

    
router.route('/:id')
    .get(tasksCrtl.getTasks)    
    .delete(tasksCrtl.deleteTask)
    
module.exports = router;
