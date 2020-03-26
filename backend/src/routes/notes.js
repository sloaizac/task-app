const {Router} = require('express');
const router = Router();

const notesCtrl = require('../controllers/notesCrtl');

router.route('/')
    .get(notesCtrl.getNotes)
    .post(notesCtrl.createNote)

    
router.route('/:id')  
    .put(notesCtrl.updateNote)
    .delete(notesCtrl.deleteNote)
    
module.exports = router;