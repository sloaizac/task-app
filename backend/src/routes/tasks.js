const {Router} = require("express");
const router = Router();
const tasksCrtl = require("../controllers/tasksCtrl");

router.route('/')
    .post(tasksCrtl.createTask)

    
router.route('/:id')
    .get(tasksCrtl.getTasks) 
    .put(tasksCrtl.updateTask)   
    .delete(tasksCrtl.deleteTask)
    
module.exports = router;
