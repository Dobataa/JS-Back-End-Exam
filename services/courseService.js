const moment = require('moment');
const Course = require('../models/Course');

function getAll(){
    return Course.find().lean();
}

function create(courseData){
    console.log(courseData);
    let course = new Course({...courseData, createdAt: moment().format('MMMM Do YYYY')});

    return course.save();
}

module.exports = {
    create,
    getAll
}