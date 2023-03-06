const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email (Example: ninja@mail.com)"
      }
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be 8 characters or longer"]
    }, 
    articlesId: {
      type: Array,
      default: []
    }
  }, {timestamps: true});

//middleware
UserSchema.pre('save', async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    }catch{
        console.log("Error: Save user failed ", error)
    }
})


  module.exports = mongoose.model('User', UserSchema)