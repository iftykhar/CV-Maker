'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { SectionType } from '@/types/cv';
import {
  User,
  Briefcase,
  GraduationCap,
  Zap,
  FolderOpen,
  Award,
  Globe,
  FileText,
  ChevronDown,
  Plus,
} from 'lucide-react';

const SECTIONS: { type: SectionType; label: string; icon: React.ReactNode; color: string }[] = [
  { type: 'header',         label: 'Header',         icon: <User size={13} />,          color: '#6366f1' },
  { type: 'experience',     label: 'Experience',     icon: <Briefcase size={13} />,      color: '#8b5cf6' },
  { type: 'education',      label: 'Education',      icon: <GraduationCap size={13} />,  color: '#06b6d4' },
  { type: 'skills',         label: 'Skills',         icon: <Zap size={13} />,            color: '#f59e0b' },
  { type: 'projects',       label: 'Projects',       icon: <FolderOpen size={13} />,     color: '#10b981' },
  { type: 'certifications', label: 'Certifications', icon: <Award size={13} />,          color: '#f43f5e' },
  { type: 'languages',      label: 'Languages',      icon: <Globe size={13} />,          color: '#3b82f6' },
  { type: 'custom',         label: 'Custom',         icon: <FileText size={13} />,       color: '#a3a3a3' },
];

export function SectionPalette() {
  const { addSection } = useCVStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="palette-section">
      <button
        className="palette-toggle"
        onClick={() => setOpen((p) => !p)}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Plus size={14} style={{ color: 'var(--accent)' }} />
          Add Section
        </span>
        <ChevronDown
          size={14}
          style={{
            color: 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {open && (
        <div className="palette-grid">
          {SECTIONS.map((s) => (
            <button
              key={s.type}
              id={`add-${s.type}`}
              className="palette-btn"
              onClick={() => {
                addSection(s.type);
                setOpen(false);
              }}
            >
              <span style={{ color: s.color }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
