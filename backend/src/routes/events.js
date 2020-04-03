const {Router} = require('express');
const router = Router();
const {withAuth} = require('../middlewares/middlewares');
const eventsCtrl = require('../controllers/eventsCtrl');

router.route('/')
    .get(withAuth, eventsCtrl.getEvents)
    .post(eventsCtrl.createEvent)

    
router.route('/:id')  
    .put(eventsCtrl.updateEvent)
    .delete(eventsCtrl.deleteEvent)
    
module.exports = router;