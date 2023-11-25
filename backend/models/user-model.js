const { Double } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name, password, balance, phone, email, created_at, updated_at
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Name is required"]
    },
    password:{
        type: String,
        require: [true, "Password is required"],
        minlength: [5, 'Password must be at least 5 characters'],
        maxlength: [15, 'Password must be at most 15 characters']
    },
    email:{
        type: String,
        require: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    balance:{
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    updated_at:{
        type: Date,
        default: null
    }
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    return next()
})

userSchema.methods.comparePassword = async (passwordInRequest, passwordInDB) => {
    return await bcrypt.compare(passwordInRequest, passwordInDB)
}

const User = mongoose.model('User',userSchema)

module.exports = User