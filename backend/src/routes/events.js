const {Router} = require('express');
const router = Router();

const eventsCtrl = require('../controllers/eventsCtrl');

router.route('/')
    .get(eventsCtrl.getEvents)
    .post(eventsCtrl.createEvent)

    
router.route('/:id')  
    .put(eventsCtrl.updateEvent)
    .delete(eventsCtrl.deleteEvent)
    
module.exports = router;