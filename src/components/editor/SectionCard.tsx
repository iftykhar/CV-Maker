'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCVStore } from '@/store/useCVStore';
import { CVSection } from '@/types/cv';
import { HeaderSection } from '@/components/sections/HeaderSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CertSection } from '@/components/sections/CertSection';
import { LanguagesSection } from '@/components/sections/LanguagesSection';
import { CustomSection } from '@/components/sections/CustomSection';
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Trash2,
} from 'lucide-react';

const TYPE_COLORS: Record<string, string> = {
  header:         '#6366f1',
  experience:     '#8b5cf6',
  education:      '#06b6d4',
  skills:         '#f59e0b',
  projects:       '#10b981',
  certifications: '#f43f5e',
  languages:      '#3b82f6',
  custom:         '#a3a3a3',
};

function SectionBody({ section }: { section: CVSection }) {
  switch (section.type) {
    case 'header':         return <HeaderSection section={section} />;
    case 'experience':     return <ExperienceSection section={section} />;
    case 'education':      return <EducationSection section={section} />;
    case 'skills':         return <SkillsSection section={section} />;
    case 'projects':       return <ProjectsSection section={section} />;
    case 'certifications': return <CertSection section={section} />;
    case 'languages':      return <LanguagesSection section={section} />;
    case 'custom':         return <CustomSection section={section} />;
    default:               return null;
  }
}

interface Props { section: CVSection; }

export function SectionCard({ section }: Props) {
  const { removeSection, toggleVisibility, updateSectionTitle } = useCVStore();
  const [expanded, setExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const accentColor = TYPE_COLORS[section.type] ?? 'var(--accent)';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`section-card animate-fade${isDragging ? ' dragging' : ''}`}
    >
      {/* Card header */}
      <div
        className="section-card-header"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Drag handle */}
        <span
          className="drag-handle"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={14} />
        </span>

        {/* Type badge */}
        <span
          className="section-type-badge"
          style={{ background: `${accentColor}22`, color: accentColor }}
        >
          {section.type}
        </span>

        {/* Editable title */}
        <input
          className="section-title-edit"
          value={section.title}
          onChange={(e) => updateSectionTitle(section.id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Actions */}
        <div
          className="section-card-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={`icon-btn${section.visible ? '' : ' active'}`}
            onClick={() => toggleVisibility(section.id)}
            title={section.visible ? 'Hide section' : 'Show section'}
            style={{ width: 26, height: 26 }}
          >
            {section.visible ? <Eye size={13} /> : <EyeOff size={13} />}
          </button>
          <button
            className="icon-btn danger"
            onClick={() => {
              if (confirm(`Delete "${section.title}"?`)) removeSection(section.id);
            }}
            title="Delete section"
            style={{ width: 26, height: 26 }}
          >
            <Trash2 size={13} />
          </button>
          <button
            className="icon-btn"
            style={{ width: 26, height: 26 }}
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* Card body */}
      {expanded && (
        <div className="section-card-body">
          <SectionBody section={section} />
        </div>
      )}
    </div>
  );
}
