// ============================================================
// QA MONOVERSE - CLIENT CONTROLLER & TESTING HARNESS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- STATE MANAGEMENT ----
  let currentLang = localStorage.getItem('qa_lang') || 'en';
  let currentTheme = localStorage.getItem('qa_theme') || 'dark';
  
  // QA Fault Injection Flags
  let faultDelay = false;
  let fault500 = false;
  let faultNetDrop = false;

  // Mock Database of Test Accounts for QA/QC
  const MOCK_USERS = [
    {
      identifier: 'tester@qa-matrix.com',
      username: 'testuser',
      password: 'SecretPass123!',
      name: 'Elena Rostova',
      role: 'Lead QA Engineer',
      status: 'active'
    },
    {
      identifier: 'admin@qa-matrix.com',
      username: 'admin',
      password: 'AdminRoot2026#',
      name: 'Marcus Vance',
      role: 'System Administrator',
      status: 'active'
    },
    {
      identifier: 'locked@qa-matrix.com',
      username: 'lockeduser',
      password: 'LockedPass999!',
      name: 'David K.',
      role: 'Restricted User',
      status: 'locked'
    }
  ];

  // ---- DOM ELEMENTS ----
  const htmlRoot = document.documentElement;
  const langSelect = document.getElementById('langSelect');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  const authWrapper = document.getElementById('authWrapper');
  const dashboardView = document.getElementById('dashboardView');
  const loginForm = document.getElementById('loginForm');
  const identifierInput = document.getElementById('identifierInput');
  const passwordInput = document.getElementById('passwordInput');
  const identifierError = document.getElementById('identifierError');
  const passwordError = document.getElementById('passwordError');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const capsLockAlert = document.getElementById('capsLockAlert');
  const rememberMeCheckbox = document.getElementById('rememberMeCheckbox');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const btnSignIn = document.getElementById('btnSignIn');
  const btnSignInText = document.getElementById('btnSignInText');
  const toastContainer = document.getElementById('toastContainer');

  // Presets
  const presetValidBtn = document.getElementById('presetValidBtn');
  const presetAdminBtn = document.getElementById('presetAdminBtn');
  const presetLockedBtn = document.getElementById('presetLockedBtn');
  const presetInvalidBtn = document.getElementById('presetInvalidBtn');
  const presetSqliBtn = document.getElementById('presetSqliBtn');

  // Fault Debug Buttons
  const toggleDelayBtn = document.getElementById('toggleDelayBtn');
  const toggle500Btn = document.getElementById('toggle500Btn');
  const toggleNetworkDropBtn = document.getElementById('toggleNetworkDropBtn');
  const clearStorageBtn = document.getElementById('clearStorageBtn');

  // Dashboard elements
  const dashUserName = document.getElementById('dashUserName');
  const dashUserRole = document.getElementById('dashUserRole');
  const auditLogList = document.getElementById('auditLogList');
  const btnLogout = document.getElementById('btnLogout');
  const btnResetData = document.getElementById('btnResetData');
  const valTotalTests = document.getElementById('valTotalTests');
  const valPassedTests = document.getElementById('valPassedTests');
  const valFailedTests = document.getElementById('valFailedTests');

  // ============================================================
  // 1. I18N / TRANSLATION ENGINE
  // ============================================================

  function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('qa_lang', lang);
    langSelect.value = lang;

    // Translate all standard elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update dynamic toggle button text
    updateThemeButtonText();

    // Re-validate active errors if any
    if (identifierError.classList.contains('active') && identifierError.dataset.errorKey) {
      identifierError.textContent = translations[lang][identifierError.dataset.errorKey] || '';
    }
    if (passwordError.classList.contains('active') && passwordError.dataset.errorKey) {
      passwordError.textContent = translations[lang][passwordError.dataset.errorKey] || '';
    }
  }

  langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    showToast(`Language switched to: ${e.target.options[e.target.selectedIndex].text}`);
  });

  // ============================================================
  // 2. THEME SWITCHER (NIGHT / LIGHT MODE)
  // ============================================================

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('qa_theme', theme);
    htmlRoot.setAttribute('data-theme', theme);
    updateThemeButtonText();
  }

  function updateThemeButtonText() {
    if (currentTheme === 'dark') {
      themeIcon.textContent = '☀️';
      themeLabel.textContent = translations[currentLang]?.themeToggleLight || 'Light Mode';
    } else {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = translations[currentLang]?.themeToggleDark || 'Dark Mode';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  // ============================================================
  // 3. TOAST NOTIFICATION UTILITY
  // ============================================================

  function showToast(message, duration = 3500) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');

    const msgSpan = document.createElement('span');
    msgSpan.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close toast');
    closeBtn.addEventListener('click', () => toast.remove());

    toast.appendChild(msgSpan);
    toast.appendChild(closeBtn);
    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, duration);
  }

  // ============================================================
  // 4. CAPS LOCK & PASSWORD VISIBILITY TOGGLE
  // ============================================================

  // Show / Hide Password
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    if (isPassword) {
      passwordInput.setAttribute('type', 'text');
      togglePasswordBtn.textContent = translations[currentLang]?.hidePassword || 'Hide';
    } else {
      passwordInput.setAttribute('type', 'password');
      togglePasswordBtn.textContent = translations[currentLang]?.showPassword || 'Show';
    }
  });

  // Caps lock detection on password input
  function checkCapsLock(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      capsLockAlert.classList.add('active');
    } else {
      capsLockAlert.classList.remove('active');
    }
  }
  passwordInput.addEventListener('keydown', checkCapsLock);
  passwordInput.addEventListener('keyup', checkCapsLock);
  passwordInput.addEventListener('blur', () => capsLockAlert.classList.remove('active'));

  // ============================================================
  // 5. FORM VALIDATION
  // ============================================================

  function setFieldError(field, errorEl, errorKey) {
    field.classList.add('has-error');
    errorEl.dataset.errorKey = errorKey;
    errorEl.textContent = translations[currentLang][errorKey] || 'Validation error.';
    errorEl.classList.add('active');
  }

  function clearFieldError(field, errorEl) {
    field.classList.remove('has-error');
    errorEl.classList.remove('active');
    errorEl.textContent = '';
    delete errorEl.dataset.errorKey;
  }

  function validateIdentifier(val) {
    if (!val || !val.trim()) {
      return 'errIdentifierRequired';
    }
    const trimmed = val.trim();
    if (trimmed.includes('@')) {
      // Basic RFC email check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return 'errIdentifierInvalid';
      }
    } else {
      // Username check: minimum 3 chars
      if (trimmed.length < 3) {
        return 'errIdentifierInvalid';
      }
    }
    return null;
  }

  function validatePassword(val) {
    if (!val) {
      return 'errPasswordRequired';
    }
    if (val.length < 6) {
      return 'errPasswordLength';
    }
    return null;
  }

  // Clear errors on user input
  identifierInput.addEventListener('input', () => clearFieldError(identifierInput, identifierError));
  passwordInput.addEventListener('input', () => clearFieldError(passwordInput, passwordError));

  // ============================================================
  // 6. QA PRESET AUTOFILL HANDLERS
  // ============================================================

  function populatePreset(identifier, password) {
    identifierInput.value = identifier;
    passwordInput.value = password;
    clearFieldError(identifierInput, identifierError);
    clearFieldError(passwordInput, passwordError);
    identifierInput.focus();
  }

  presetValidBtn.addEventListener('click', () => {
    populatePreset('tester@qa-matrix.com', 'SecretPass123!');
    showToast('Loaded Preset: Valid Standard QA User');
  });

  presetAdminBtn.addEventListener('click', () => {
    populatePreset('admin@qa-matrix.com', 'AdminRoot2026#');
    showToast('Loaded Preset: Valid Admin User');
  });

  presetLockedBtn.addEventListener('click', () => {
    populatePreset('locked@qa-matrix.com', 'LockedPass999!');
    showToast('Loaded Preset: Locked / Suspended User');
  });

  presetInvalidBtn.addEventListener('click', () => {
    populatePreset('nonexistent@qa-matrix.com', 'BadPass_999');
    showToast('Loaded Preset: Invalid Credentials');
  });

  presetSqliBtn.addEventListener('click', () => {
    populatePreset("' OR '1'='1", "' OR '1'='1");
    showToast('Loaded Preset: SQL Injection Payload Simulation');
  });

  // ============================================================
  // 7. QA FAULT INJECTION CONTROLS
  // ============================================================

  toggleDelayBtn.addEventListener('click', () => {
    faultDelay = !faultDelay;
    toggleDelayBtn.classList.toggle('active', faultDelay);
    toggleDelayBtn.innerHTML = `[${faultDelay ? 'X' : ' '}] <span>${translations[currentLang].simulateDelay}</span>`;
    showToast(`Slow Network Simulation: ${faultDelay ? 'ENABLED' : 'DISABLED'}`);
  });

  toggle500Btn.addEventListener('click', () => {
    fault500 = !fault500;
    toggle500Btn.classList.toggle('active', fault500);
    toggle500Btn.innerHTML = `[${fault500 ? 'X' : ' '}] <span>${translations[currentLang].simulate500}</span>`;
    showToast(`500 API Error Simulation: ${fault500 ? 'ENABLED' : 'DISABLED'}`);
  });

  toggleNetworkDropBtn.addEventListener('click', () => {
    faultNetDrop = !faultNetDrop;
    toggleNetworkDropBtn.classList.toggle('active', faultNetDrop);
    toggleNetworkDropBtn.innerHTML = `[${faultNetDrop ? 'X' : ' '}] <span>${translations[currentLang].simulateNetDrop}</span>`;
    showToast(`Network Drop Simulation: ${faultNetDrop ? 'ENABLED' : 'DISABLED'}`);
  });

  clearStorageBtn.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
    identifierInput.value = '';
    passwordInput.value = '';
    rememberMeCheckbox.checked = false;
    showToast('Local & Session Storage cleared.');
  });

  forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Password recovery module triggered. Test link sent if account exists.');
  });

  // ============================================================
  // 8. LOGIN SUBMISSION & AUDIT LOGGING
  // ============================================================

  function addAuditLog(action, status, details) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const li = document.createElement('li');
    li.className = 'log-item';
    li.innerHTML = `
      <span class="log-time">[${timestamp}]</span>
      <strong>[${status.toUpperCase()}]</strong>
      <span>${action} &mdash; ${details}</span>
    `;
    auditLogList.prepend(li);
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const idVal = identifierInput.value.trim();
    const passVal = passwordInput.value;

    // Validate inputs
    const idErrorKey = validateIdentifier(idVal);
    const passErrorKey = validatePassword(passVal);

    let hasError = false;

    if (idErrorKey) {
      setFieldError(identifierInput, identifierError, idErrorKey);
      hasError = true;
    } else {
      clearFieldError(identifierInput, identifierError);
    }

    if (passErrorKey) {
      setFieldError(passwordInput, passwordError, passErrorKey);
      hasError = true;
    } else {
      clearFieldError(passwordInput, passwordError);
    }

    if (hasError) return;

    // Enter Loading State
    btnSignIn.disabled = true;
    btnSignInText.textContent = translations[currentLang]?.btnSigningIn || 'Authenticating...';

    // Simulate Network Latency if toggled or standard 400ms delay
    const latency = faultDelay ? 2000 : 450;
    await new Promise(resolve => setTimeout(resolve, latency));

    // Check Simulated Network Dropped
    if (faultNetDrop) {
      btnSignIn.disabled = false;
      btnSignInText.textContent = translations[currentLang]?.btnSignIn || 'Sign In';
      showToast(translations[currentLang].errSimulatedNetworkError);
      addAuditLog('AUTH_ATTEMPT', 'FAIL', 'Simulated Network Disconnect');
      return;
    }

    // Check Simulated 500 API Error
    if (fault500) {
      btnSignIn.disabled = false;
      btnSignInText.textContent = translations[currentLang]?.btnSignIn || 'Sign In';
      showToast(translations[currentLang].errSimulatedServerError);
      addAuditLog('AUTH_ATTEMPT', '500_ERROR', 'Simulated Server Crash');
      return;
    }

    // Match credentials against Mock DB
    const matchedUser = MOCK_USERS.find(u => 
      (u.identifier.toLowerCase() === idVal.toLowerCase() || u.username.toLowerCase() === idVal.toLowerCase()) &&
      u.password === passVal
    );

    btnSignIn.disabled = false;
    btnSignInText.textContent = translations[currentLang]?.btnSignIn || 'Sign In';

    if (!matchedUser) {
      setFieldError(passwordInput, passwordError, 'errInvalidCredentials');
      showToast(translations[currentLang].errInvalidCredentials);
      addAuditLog('AUTH_ATTEMPT', 'FAIL', `Invalid login credentials for identifier: "${idVal}"`);
      return;
    }

    if (matchedUser.status === 'locked') {
      setFieldError(identifierInput, identifierError, 'errAccountLocked');
      showToast(translations[currentLang].errAccountLocked);
      addAuditLog('AUTH_ATTEMPT', 'BLOCKED', `Locked account sign-in rejected for: "${idVal}"`);
      return;
    }

    // Successful Login
    showToast(translations[currentLang].loginSuccess);
    addAuditLog('AUTH_SUCCESS', 'OK', `User "${matchedUser.name}" authenticated with role [${matchedUser.role}]`);

    // Handle Remember Me
    if (rememberMeCheckbox.checked) {
      localStorage.setItem('qa_saved_identifier', idVal);
    } else {
      localStorage.removeItem('qa_saved_identifier');
    }

    // Transition to Dashboard
    dashUserName.textContent = matchedUser.name;
    dashUserRole.textContent = matchedUser.role;
    authWrapper.style.display = 'none';
    dashboardView.classList.add('active');
  });

  // ============================================================
  // 9. DASHBOARD LOGOUT & TEST DATA ACTIONS
  // ============================================================

  btnLogout.addEventListener('click', () => {
    dashboardView.classList.remove('active');
    authWrapper.style.display = 'block';
    passwordInput.value = '';
    showToast(translations[currentLang].logoutSuccess);
    addAuditLog('SESSION_LOGOUT', 'INFO', 'Session terminated by user.');
  });

  btnResetData.addEventListener('click', () => {
    valTotalTests.textContent = Math.floor(Math.random() * 50 + 150);
    valPassedTests.textContent = Math.floor(Math.random() * 20 + 130);
    valFailedTests.textContent = Math.floor(Math.random() * 8);
    showToast('QC Test execution metrics refreshed.');
    addAuditLog('DATA_RESET', 'EXEC', 'Test telemetry metrics recalculated.');
  });

  // ============================================================
  // 10. INITIALIZATION
  // ============================================================

  // Apply stored theme
  applyTheme(currentTheme);

  // Apply stored or default language
  setLanguage(currentLang);

  // Pre-load remembered username if any
  const savedId = localStorage.getItem('qa_saved_identifier');
  if (savedId) {
    identifierInput.value = savedId;
    rememberMeCheckbox.checked = true;
  }

  // Initial audit log entry
  addAuditLog('SYSTEM_BOOT', 'OK', 'QA Monoverse testing suite initialized.');

});
