const moment = require('moment');
const Course = require('../models/Course');

function getAll(search){
    if(search){
        return Course
                .find({title: {$regex: search, $options: 'i'}})
                .sort({createdAt: 1})
                .lean();
    }else{
        return Course
                .find()
                .sort({createdAt: 1})
                .lean();
    }
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

function getTop(size){
    return Course
            .find()
            .sort({usersEnrolled: -1})
            .limit(size)
            .lean();
}

function updateOne(courseId, courseData){
    return Course.updateOne({_id: courseId}, courseData);
}

function deleteOne(courseId){
    return Course.deleteOne({_id: courseId});
}

module.exports = {
    create,
    getAll,
    getOne,
    enrollUser,
    getTop,
    updateOne,
    deleteOne
}