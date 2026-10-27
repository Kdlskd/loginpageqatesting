import React, { useState } from 'react';

export default function LoginForm({
  identifier,
  setIdentifier,
  password,
  setPassword,
  onSubmit,
  loading,
  errors,
  setErrors,
  rememberMe,
  setRememberMe,
  t
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);

  const handleKeyDown = (e) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  const handleKeyUp = (e) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      
      {/* Identifier Input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
          {t.labelIdentifier}
        </label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: null }));
          }}
          placeholder={t.placeholderIdentifier}
          className={`w-full py-2.5 px-3.5 text-sm rounded-xl border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-all focus:outline-none focus:ring-1 ${
            errors.identifier
              ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
              : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white'
          }`}
          autoComplete="username"
        />
        {errors.identifier && (
          <p className="text-xs font-mono mt-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border-l-2 border-black dark:border-white text-black dark:text-white">
            {t[errors.identifier] || errors.identifier}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
          {t.labelPassword}
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={() => setCapsLockActive(false)}
            placeholder={t.placeholderPassword}
            className={`w-full py-2.5 pl-3.5 pr-16 text-sm rounded-xl border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-all focus:outline-none focus:ring-1 ${
              errors.password
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white'
            }`}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3.5 text-xs font-mono font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            {showPassword ? t.hidePassword : t.showPassword}
          </button>
        </div>

        {/* Caps Lock Alert */}
        {capsLockActive && (
          <div className="flex items-center gap-1.5 text-xs font-mono mt-1.5 px-2.5 py-1 rounded-md border border-dashed border-neutral-500 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
            <span>⇪</span>
            <span>{t.capsLockWarning}</span>
          </div>
        )}

        {errors.password && (
          <p className="text-xs font-mono mt-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border-l-2 border-black dark:border-white text-black dark:text-white">
            {t[errors.password] || errors.password}
          </p>
        )}
      </div>

      {/* Options: Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-xs pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-neutral-400 dark:border-neutral-600 accent-black dark:accent-white cursor-pointer"
          />
          <span className="text-neutral-600 dark:text-neutral-400">{t.rememberMe}</span>
        </label>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert('Password reset link simulation sent to your email.');
          }}
          className="text-neutral-500 hover:text-black dark:hover:text-white underline transition-colors"
        >
          {t.forgotPassword}
        </a>
      </div>

      {/* Submit Button (Apple Pill Button) */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-full font-medium text-sm tracking-tight transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.btnSigningIn}
            </span>
          ) : (
            t.btnSignIn
          )}
        </button>
      </div>

    </form>
  );
}
