'use client';

import { useCVStore } from '@/store/useCVStore';
import { CVSection, EducationEntry } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props { section: CVSection; }

const uid = () => crypto.randomUUID();

export function EducationSection({ section }: Props) {
  const { updateSectionData } = useCVStore();
  const entries = section.data as EducationEntry[];

  function update(updated: EducationEntry[]) {
    updateSectionData(section.id, updated);
  }

  function updateEntry(id: string, field: keyof EducationEntry, value: string) {
    update(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  }

  function addEntry() {
    update([...entries, { id: uid(), school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', location: '' }]);
  }

  function removeEntry(id: string) {
    update(entries.filter(e => e.id !== id));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-card-actions">
            <button className="icon-btn danger" style={{ width: 24, height: 24 }} onClick={() => removeEntry(entry.id)}>
              <Trash2 size={12} />
            </button>
          </div>

          <div className="field-group">
            <label className="field-label">School / University</label>
            <input className="field-input" value={entry.school} onChange={e => updateEntry(entry.id, 'school', e.target.value)} placeholder="MIT" />
          </div>

          <div className="field-grid" style={{ marginTop: 8 }}>
            <div className="field-group">
              <label className="field-label">Degree</label>
              <input className="field-input" value={entry.degree} onChange={e => updateEntry(entry.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
            </div>
            <div className="field-group">
              <label className="field-label">Field of Study</label>
              <input className="field-input" value={entry.field} onChange={e => updateEntry(entry.id, 'field', e.target.value)} placeholder="Computer Science" />
            </div>
          </div>

          <div className="field-grid" style={{ marginTop: 8 }}>
            <div className="field-group">
              <label className="field-label">Start Date</label>
              <input className="field-input" type="month" value={entry.startDate} onChange={e => updateEntry(entry.id, 'startDate', e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">End Date</label>
              <input className="field-input" type="month" value={entry.endDate} onChange={e => updateEntry(entry.id, 'endDate', e.target.value)} />
            </div>
          </div>

          <div className="field-grid" style={{ marginTop: 8 }}>
            <div className="field-group">
              <label className="field-label">GPA (optional)</label>
              <input className="field-input" value={entry.gpa} onChange={e => updateEntry(entry.id, 'gpa', e.target.value)} placeholder="3.9 / 4.0" />
            </div>
            <div className="field-group">
              <label className="field-label">Location</label>
              <input className="field-input" value={entry.location} onChange={e => updateEntry(entry.id, 'location', e.target.value)} placeholder="Cambridge, MA" />
            </div>
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addEntry}>
        <Plus size={13} /> Add Education
      </button>
    </div>
  );
}
