'use client';

import { useState, useRef, useEffect } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { CVThemeName } from '@/types/cv';
import { Palette, Check } from 'lucide-react';

const THEMES: { name: CVThemeName; label: string; description: string }[] = [
  { name: 'modern',  label: 'Modern',  description: 'Bold & colorful' },
  { name: 'classic', label: 'Classic', description: 'Traditional serif' },
  { name: 'minimal', label: 'Minimal', description: 'Ultra clean' },
];

const ACCENT_COLORS = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f43f5e', // rose
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#14b8a6', // teal
  '#64748b', // slate
  '#1a1a2e', // navy
];

export function ThemePicker() {
  const { theme, setTheme } = useCVStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="theme-picker-dropdown" ref={ref}>
      <button
        id="btn-theme"
        className={`icon-btn${open ? ' active' : ''}`}
        onClick={() => setOpen((p) => !p)}
        title="Theme & colors"
        style={{ width: 'auto', padding: '0 10px', gap: 6, fontSize: 13 }}
      >
        <Palette size={14} />
        <span style={{ display: 'none', '@media(min-width:768px)': { display: 'inline' } } as React.CSSProperties}>
          Theme
        </span>
      </button>

      {open && (
        <div className="theme-picker-panel">
          <p className="theme-picker-title">Layout Theme</p>
          <div className="theme-grid">
            {THEMES.map((t) => (
              <button
                key={t.name}
                className={`theme-btn${theme.name === t.name ? ' active' : ''}`}
                onClick={() => setTheme({ name: t.name })}
              >
                {theme.name === t.name && (
                  <Check size={12} style={{ display: 'block', margin: '0 auto 4px', color: 'var(--accent)' }} />
                )}
                <div style={{ fontWeight: 600 }}>{t.label}</div>
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{t.description}</div>
              </button>
            ))}
          </div>

          <p className="theme-picker-title" style={{ marginTop: 4 }}>Accent Color</p>
          <div className="color-swatches">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color}
                className={`color-swatch${theme.accentColor === color ? ' active' : ''}`}
                style={{ background: color }}
                onClick={() => setTheme({ accentColor: color })}
                title={color}
              />
            ))}
          </div>

          {/* Custom color */}
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Custom
            </label>
            <input
              type="color"
              value={theme.accentColor}
              onChange={e => setTheme({ accentColor: e.target.value })}
              style={{ width: 28, height: 28, padding: 2, border: '1px solid var(--border)', borderRadius: 4, background: 'transparent', cursor: 'pointer' }}
            />
            <code style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{theme.accentColor}</code>
          </div>
        </div>
      )}
    </div>
  );
}
