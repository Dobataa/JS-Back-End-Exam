const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET } = require('../config/config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    enrolledCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
});

userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash
            next();
        });
    
});

module.exports = mongoose.model('User', userSchema);