const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    default: 'QA Tester'
  },
  role: {
    type: String,
    enum: ['QA Specialist', 'System Administrator', 'QC Analyst', 'Guest'],
    default: 'QA Specialist'
  },
  status: {
    type: String,
    enum: ['active', 'locked', 'pending'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
