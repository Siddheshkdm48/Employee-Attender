const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default : Date.now,
    },
    attended:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('employees', EmployeeSchema);