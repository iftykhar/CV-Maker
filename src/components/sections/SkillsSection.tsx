'use client';

import { useCVStore } from '@/store/useCVStore';
import { CVSection, Skill } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props { section: CVSection; }

const uid = () => crypto.randomUUID();
const CATEGORIES = ['Frontend', 'Backend', 'Languages', 'Databases', 'DevOps', 'Tools', 'Other'];

export function SkillsSection({ section }: Props) {
  const { updateSectionData } = useCVStore();
  const skills = section.data as Skill[];

  function update(updated: Skill[]) {
    updateSectionData(section.id, updated);
  }

  function updateSkill(id: string, field: keyof Skill, value: unknown) {
    update(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
  }

  function addSkill() {
    update([...skills, { id: uid(), name: '', category: 'Other', level: 3 }]);
  }

  function removeSkill(id: string) {
    update(skills.filter(s => s.id !== id));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 60px 24px', gap: 6, padding: '0 0 4px' }}>
        <span className="field-label">Skill</span>
        <span className="field-label">Category</span>
        <span className="field-label">Level</span>
        <span />
      </div>

      {skills.map((skill) => (
        <div key={skill.id} className="skill-row">
          <input
            className="field-input"
            value={skill.name}
            onChange={e => updateSkill(skill.id, 'name', e.target.value)}
            placeholder="e.g. React"
            style={{ fontSize: 12, padding: '5px 8px' }}
          />
          <select
            className="proficiency-select"
            value={skill.category}
            onChange={e => updateSkill(skill.id, 'category', e.target.value)}
            style={{ width: '100%' }}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="skill-level-btns">
            {[1, 2, 3, 4, 5].map(lvl => (
              <button
                key={lvl}
                className={`skill-dot${skill.level >= lvl ? ' filled' : ''}`}
                onClick={() => updateSkill(skill.id, 'level', lvl)}
                title={`Level ${lvl}`}
              />
            ))}
          </div>
          <button
            className="icon-btn danger"
            style={{ width: 24, height: 24 }}
            onClick={() => removeSkill(skill.id)}
          >
            <Trash2 size={11} />
          </button>
        </div>
      ))}

      <button className="btn-add" onClick={addSkill}>
        <Plus size={13} /> Add Skill
      </button>
    </div>
  );
}
