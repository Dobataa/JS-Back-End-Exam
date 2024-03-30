const moment = require('moment');
const Course = require('../models/Course');

function create(courseData){
    console.log(courseData);
    let course = new Course({...courseData, createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')});

    return course.save();
}

module.exports = {
    create
}