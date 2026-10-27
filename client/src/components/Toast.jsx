import React from 'react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between p-3.5 px-4 rounded-xl text-sm font-medium border shadow-lg backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2 bg-neutral-900/95 text-white border-neutral-700 dark:bg-neutral-100/95 dark:text-black dark:border-neutral-300"
        >
          <span className="leading-snug pr-3">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-xs opacity-70 hover:opacity-100 transition-opacity p-1 cursor-pointer font-bold"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
