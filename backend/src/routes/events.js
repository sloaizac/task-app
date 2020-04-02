const {Router} = require('express');
const router = Router();
const {isAuthenticated} = require("../helpers/auth");
const eventsCtrl = require('../controllers/eventsCtrl');

router.route('/')
    .get(isAuthenticated, eventsCtrl.getEvents)
    .post(eventsCtrl.createEvent)

    
router.route('/:id')  
    .put(eventsCtrl.updateEvent)
    .delete(eventsCtrl.deleteEvent)
    
module.exports = router;