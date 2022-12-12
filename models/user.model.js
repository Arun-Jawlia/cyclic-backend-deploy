const  mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{type: String, required: true},
    password:{type: String, required: true},
    ipaddress:{type: String}

})

const UserModel= mongoose.model('todouser',userSchema)

module.exports={UserModel}