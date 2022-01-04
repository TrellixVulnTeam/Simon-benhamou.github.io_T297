const mongoose = require('mongoose') 

const petSchema = new mongoose.Schema({
        id: {type: String , required : true},
        type : {type: String , required : true},
        name: {type: String , required : true},
        status: {type: String , required : true},
        image:{type: String , required : true},
        color: {type: String , required : true},
        weight: {type: String , required : true},
        height: {type: String , required : true},
        bio: {type: String , required : true},
        hypoallergenic: {type: String , required : true},
        dietaryRestriction: {type: String , required : true},
        breedOfAnimal: {type: String , required : true},
        fosterBy: {type: String,required: false},
        adoptedBy: {type: String,required: false}
},{ collection : 'pets'})

const model = mongoose.model('petSchema',petSchema)

module.exports = model

 