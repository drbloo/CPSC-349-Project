const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'An user must have an email'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'An user must have a password'],
    trim: true,
  },
  first_name: {
    type: String,
    required: [true, 'An user must have a first name'],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, 'An user must have a last name'],
    trim: true,
  },
  dob: {
    type: Date,
    required: [true, 'An user must have a date of birth'],
  },
  listing: {
    type: [String],
    required: false,
    default: [],
  },
  shopping_cart: {
    type: [String],
    required: false,
    default: [],
  },
  transactions: {
    type: [String],
    required: false,
    default: [],
  },
  seller_rating: {
    type: Number,
    require: false,
    default: 0,
  },
  seller_rating_count: {
    type: Number,
    required: false,
    default: 0,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
