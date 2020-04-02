const {Router} = require('express');
const router = Router();
const {isAuthenticated} = require("../helpers/auth");
const notesCtrl = require('../controllers/notesCrtl');

router.route('/')
    .get(isAuthenticated, notesCtrl.getNotes)
    .post(notesCtrl.createNote)

    
router.route('/:id')  
    .put(notesCtrl.updateNote)
    .delete(notesCtrl.deleteNote)
    
module.exports = router;