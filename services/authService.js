const User = require('../models/User');

function register(username, password){
    let user = new User({ username, password});

    return user.save();
}

function login(username, password){

}

module.exports = {
    register,
}