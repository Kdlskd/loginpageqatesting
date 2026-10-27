const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['OK', 'FAIL', 'BLOCKED', 'ERROR', 'EXEC', 'INFO'],
    default: 'INFO'
  },
  details: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    default: '127.0.0.1'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
