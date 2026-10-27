const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const AuditLog = require('./models/AuditLog');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'qa_monoverse_jwt_secret_key_2026';
let mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/qa_monoverse';
let isMongoReady = false;

app.use(cors());
app.use(express.json());

// In-Memory Seed Storage (Active immediately while MongoDB engine initializes)
let memUsers = [
  {
    _id: 'u-1',
    email: 'tester@qa-matrix.com',
    username: 'testuser',
    password: 'SecretPass123!',
    fullName: 'Elena Rostova',
    role: 'QA Specialist',
    status: 'active',
    createdAt: new Date()
  },
  {
    _id: 'u-2',
    email: 'admin@qa-matrix.com',
    username: 'admin',
    password: 'AdminRoot2026#',
    fullName: 'Marcus Vance',
    role: 'System Administrator',
    status: 'active',
    createdAt: new Date()
  },
  {
    _id: 'u-3',
    email: 'locked@qa-matrix.com',
    username: 'lockeduser',
    password: 'LockedPass999!',
    fullName: 'David K.',
    role: 'Restricted User',
    status: 'locked',
    createdAt: new Date()
  }
];

let memLogs = [
  {
    _id: 'log-1',
    action: 'SYSTEM_BOOT',
    status: 'OK',
    details: 'MERN Express server online & responsive.',
    timestamp: new Date()
  }
];

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().substring(11, 19)}] ${req.method} ${req.url}`);
  next();
});

// Seed Mongo from memUsers once connected
async function syncToMongo() {
  try {
    for (const u of memUsers) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
      }
    }
    console.log('[MongoDB] Synced test accounts into MongoDB successfully.');
  } catch (err) {
    console.error('[MongoDB Sync Error]', err.message);
  }
}

// Background MongoDB Initializer
async function initMongo() {
  try {
    console.log('[MongoDB] Checking system MongoDB daemon at', mongoUri);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    isMongoReady = true;
    console.log('[MongoDB] Connected to system MongoDB daemon!');
    await syncToMongo();
    return;
  } catch (err) {
    console.log('[MongoDB] System daemon not found. Starting embedded MongoDB instance in background...');
  }

  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log('[MongoDB] Dedicated MongoDB instance ready at:', mongoUri);
    await mongoose.connect(mongoUri);
    isMongoReady = true;
    console.log('[MongoDB] Mongoose successfully connected to dedicated MongoDB.');
    await syncToMongo();
  } catch (err) {
    console.log('[MongoDB Warning] Dedicated Mongo setup in progress:', err.message);
  }
}

// Start Mongo in background so API is instantly live
initMongo();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: isMongoReady ? 'MongoDB (Online & Connected)' : 'MongoDB (Initializing in background)',
    engine: isMongoReady ? 'MongoDB Engine' : 'Express Active Engine',
    uri: isMongoReady ? mongoUri : 'Connecting...',
    time: new Date()
  });
});

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ errorKey: 'errFieldsRequired', message: 'All fields are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ errorKey: 'errPasswordLength', message: 'Password must be at least 6 characters.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanUsername = username.toLowerCase().trim();

  try {
    if (isMongoReady) {
      const existing = await User.findOne({
        $or: [{ email: cleanEmail }, { username: cleanUsername }]
      });

      if (existing) {
        return res.status(409).json({ errorKey: 'errUserExists', message: 'Email or username already exists in MongoDB.' });
      }

      const newUser = await User.create({
        fullName: fullName || 'QA Tester',
        email: cleanEmail,
        username: cleanUsername,
        password,
        role: 'QA Specialist',
        status: 'active'
      });

      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        token,
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          status: newUser.status
        }
      });
    } else {
      // Immediate In-Memory handling while Mongo connects
      const existing = memUsers.find(u => u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanUsername);
      if (existing) {
        return res.status(409).json({ errorKey: 'errUserExists', message: 'Email or username already exists.' });
      }

      const newUser = {
        _id: `u-${Date.now()}`,
        fullName: fullName || 'QA Tester',
        email: cleanEmail,
        username: cleanUsername,
        password,
        role: 'QA Specialist',
        status: 'active',
        createdAt: new Date()
      };
      memUsers.push(newUser);

      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        token,
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          status: newUser.status
        }
      });
    }
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ errorKey: 'errSimulatedServerError', message: 'Server internal error during signup.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ errorKey: 'errIdentifierRequired', message: 'Identifier and password are required.' });
  }

  const cleanId = identifier.toLowerCase().trim();

  try {
    let user;
    if (isMongoReady) {
      user = await User.findOne({
        $or: [{ email: cleanId }, { username: cleanId }]
      });
    } else {
      user = memUsers.find(u => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId);
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ errorKey: 'errInvalidCredentials', message: 'Invalid credentials provided.' });
    }

    if (user.status === 'locked') {
      return res.status(403).json({ errorKey: 'errAccountLocked', message: 'Account locked by security policy.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ errorKey: 'errSimulatedServerError', message: 'Server internal error.' });
  }
});

// GET /api/logs
app.get('/api/logs', async (req, res) => {
  try {
    if (isMongoReady) {
      const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(20);
      return res.json(logs);
    } else {
      return res.json(memLogs.slice(0, 20));
    }
  } catch (err) {
    res.json(memLogs.slice(0, 20));
  }
});

// POST /api/logs
app.post('/api/logs', async (req, res) => {
  const { action, status, details } = req.body;
  const newLog = {
    _id: `log-${Date.now()}`,
    action: action || 'ACTION',
    status: status || 'INFO',
    details: details || '',
    timestamp: new Date()
  };

  if (isMongoReady) {
    try {
      await AuditLog.create(newLog);
    } catch {
      memLogs.unshift(newLog);
    }
  } else {
    memLogs.unshift(newLog);
  }

  res.status(201).json(newLog);
});

// POST /api/auth/reset
app.post('/api/auth/reset', async (req, res) => {
  if (isMongoReady) {
    try {
      await AuditLog.deleteMany({});
      await AuditLog.create({
        action: 'DATA_RESET',
        status: 'EXEC',
        details: 'Audit logs purged and reset for QA suite in MongoDB.'
      });
    } catch (e) {
      // fallback
    }
  }
  memLogs = [
    {
      _id: `log-${Date.now()}`,
      action: 'DATA_RESET',
      status: 'EXEC',
      details: 'Audit logs reset for QA suite.',
      timestamp: new Date()
    }
  ];
  res.json({ message: 'Test data reset successfully.' });
});

// Immediately listen on PORT 5000
app.listen(PORT, () => {
  console.log(`[QA Monoverse Express] Server running on http://localhost:${PORT}`);
});
