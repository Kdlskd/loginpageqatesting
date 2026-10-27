// Multi-language translation dictionary for QA/QC Login Portal
const translations = {
  en: {
    // Navigation & Meta
    appTitle: "QA Monoverse",
    portalSubtitle: "Enterprise QA & QC Testing Portal",
    themeToggleLight: "Light Mode",
    themeToggleDark: "Dark Mode",
    
    // Login Form
    loginHeading: "Account Sign In",
    loginSubheading: "Enter your test credentials to access the QC environment.",
    labelIdentifier: "Email or Username",
    placeholderIdentifier: "tester@qa-matrix.com or testuser",
    labelPassword: "Password",
    placeholderPassword: "Enter your password",
    showPassword: "Show",
    hidePassword: "Hide",
    rememberMe: "Remember me for 30 days",
    forgotPassword: "Forgot password?",
    btnSignIn: "Sign In",
    btnSigningIn: "Authenticating...",
    
    // Test Credentials helper
    qaHelperTitle: "QA Test Scenarios & Presets",
    qaHelperSubtitle: "Click any profile below to autofill and test specific validation rules:",
    presetValid: "Valid Standard User",
    presetAdmin: "Valid Admin User",
    presetLocked: "Locked / Suspended User",
    presetInvalid: "Invalid Credentials",
    presetSpecialChars: "SQLi / Special Chars Test",

    // Validation & Error Messages
    errIdentifierRequired: "Email or username is required.",
    errIdentifierInvalid: "Please enter a valid email address (e.g. user@domain.com) or username (min 3 chars).",
    errPasswordRequired: "Password is required.",
    errPasswordLength: "Password must be at least 6 characters long.",
    errInvalidCredentials: "Authentication failed: Invalid credentials provided.",
    errAccountLocked: "Access Denied: This account has been locked due to security policy.",
    errSimulatedServerError: "Simulated Server Error (500): Internal Service Unavailable.",
    errSimulatedNetworkError: "Simulated Network Failure: Check your connection.",
    capsLockWarning: "Warning: Caps Lock is ON",
    loginSuccess: "Authentication successful! Redirecting to QC Dashboard...",
    logoutSuccess: "You have been logged out successfully.",

    // Dashboard View
    dashWelcome: "Welcome back",
    dashRole: "Role",
    dashStatus: "Status",
    dashSessionActive: "Session Active",
    dashMetricsTitle: "QC Test Execution Metrics",
    dashTotalTests: "Test Cases Run",
    dashPassedTests: "Passed Verification",
    dashFailedTests: "Defects Flagged",
    dashCoverage: "Code Coverage",
    dashRecentLogs: "Audit & Auth Logs",
    dashBtnLogout: "Sign Out",
    dashBtnResetData: "Reset Test Data",

    // QA Tools Modal / Controls
    qaToolsHeading: "QA / QC Debug Tools",
    simulateDelay: "Simulate Slow Network (2s)",
    simulate500: "Simulate 500 API Error",
    simulateNetDrop: "Simulate Network Drop",
    clearStorage: "Clear Local & Session Storage"
  },

  hi: {
    // Navigation & Meta
    appTitle: "QA मोनोवर्स",
    portalSubtitle: "एंटरप्राइज QA और QC टेस्टिंग पोर्टल",
    themeToggleLight: "लाइट मोड",
    themeToggleDark: "डार्क मोड",
    
    // Login Form
    loginHeading: "खाता साइन इन",
    loginSubheading: "QC वातावरण तक पहुँचने के लिए अपने परीक्षण क्रेडेंशियल्स दर्ज करें।",
    labelIdentifier: "ईमेल या यूज़रनेम",
    placeholderIdentifier: "tester@qa-matrix.com या testuser",
    labelPassword: "पासवर्ड",
    placeholderPassword: "अपना पासवर्ड दर्ज करें",
    showPassword: "दिखाएं",
    hidePassword: "छिपाएं",
    rememberMe: "मुझे 30 दिनों तक याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    btnSignIn: "साइन इन करें",
    btnSigningIn: "प्रमाणीकरण हो रहा है...",
    
    // Test Credentials helper
    qaHelperTitle: "QA परीक्षण परिदृश्य और प्रीसेट",
    qaHelperSubtitle: "विशिष्ट सत्यापन नियमों का परीक्षण करने के लिए किसी भी प्रोफ़ाइल पर क्लिक करें:",
    presetValid: "मान्य सामान्य उपयोगकर्ता",
    presetAdmin: "मान्य व्यवस्थापक (Admin)",
    presetLocked: "अवरुद्ध (Locked) उपयोगकर्ता",
    presetInvalid: "अमान्य क्रेडेंशियल्स",
    presetSpecialChars: "SQLi / विशेष वर्ण परीक्षण",

    // Validation & Error Messages
    errIdentifierRequired: "ईमेल या यूज़रनेम आवश्यक है।",
    errIdentifierInvalid: "कृपया एक मान्य ईमेल (उदा. user@domain.com) या उपयोगकर्ता नाम (कम से कम 3 वर्ण) दर्ज करें।",
    errPasswordRequired: "पासवर्ड आवश्यक है।",
    errPasswordLength: "पासवर्ड कम से कम 6 वर्णों का होना चाहिए।",
    errInvalidCredentials: "प्रमाणीकरण विफल: गलत क्रेडेंशियल प्रदान किए गए।",
    errAccountLocked: "पहुंच अस्वीकृत: सुरक्षा नीति के कारण यह खाता लॉक कर दिया गया है।",
    errSimulatedServerError: "सिम्युलेटेड सर्वर त्रुटि (500): आंतरिक सेवा अनुपलब्ध।",
    errSimulatedNetworkError: "सिम्युलेटेड नेटवर्क विफलता: अपने कनेक्शन की जाँच करें।",
    capsLockWarning: "चेतावनी: Caps Lock चालू है",
    loginSuccess: "प्रमाणीकरण सफल! QC डैशबोर्ड पर पुनर्निर्देशित किया जा रहा है...",
    logoutSuccess: "आप सफलतापूर्वक लॉग आउट हो गए हैं।",

    // Dashboard View
    dashWelcome: "वापसी पर स्वागत है",
    dashRole: "भूमिका",
    dashStatus: "स्थिति",
    dashSessionActive: "सत्र सक्रिय",
    dashMetricsTitle: "QC परीक्षण निष्पादन मेट्रिक्स",
    dashTotalTests: "कुल परीक्षण मामले",
    dashPassedTests: "सफल सत्यापन",
    dashFailedTests: "पहचाने गए दोष (Bugs)",
    dashCoverage: "परीक्षण कवरेज",
    dashRecentLogs: "ऑडिट एवं लॉगिन लॉग",
    dashBtnLogout: "साइन आउट करें",
    dashBtnResetData: "डेटा रीसेट करें",

    // QA Tools Modal / Controls
    qaToolsHeading: "QA / QC डिबग उपकरण",
    simulateDelay: "धीमा नेटवर्क अनुकरण करें (2s)",
    simulate500: "500 API त्रुटि अनुकरण करें",
    simulateNetDrop: "नेटवर्क डिस्कनेक्ट अनुकरण करें",
    clearStorage: "लोकल और सेशन स्टोरेज साफ़ करें"
  },

  pt: {
    // Navigation & Meta
    appTitle: "QA Monoverse",
    portalSubtitle: "Portal de Testes Corporativo QA & QC",
    themeToggleLight: "Modo Claro",
    themeToggleDark: "Modo Escuro",
    
    // Login Form
    loginHeading: "Entrar na Conta",
    loginSubheading: "Insira suas credenciais de teste para acessar o ambiente de QC.",
    labelIdentifier: "E-mail ou Usuário",
    placeholderIdentifier: "tester@qa-matrix.com ou testuser",
    labelPassword: "Senha",
    placeholderPassword: "Digite sua senha",
    showPassword: "Exibir",
    hidePassword: "Ocultar",
    rememberMe: "Lembrar de mim por 30 dias",
    forgotPassword: "Esqueceu a senha?",
    btnSignIn: "Entrar",
    btnSigningIn: "Autenticando...",
    
    // Test Credentials helper
    qaHelperTitle: "Cenários e Predefinições de Teste QA",
    qaHelperSubtitle: "Clique em qualquer perfil abaixo para preencher e validar regras:",
    presetValid: "Usuário Padrão Válido",
    presetAdmin: "Administrador Válido",
    presetLocked: "Usuário Bloqueado/Suspenso",
    presetInvalid: "Credenciais Inválidas",
    presetSpecialChars: "Teste SQLi / Caracteres Especiais",

    // Validation & Error Messages
    errIdentifierRequired: "O e-mail ou nome de usuário é obrigatório.",
    errIdentifierInvalid: "Insira um e-mail válido (ex: user@dominio.com) ou usuário (mínimo 3 caracteres).",
    errPasswordRequired: "A senha é obrigatória.",
    errPasswordLength: "A senha deve conter no mínimo 6 caracteres.",
    errInvalidCredentials: "Falha na autenticação: Credenciais incorretas.",
    errAccountLocked: "Acesso Negado: Esta conta foi bloqueada pelas políticas de segurança.",
    errSimulatedServerError: "Erro de Servidor Simulado (500): Serviço indisponível.",
    errSimulatedNetworkError: "Falha de Conexão Simulada: Verifique sua rede.",
    capsLockWarning: "Aviso: A tecla Caps Lock está ATIVADA",
    loginSuccess: "Autenticado com sucesso! Redirecionando para o Dashboard...",
    logoutSuccess: "Você saiu com sucesso.",

    // Dashboard View
    dashWelcome: "Bem-vindo de volta",
    dashRole: "Função",
    dashStatus: "Status",
    dashSessionActive: "Sessão Ativa",
    dashMetricsTitle: "Métricas de Execução de Testes QC",
    dashTotalTests: "Casos de Teste Executados",
    dashPassedTests: "Verificações Aprovadas",
    dashFailedTests: "Defeitos Reportados",
    dashCoverage: "Cobertura de Testes",
    dashRecentLogs: "Registros de Auditoria e Login",
    dashBtnLogout: "Encerrar Sessão",
    dashBtnResetData: "Redefinir Dados de Teste",

    // QA Tools Modal / Controls
    qaToolsHeading: "Ferramentas de Depuração QA / QC",
    simulateDelay: "Simular Rede Lenta (2s)",
    simulate500: "Simular Erro de API 500",
    simulateNetDrop: "Simular Queda de Rede",
    clearStorage: "Limpar Armazenamento Local e Sessão"
  },

  es: {
    // Navigation & Meta
    appTitle: "QA Monoverse",
    portalSubtitle: "Portal Empresarial de Pruebas QA y QC",
    themeToggleLight: "Modo Claro",
    themeToggleDark: "Modo Oscuro",
    
    // Login Form
    loginHeading: "Iniciar Sesión",
    loginSubheading: "Ingrese sus credenciales de prueba para acceder al entorno de QC.",
    labelIdentifier: "Correo Electrónico o Usuario",
    placeholderIdentifier: "tester@qa-matrix.com o testuser",
    labelPassword: "Contraseña",
    placeholderPassword: "Ingrese su contraseña",
    showPassword: "Ver",
    hidePassword: "Ocultar",
    rememberMe: "Recordarme durante 30 días",
    forgotPassword: "¿Olvidó su contraseña?",
    btnSignIn: "Iniciar Sesión",
    btnSigningIn: "Autenticando...",
    
    // Test Credentials helper
    qaHelperTitle: "Escenarios y Ajustes Predefinidos de QA",
    qaHelperSubtitle: "Haga clic en cualquier perfil para autorrellenar y probar las reglas:",
    presetValid: "Usuario Estándar Válido",
    presetAdmin: "Administrador Válido",
    presetLocked: "Usuario Bloqueado/Suspendido",
    presetInvalid: "Credenciales Inválidas",
    presetSpecialChars: "Prueba SQLi / Caracteres Especiales",

    // Validation & Error Messages
    errIdentifierRequired: "El correo electrónico o usuario es obligatorio.",
    errIdentifierInvalid: "Ingrese un correo válido (ej. usuario@dominio.com) o usuario (mínimo 3 caracteres).",
    errPasswordRequired: "La contraseña es obligatoria.",
    errPasswordLength: "La contraseña debe tener al menos 6 caracteres.",
    errInvalidCredentials: "Error de autenticación: Credenciales no válidas.",
    errAccountLocked: "Acceso Denegado: Esta cuenta ha sido bloqueada por directivas de seguridad.",
    errSimulatedServerError: "Error de Servidor Simulado (500): Servicio no disponible.",
    errSimulatedNetworkError: "Fallo de Red Simulado: Compruebe su conexión.",
    capsLockWarning: "Advertencia: Bloq Mayús está ACTIVADO",
    loginSuccess: "¡Autenticación exitosa! Redirigiendo al Panel de QC...",
    logoutSuccess: "Sesión cerrada correctamente.",

    // Dashboard View
    dashWelcome: "Bienvenido de nuevo",
    dashRole: "Rol",
    dashStatus: "Estado",
    dashSessionActive: "Sesión Activa",
    dashMetricsTitle: "Métricas de Ejecución de Pruebas QC",
    dashTotalTests: "Casos de Prueba Ejecutados",
    dashPassedTests: "Verificaciones Aprobadas",
    dashFailedTests: "Defectos Registrados",
    dashCoverage: "Cobertura de Pruebas",
    dashRecentLogs: "Registros de Auditoría y Acceso",
    dashBtnLogout: "Cerrar Sesión",
    dashBtnResetData: "Restablecer Datos de Prueba",

    // QA Tools Modal / Controls
    qaToolsHeading: "Herramientas de Depuración QA / QC",
    simulateDelay: "Simular Red Lenta (2s)",
    simulate500: "Simular Error de API 500",
    simulateNetDrop: "Simular Caída de Red",
    clearStorage: "Borrar Almacenamiento Local y de Sesión"
  }
};
