var mongoose = require('mongoose');
jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    businessName: {type: String, required: true },
    createdTime: {type: Date, default: Date.now },
    accountActive: {type: Boolean, default: false }
});

UserSchema.methods.validatePassword = function(password) {
    return this.password === password;
}

UserSchema.methods.generateJwt = function() {
    return jwt.sign({
          _id: this._id,
          username: this.username,
          exp: 31556926     //1 year in seconds
        },
        "secretKey");
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
