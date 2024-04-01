const moment = require('moment');
const Course = require('../models/Course');

function getAll(){
    return Course.find().lean();
}

function create(courseData, userId){
    let course = new Course({...courseData, createdAt: moment().format('MMMM Do YYYY'), creatorId: userId })
    
    return course.save();
}

function getOne(id, userId){
    return Course.findById(id)
        .then(course => {
            course.isEnrolled = course.usersEnrolled.includes(userId);
            course.isCreator = course.creatorId == userId;

            return course;
        });
}

function enrollUser(courseId, userId){
    return Course.findById(courseId)
        .then(course => {
            course.usersEnrolled.push(userId);

            return course.save();
        });
}

module.exports = {
    create,
    getAll,
    getOne,
    enrollUser
}