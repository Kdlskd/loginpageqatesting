import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import QAPresets from './components/QAPresets';
import QAFaultPanel from './components/QAFaultPanel';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';
import { translations } from './translations';

export default function App() {
  // Theme & Language
  const [theme, setTheme] = useState(() => localStorage.getItem('qa_theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('qa_lang') || 'en');

  // Active Tab ('login' or 'signup')
  const [activeTab, setActiveTab] = useState('login');

  // Auth & Session
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Login form states
  const [identifier, setIdentifier] = useState(() => localStorage.getItem('qa_remembered_id') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('qa_remembered_id'));
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  // Fault Injection Flags
  const [faultDelay, setFaultDelay] = useState(false);
  const [fault500, setFault500] = useState(false);
  const [faultNetDrop, setFaultNetDrop] = useState(false);

  const t = translations[lang] || translations.en;

  // Sync theme with HTML class and body
  useEffect(() => {
    localStorage.setItem('qa_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Sync language
  useEffect(() => {
    localStorage.setItem('qa_lang', lang);
  }, [lang]);

  // Fetch initial audit logs
  useEffect(() => {
    fetchLogs();
  }, []);

  const addToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch {
      // Offline fallback
    }
  };

  const recordAuditLog = async (action, status, details) => {
    const entry = {
      id: `log-${Date.now()}`,
      action,
      status,
      details,
      timestamp: new Date().toISOString()
    };
    setLogs((prev) => [entry, ...prev]);

    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
    } catch {
      // Local fallback
    }
  };

  // ---- QA PRESETS HANDLER ----
  const handleSelectPreset = (idVal, passVal, label) => {
    setActiveTab('login');
    setIdentifier(idVal);
    setPassword(passVal);
    setLoginErrors({});
    addToast(`Loaded QA Persona: ${label}`);
  };

  // ---- CLEAR STORAGE ----
  const handleClearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIdentifier('');
    setPassword('');
    setRememberMe(false);
    addToast(t.clearStorage + ' (Completed)');
  };

  // ---- LOGIN HANDLER ----
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!identifier.trim()) {
      errors.identifier = 'errIdentifierRequired';
    } else if (identifier.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier.trim())) {
        errors.identifier = 'errIdentifierInvalid';
      }
    } else if (identifier.trim().length < 3) {
      errors.identifier = 'errIdentifierInvalid';
    }

    if (!password) {
      errors.password = 'errPasswordRequired';
    } else if (password.length < 6) {
      errors.password = 'errPasswordLength';
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setLoading(true);

    // Latency Simulation
    const delay = faultDelay ? 2000 : 400;
    await new Promise((r) => setTimeout(r, delay));

    // Fault: Network Disconnect Simulation
    if (faultNetDrop) {
      setLoading(false);
      addToast(t.errSimulatedNetworkError);
      recordAuditLog('AUTH_ATTEMPT', 'FAIL', 'Simulated Network Disconnect');
      return;
    }

    // Fault: 500 Server Error Simulation
    if (fault500) {
      setLoading(false);
      addToast(t.errSimulatedServerError);
      recordAuditLog('AUTH_ATTEMPT', 'ERROR', 'Simulated 500 Crash');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        const errorMsgKey = data.errorKey || 'errInvalidCredentials';
        setLoginErrors({ password: errorMsgKey });
        addToast(t[errorMsgKey] || data.message);
        recordAuditLog('AUTH_ATTEMPT', 'FAIL', `Failed attempt for "${identifier}"`);
        return;
      }

      // Success
      setUser(data.user);
      addToast(t.loginSuccess);
      recordAuditLog('AUTH_SUCCESS', 'OK', `User "${data.user.fullName}" authenticated`);

      if (rememberMe) {
        localStorage.setItem('qa_remembered_id', identifier);
      } else {
        localStorage.removeItem('qa_remembered_id');
      }
    } catch {
      // Fallback direct mock authentication
      setLoading(false);
      if (identifier.toLowerCase().includes('locked')) {
        setLoginErrors({ identifier: 'errAccountLocked' });
        addToast(t.errAccountLocked);
        recordAuditLog('AUTH_ATTEMPT', 'BLOCKED', `Locked account for "${identifier}"`);
        return;
      }
      if (password === 'SecretPass123!' || password === 'AdminRoot2026#') {
        const mockUser = {
          fullName: identifier.includes('admin') ? 'Marcus Vance' : 'Elena Rostova',
          username: identifier,
          email: identifier.includes('@') ? identifier : `${identifier}@qa-matrix.com`,
          role: identifier.includes('admin') ? 'System Administrator' : 'QA Specialist'
        };
        setUser(mockUser);
        addToast(t.loginSuccess);
        recordAuditLog('AUTH_SUCCESS', 'OK', `User "${mockUser.fullName}" authenticated (Offline Engine)`);
      } else {
        setLoginErrors({ password: 'errInvalidCredentials' });
        addToast(t.errInvalidCredentials);
        recordAuditLog('AUTH_ATTEMPT', 'FAIL', `Invalid login for "${identifier}"`);
      }
    }
  };

  // ---- SIGNUP HANDLER ----
  const handleSignupSubmit = async (formData) => {
    const errors = {};
    if (!formData.email.trim()) errors.email = 'errFieldsRequired';
    if (!formData.username.trim()) errors.username = 'errFieldsRequired';
    if (!formData.password) {
      errors.password = 'errPasswordRequired';
    } else if (formData.password.length < 6) {
      errors.password = 'errPasswordLength';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'errPasswordMismatch';
    }

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      return;
    }

    setLoading(true);
    const delay = faultDelay ? 2000 : 400;
    await new Promise((r) => setTimeout(r, delay));

    if (faultNetDrop) {
      setLoading(false);
      addToast(t.errSimulatedNetworkError);
      return;
    }

    if (fault500) {
      setLoading(false);
      addToast(t.errSimulatedServerError);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        const errorKey = data.errorKey || 'errFieldsRequired';
        setSignupErrors({ email: errorKey });
        addToast(t[errorKey] || data.message);
        return;
      }

      // Success
      addToast(t.signupSuccess);
      recordAuditLog('USER_REGISTER', 'OK', `New account created: "${formData.username}"`);
      setActiveTab('login');
      setIdentifier(formData.email);
      setPassword(formData.password);
    } catch {
      setLoading(false);
      addToast(t.signupSuccess);
      recordAuditLog('USER_REGISTER', 'OK', `New account created: "${formData.username}" (Offline Engine)`);
      setActiveTab('login');
      setIdentifier(formData.email);
      setPassword(formData.password);
    }
  };

  // ---- LOGOUT & DATA RESET ----
  const handleLogout = () => {
    setUser(null);
    setPassword('');
    addToast(t.logoutSuccess);
    recordAuditLog('SESSION_LOGOUT', 'INFO', 'User signed out');
  };

  const handleResetData = async () => {
    try {
      await fetch('/api/auth/reset', { method: 'POST' });
    } catch {
      // Local fallback
    }
    recordAuditLog('DATA_RESET', 'EXEC', 'Test telemetry reset');
    addToast('QC Test Suite reset completed.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white transition-colors duration-200">
      
      {/* Toast Alert System */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Apple-styled Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        t={t}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center items-center">
        
        {user ? (
          /* POST-LOGIN DASHBOARD VIEW */
          <Dashboard
            user={user}
            onLogout={handleLogout}
            logs={logs}
            onResetData={handleResetData}
            t={t}
          />
        ) : (
          /* AUTHENTICATION VIEW (LOGIN / SIGNUP) */
          <div className="w-full max-w-md">
            
            {/* Apple Segmented Tab Switcher */}
            <div className="flex p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-300 dark:border-neutral-700 mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setLoginErrors({});
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {t.tabLogin}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setSignupErrors({});
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {t.tabSignup}
              </button>
            </div>

            {/* Apple Minimalist Card */}
            <div className="p-7 sm:p-9 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm">
              
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight mb-1.5">
                  {activeTab === 'login' ? t.loginHeading : t.signupHeading}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  {activeTab === 'login' ? t.loginSubheading : t.signupSubheading}
                </p>
              </div>

              {activeTab === 'login' ? (
                <LoginForm
                  identifier={identifier}
                  setIdentifier={setIdentifier}
                  password={password}
                  setPassword={setPassword}
                  onSubmit={handleLoginSubmit}
                  loading={loading}
                  errors={loginErrors}
                  setErrors={setLoginErrors}
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                  t={t}
                />
              ) : (
                <SignupForm
                  onSubmit={handleSignupSubmit}
                  loading={loading}
                  errors={signupErrors}
                  setErrors={setSignupErrors}
                  t={t}
                  switchToLogin={() => setActiveTab('login')}
                />
              )}

              {/* QA Persona Quick Autofill Presets */}
              <QAPresets onSelectPreset={handleSelectPreset} t={t} />

              {/* QA Fault Injection and Simulation Panel */}
              <QAFaultPanel
                faultDelay={faultDelay}
                setFaultDelay={setFaultDelay}
                fault500={fault500}
                setFault500={setFault500}
                faultNetDrop={faultNetDrop}
                setFaultNetDrop={setFaultNetDrop}
                onClearStorage={handleClearStorage}
                t={t}
              />

            </div>

          </div>
        )}

      </main>

      {/* Apple Monochrome Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs font-mono text-neutral-500 transition-colors">
        <p>QA MONOVERSE &bull; APPLE MONOCHROME EDITION &bull; MERN STACK &amp; TAILWIND 4</p>
      </footer>

    </div>
  );
}
