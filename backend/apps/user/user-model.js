const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

// name, password, balance, phone, email, created_at, updated_at
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is required'],
  },
  password: {
    type: String,
    require: [true, 'Password is required'],
  },
  phone: {
    type: String,
    minlength: '10',
    length: '15',
    require: [true, 'Phone number is required'],
    unique: true,
    validate: [validator.isMobilePhone, 'Please provide a valid phone number'],
  },
  email: {
    type: String,
    require: [true, 'Email is required'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  avatar: {
    type: String,
  },
  user_address: [
    {
      _id: {
        type: ObjectId,
        auto: true,
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      recipient: {
        type: String,
        required: [true, 'Recipient is required'],
      },
      phone: {
        type: String,
        required: [true, 'Phone is required'],
      },
      is_default_address: {
        type: Boolean,
        default: false,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.comparePassword = async (passwordInRequest, passwordInDB) => {
  return await bcrypt.compare(passwordInRequest, passwordInDB);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
