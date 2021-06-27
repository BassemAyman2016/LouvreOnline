const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  user_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_role: {
    type: String,
    required: true,
    enum: ["ADMIN","GUEST"]
  },
  phone_number: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('users', UserSchema)
