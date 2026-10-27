const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
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
    lowercase: true,
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
    enum: ['QA Specialist', 'Lead QA Engineer', 'System Administrator', 'QC Analyst', 'Restricted User', 'Guest'],
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
}, { _id: false });

module.exports = mongoose.model('User', userSchema);
