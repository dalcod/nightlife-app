var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var salt_f = 10;
var Schema = mongoose.Schema;
var noop = function(){};

var userSchema = new Schema({
    username: {type: String, requried: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

userSchema.pre("save", function(next){
    var user = this;
    if(!user.isModified("password")){
        return next();
    }
    bcrypt.genSalt(salt_f, function(err, salt){
        if (err) return next(err);
        bcrypt.hash(user.password, salt, noop, function(err, hashedPass){
            if (err) return next(err);
            user.password = hashedPass;
            next();
        });
    });
});

userSchema.methods.name = function(){
    return this.displayName || this.username;
};

userSchema.methods.checkPassword = function(guess, cb){
    bcrypt.compare(guess, this.password, function(err, isMatch){
        if(err) {return cb(err)};
        cb(err, isMatch);
    });
};

module.exports = mongoose.model("NightlifeAppUser", userSchema);