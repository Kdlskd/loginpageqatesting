# QA Monoverse — Monochrome QA/QC Testing Portal

A high-performance, strictly monochrome (Black & White) web application designed specifically for **Quality Assurance (QA)** and **Quality Control (QC)** testing of authentication flows, internationalization, fault injection, accessibility, and UI states.

---

## 🚀 Features

1. **Strict Black & White Palette**:
   - **Night Mode (Dark)**: Deep black background (`#000000`), crisp white text (`#ffffff`), high-contrast borders and focus rings.
   - **Light Mode**: Pure white background (`#ffffff`), crisp black text (`#000000`), sharp typography.
   - Instant theme toggle button with `localStorage` persistence.

2. **Multi-Language Support (i18n)**:
   - 🇬🇧 **English (`en`)**
   - 🇮🇳 **Hindi (`hi`)**
   - 🇵🇹 **Portuguese (`pt`)**
   - 🇪🇸 **Spanish (`es`)**
   - Seamless live translation across navigation, form fields, validation messages, preset badges, audit logs, and dashboard metrics.

3. **QA / QC Test Scenarios & Autofill Presets**:
   - **Valid Standard User**: `tester@qa-matrix.com` / `SecretPass123!` (Role: QA Specialist)
   - **Valid Admin User**: `admin@qa-matrix.com` / `AdminRoot2026#` (Role: System Administrator)
   - **Locked / Suspended User**: `locked@qa-matrix.com` / `LockedPass999!` (Tests access denial & security policy)
   - **Invalid Credentials**: `nonexistent@qa-matrix.com` / `BadPass_999` (Tests authentication failure alerts)
   - **SQL Injection / Special Chars**: `' OR '1'='1` (Tests input sanitization and boundary handling)

4. **QA Fault Injection & Simulation Tools**:
   - **Simulate Slow Network (2s delay)**: Tests async loading indicators and button disable states.
   - **Simulate 500 API Error**: Tests backend server failure handling and error alerts.
   - **Simulate Network Drop / Offline**: Tests client disconnect behavior.
   - **Storage Reset**: Wipes `localStorage` and `sessionStorage` on demand.

5. **Form UX & Validation Testing**:
   - Real-time identifier check (RFC email regex or min 3-char username).
   - Password length validation (min 6 chars).
   - Dynamic Show/Hide password toggle.
   - Hardware Caps Lock detection indicator.
   - "Remember Me" persistent cookie/storage simulation.
   - In-app dismissable toast notifications.

6. **Post-Login Dashboard**:
   - User profile and role verification.
   - Real-time session audit stream with timestamps.
   - QC Test Execution Metrics (Passed, Failed, Coverage).
   - Sign Out & Session Termination.

---

## 🛠️ How to Run

### ⚡ Quick Start (Full Stack: React + Express API)
Run both backend and frontend concurrently with a single command from the root directory:

```powershell
npm run dev
# or
npm start
```
* **Frontend Portal (React 18 + Vite + Tailwind 4)**: [http://localhost:3000](http://localhost:3000)
* **Backend API (Node/Express + MongoDB)**: [http://localhost:5000](http://localhost:5000)

### 🖥️ Running Services Individually
```powershell
# Backend API only
cd server
npm start

# Frontend React Client only
cd client
npm run dev
```

### 🌐 Standalone Static Version (Zero Dependencies)
Double-click [index.html](file:///C:/Users/HP/Desktop/loginpageqatesting/index.html) or open with Chrome / Edge / Firefox directly without needing Node.js.

---

## 📋 Recommended QA Test Checklist

| Test ID | Test Category | Steps to Execute | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-01** | Theme Switch | Click "Light Mode" / "Dark Mode" button | Background flips between black and white; contrast remains high; state persists after refresh. |
| **TC-02** | i18n Localization | Select Hindi, Portuguese, or Spanish | All labels, placeholders, errors, and presets switch language seamlessly. |
| **TC-03** | Empty Validation | Click "Sign In" with blank fields | Identifier and Password fields highlight with error messages. |
| **TC-04** | Caps Lock Detection | Focus password field with Caps Lock ON | Warning badge appears informing user Caps Lock is enabled. |
| **TC-05** | Standard Auth | Click "Valid Standard User" preset and submit | Toast confirms success, dashboard opens with "Elena Rostova" (Lead QA Engineer). |
| **TC-06** | Locked Account | Click "Locked / Suspended User" preset and submit | Redirection prevented, "Access Denied" security policy error displayed. |
| **TC-07** | Network Faults | Enable "Simulate 500 API Error" and submit | System captures simulated 500 status and posts error toast. |
| **TC-08** | Audit Log | Perform actions and check dashboard logs | Every login, failure, simulation, and sign-out is recorded with UTC timestamp. |
