'use client';

import { useCVStore } from '@/store/useCVStore';
import { CVSection, Language } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props { section: CVSection; }

const uid = () => crypto.randomUUID();
const PROFICIENCIES = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'] as const;

const PROF_COLORS: Record<string, string> = {
  Native:       '#6366f1',
  Fluent:       '#8b5cf6',
  Advanced:     '#06b6d4',
  Intermediate: '#f59e0b',
  Basic:        '#6b7280',
};

export function LanguagesSection({ section }: Props) {
  const { updateSectionData } = useCVStore();
  const languages = section.data as Language[];

  function update(updated: Language[]) {
    updateSectionData(section.id, updated);
  }

  function updateLang(id: string, field: keyof Language, value: string) {
    update(languages.map(l => l.id === id ? { ...l, [field]: value } : l));
  }

  function addLanguage() {
    update([...languages, { id: uid(), name: '', proficiency: 'Intermediate' }]);
  }

  function removeLang(id: string) {
    update(languages.filter(l => l.id !== id));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {languages.map((lang) => (
        <div key={lang.id} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 24px', gap: 8, alignItems: 'center' }}>
          <input
            className="field-input"
            value={lang.name}
            onChange={e => updateLang(lang.id, 'name', e.target.value)}
            placeholder="English"
            style={{ fontSize: 13 }}
          />
          <select
            className="proficiency-select"
            value={lang.proficiency}
            onChange={e => updateLang(lang.id, 'proficiency', e.target.value)}
            style={{ color: PROF_COLORS[lang.proficiency] ?? 'inherit' }}
          >
            {PROFICIENCIES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button className="icon-btn danger" style={{ width: 24, height: 24 }} onClick={() => removeLang(lang.id)}>
            <Trash2 size={11} />
          </button>
        </div>
      ))}

      <button className="btn-add" onClick={addLanguage}>
        <Plus size={13} /> Add Language
      </button>
    </div>
  );
}
