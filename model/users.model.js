const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    user_name: { type:String },
    email: { type:String },
    password: { type:String },
    user_type: { type:Number },
    token: { type: String },
    company_id: { type:Number },
    branch_id: { type:Number },
    user_type: { type:Number }, 
    user_name: { type:String }, 
});

module.exports = mongoose.model('users', usersSchema);