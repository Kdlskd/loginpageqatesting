import React from 'react';

export default function QAPresets({ onSelectPreset, t }) {
  const presets = [
    {
      id: 'valid',
      label: t.presetValid,
      identifier: 'tester@qa-matrix.com',
      password: 'SecretPass123!'
    },
    {
      id: 'admin',
      label: t.presetAdmin,
      identifier: 'admin@qa-matrix.com',
      password: 'AdminRoot2026#'
    },
    {
      id: 'locked',
      label: t.presetLocked,
      identifier: 'locked@qa-matrix.com',
      password: 'LockedPass999!'
    },
    {
      id: 'invalid',
      label: t.presetInvalid,
      identifier: 'notfound@qa-matrix.com',
      password: 'InvalidPassword123'
    },
    {
      id: 'sqli',
      label: t.presetSqli,
      identifier: "' OR '1'='1",
      password: "' OR '1'='1"
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mb-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {t.qaPresetsTitle}
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
          {t.qaPresetsSubtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset.identifier, preset.password, preset.label)}
            className="text-xs font-mono py-1.5 px-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white transition-all cursor-pointer active:scale-95"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
