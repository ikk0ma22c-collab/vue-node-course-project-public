const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controllers.js');
const expressJoi = require('@escook/express-joi');
const { findcoursecheck ,updatecoursecheck ,addcoursecheck } = require('../utils/check');

router.get('/find', expressJoi(findcoursecheck), courseController.coursefindController);
router.get('/update', expressJoi(updatecoursecheck), courseController.courseUpdateController);
router.get('/delete', courseController.courseDeleteController);
router.post('/add', expressJoi(addcoursecheck), courseController.courseAddController);
module.exports = router;
