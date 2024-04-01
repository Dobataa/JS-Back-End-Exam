const moment = require('moment');
const Course = require('../models/Course');

function getAll(){
    return Course.find().lean();
}

function create(courseData){
    let course = new Course({...courseData, createdAt: moment().format('MMMM Do YYYY')})
    
    return course.save();
}

function getOne(id, userId){
    return Course.findById(id)
        .then(course => {
            course.isEnrolled = course.usersEnrolled.includes(userId);

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