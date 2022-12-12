const  mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    taskname:{type: String, required: true},
    status:{type: String, enum:["pending", "done"], default:"pending",required: true},
    tag:{type: String, enum:["personal","official","family"], default:"personal",required: true}

})

const TodoModel= mongoose.model('todos',todoSchema)

module.exports={TodoModel}