const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  password: {
    type: String,
    select: false,
  },
  phone: {
    type: String,
    sparse: true,
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  avatar: {
    type: String,
  },
  user_address: [
    {
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
        validate: {
          validator: validator.isMobilePhone,
          message: 'Please provide a valid phone number',
        },
      },
      is_default_address: {
        type: Boolean,
        default: false,
      },
    },
  ],
  oauthProviders: [{
    provider: String,
    providerId: String,
    profile: {
      name: String,
      profilePicture: String,
    },
  }],
  is_email_verified: {
    type: Boolean,
    default: false,
  }
}, { 
  timestamps: true,
});

userSchema.add({ isOAuthUser: Boolean });


userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(passwordInRequest) {
  return bcrypt.compare(passwordInRequest, this.password);
};

module.exports = mongoose.model('User', userSchema);
