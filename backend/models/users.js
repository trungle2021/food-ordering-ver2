const { Double } = require('mongodb');
const mongoose = require('mongoose');

//name, password, balance, phone, email, created_at, updated_at
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Name is required"]
    },
    password:{
        type: String,
        require: [true, "Password is required"]
    },
    email:{
        type: String,
        require: [true, "Email is required"],
        unique: true,
    },
    balance:{
        type: Double,
        default: 0
    },
    created_at:{
        type: Date,
        default: new Date.now()
    },
    updated_at:{
        type: Date,
        default: null
    }
})