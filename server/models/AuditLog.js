const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
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
}, { _id: false });

module.exports = mongoose.model('AuditLog', auditLogSchema);
