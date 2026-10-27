import React, { useState } from 'react';

export default function SignupForm({
  onSubmit,
  loading,
  errors,
  setErrors,
  t,
  switchToLogin
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const calculateStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score; // 0 to 5
  };

  const strength = calculateStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      
      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
          {t.labelFullName}
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={t.placeholderFullName}
          className="w-full py-2.5 px-3.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-all focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
          {t.labelEmail}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.placeholderEmail}
          className={`w-full py-2.5 px-3.5 text-sm rounded-xl border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-all focus:outline-none focus:ring-1 ${
            errors.email
              ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
              : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white'
          }`}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-xs font-mono mt-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border-l-2 border-black dark:border-white text-black dark:text-white">
            {t[errors.email] || errors.email}
          </p>
        )}
      </div>

      {/* Username */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
          {t.labelUsername}
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder={t.placeholderUsername}
          className={`w-full py-2.5 px-3.5 text-sm rounded-xl border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-all focus:outline-none focus:ring-1 ${
            errors.username
              ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
              : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white'
          }`}
          autoComplete="username"
        />
        {errors.username && (
          <p className="text-xs font-mono mt-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border-l-2 border-black dark:border-white text-black dark:text-white">
            {t[errors.username] || errors.username}
          </p>
        )}
      </div>

      {/* Password with Strength bar */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
          {t.labelPassword}
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t.placeholderPassword}
            className={`w-full py-2.5 pl-3.5 pr-16 text-sm rounded-xl border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-all focus:outline-none focus:ring-1 ${
              errors.password
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white'
            }`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3.5 text-xs font-mono font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            {showPassword ? t.hidePassword : t.showPassword}
          </button>
        </div>

        {/* Password Strength Indicator (Monochrome Apple Segmented Bar) */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex gap-1.5 h-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    strength >= level
                      ? 'bg-black dark:bg-white'
                      : 'bg-neutral-200 dark:bg-neutral-800'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono uppercase text-neutral-500 mt-1">
              <span>Password Complexity</span>
              <span>{strength < 2 ? 'Weak' : strength < 4 ? 'Moderate' : 'Strong'}</span>
            </div>
          </div>
        )}

        {errors.password && (
          <p className="text-xs font-mono mt-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border-l-2 border-black dark:border-white text-black dark:text-white">
            {t[errors.password] || errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
          {t.labelConfirmPassword}
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder={t.placeholderConfirmPassword}
          className={`w-full py-2.5 px-3.5 text-sm rounded-xl border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-all focus:outline-none focus:ring-1 ${
            errors.confirmPassword
              ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
              : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white'
          }`}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <p className="text-xs font-mono mt-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border-l-2 border-black dark:border-white text-black dark:text-white">
            {t[errors.confirmPassword] || errors.confirmPassword}
          </p>
        )}
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
              {t.btnSigningUp}
            </span>
          ) : (
            t.btnSignUp
          )}
        </button>
      </div>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={switchToLogin}
          className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white underline transition-colors cursor-pointer"
        >
          {t.alreadyHaveAccount}
        </button>
      </div>

    </form>
  );
}
