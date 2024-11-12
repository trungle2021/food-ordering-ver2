const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { LOCAL } = require('../../constant/oauth-provider');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [function() {
      // Password is required only when there are no oauthProviders
      return this.oauth_providers.length > 0
    }, 'Password is required for local authentication'],
    select: false,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    required: [function() {
      // Phone is required only when there are no oauthProviders
      return this.oauth_providers.length > 0
    }, 'Phone number is required for local authentication'],
    validate: {
      validator: function(v) {
        // Skip validation if it's OAuth user
        if (this.oauth_providers && this.oauth_providers.length > 0) return true;
        return validator.isMobilePhone(v);
      },
      message: 'Please provide a valid phone number',
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
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
  oauth_providers: [{
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    profile: {
      name: { type: String },
      profilePicture: { type: String },
    },
  }],
  is_email_verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(passwordInRequest) {
  if (this.auth_provider !== LOCAL) {
    return false;
  }
  return bcrypt.compare(passwordInRequest, this.password);
};

module.exports = mongoose.model('User', userSchema);
