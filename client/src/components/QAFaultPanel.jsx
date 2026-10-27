import React from 'react';

export default function QAFaultPanel({
  faultDelay,
  setFaultDelay,
  fault500,
  setFault500,
  faultNetDrop,
  setFaultNetDrop,
  onClearStorage,
  t
}) {
  return (
    <div className="mt-6 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
        {t.qaDebugTitle}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        
        {/* Toggle Delay */}
        <button
          type="button"
          onClick={() => setFaultDelay(!faultDelay)}
          className={`text-xs font-mono py-2 px-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            faultDelay
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm'
              : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white'
          }`}
        >
          <span>{t.simulateDelay}</span>
          <span>{faultDelay ? '●' : '○'}</span>
        </button>

        {/* Toggle 500 Error */}
        <button
          type="button"
          onClick={() => setFault500(!fault500)}
          className={`text-xs font-mono py-2 px-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            fault500
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm'
              : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white'
          }`}
        >
          <span>{t.simulate500}</span>
          <span>{fault500 ? '●' : '○'}</span>
        </button>

        {/* Toggle Network Drop */}
        <button
          type="button"
          onClick={() => setFaultNetDrop(!faultNetDrop)}
          className={`text-xs font-mono py-2 px-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            faultNetDrop
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm'
              : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white'
          }`}
        >
          <span>{t.simulateNetDrop}</span>
          <span>{faultNetDrop ? '●' : '○'}</span>
        </button>

        {/* Clear Storage */}
        <button
          type="button"
          onClick={onClearStorage}
          className="text-xs font-mono py-2 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all cursor-pointer text-left"
        >
          {t.clearStorage}
        </button>

      </div>
    </div>
  );
}
