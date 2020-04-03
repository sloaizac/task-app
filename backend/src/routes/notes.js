const {Router} = require('express');
const router = Router();
const {withAuth} = require('../middlewares/middlewares');
const notesCtrl = require('../controllers/notesCrtl');

router.route('/')
    .get(withAuth, notesCtrl.getNotes)
    .post(notesCtrl.createNote)

    
router.route('/:id')  
    .put(notesCtrl.updateNote)
    .delete(notesCtrl.deleteNote)
    
module.exports = router;