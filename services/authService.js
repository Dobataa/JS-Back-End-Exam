const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

function register(username, password){
    let user = new User({ username, password});

    return user.save();
}

async function login(username, password){
    let user = await User.findOne({username}).lean();
    
    if (!user) {
        throw { error: {message: 'Invalid password or username'}, status: 404};
    }
    
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw { error: {message: 'Invalid password or username'}, status: 404};
    }

    let token = jwt.sign({_id: user._id, username: user.username}, SECRET);
    return token;
}

module.exports = {
    register,
    login
}