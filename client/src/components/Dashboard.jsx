import React, { useState } from 'react';

export default function Dashboard({ user, onLogout, logs, onResetData, t }) {
  const [metrics, setMetrics] = useState({
    total: 184,
    passed: 178,
    failed: 6,
    coverage: '99.2%'
  });

  const handleResetMetrics = () => {
    setMetrics({
      total: Math.floor(Math.random() * 40 + 170),
      passed: Math.floor(Math.random() * 20 + 160),
      failed: Math.floor(Math.random() * 6),
      coverage: `${(Math.random() * 1.5 + 98.2).toFixed(1)}%`
    });
    onResetData();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* User Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {t.dashActive}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t.dashWelcome}, {user.fullName || user.username}
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <span>{t.dashRole}: <strong className="text-black dark:text-white">{user.role}</strong></span>
            <span>&bull;</span>
            <span>Email: <strong className="text-black dark:text-white">{user.email}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="py-2.5 px-5 rounded-full font-medium text-xs tracking-tight transition-all cursor-pointer bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm"
          >
            {t.dashBtnLogout}
          </button>
          <button
            onClick={handleResetMetrics}
            className="py-2.5 px-4 rounded-full font-medium text-xs tracking-tight transition-all cursor-pointer border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white"
          >
            {t.dashBtnReset}
          </button>
        </div>
      </div>

      {/* QC Metrics Grid */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 px-1">
          {t.dashMetricsTitle}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm">
            <p className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-1">{t.dashCasesRun}</p>
            <p className="text-3xl font-mono font-bold tracking-tight">{metrics.total}</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm">
            <p className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-1">{t.dashCasesPassed}</p>
            <p className="text-3xl font-mono font-bold tracking-tight text-neutral-800 dark:text-neutral-200">{metrics.passed}</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm">
            <p className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-1">{t.dashBugsReported}</p>
            <p className="text-3xl font-mono font-bold tracking-tight">{metrics.failed}</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm">
            <p className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-1">{t.dashCoverage}</p>
            <p className="text-3xl font-mono font-bold tracking-tight">{metrics.coverage}</p>
          </div>

        </div>
      </div>

      {/* Audit Log Stream Terminal */}
      <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {t.dashAuditStream}
          </h3>
          <span className="text-[11px] font-mono text-neutral-400">Live Telemetry</span>
        </div>

        <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 max-h-56 overflow-y-auto font-mono text-xs space-y-1.5">
          {logs && logs.length > 0 ? (
            logs.map((log, idx) => (
              <div key={log.id || idx} className="flex items-start gap-2 py-1 border-b border-neutral-100 dark:border-neutral-900 last:border-0">
                <span className="text-neutral-400 select-none">
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                <span className="font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  [{log.status}]
                </span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  {log.action} &mdash; {log.details}
                </span>
              </div>
            ))
          ) : (
            <p className="text-neutral-400 italic">No events recorded yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
