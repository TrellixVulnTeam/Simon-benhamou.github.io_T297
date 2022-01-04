const { bool } = require('@hapi/joi')
const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
        userID : {type: String , required : true, unique: true},
        email : {type: String , required : true, unique: true},
        password: {type: String , required : true},
        firstName: {type: String , required : true},
        lastName:{type: String , required : true},
        phoneNumber: {type: String , required : true, unique: true},
        createdDate: {type: String , required : true},
        admin: {type: Boolean , required : true},
        bio: {type: String, required: true},
        wishList: {type: Array , required : true}

},{ collection : 'users'})

const model = mongoose.model('UserSchema',userSchema)

module.exports = model