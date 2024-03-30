const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 50
    },
    imageUrl: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    usersEnrolled: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Course', courseSchema);