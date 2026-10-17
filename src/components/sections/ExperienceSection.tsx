'use client';

import { useCVStore } from '@/store/useCVStore';
import { CVSection, ExperienceEntry } from '@/types/cv';
import { Plus, Trash2, X } from 'lucide-react';

interface Props { section: CVSection; }

const uid = () => crypto.randomUUID();

export function ExperienceSection({ section }: Props) {
  const { updateSectionData } = useCVStore();
  const entries = section.data as ExperienceEntry[];

  function update(updated: ExperienceEntry[]) {
    updateSectionData(section.id, updated);
  }

  function updateEntry(id: string, field: keyof ExperienceEntry, value: unknown) {
    update(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  }

  function addEntry() {
    update([...entries, {
      id: uid(), company: '', role: '', startDate: '', endDate: '',
      current: false, location: '', bullets: [''],
    }]);
  }

  function removeEntry(id: string) {
    update(entries.filter(e => e.id !== id));
  }

  function addBullet(entryId: string) {
    update(entries.map(e => e.id === entryId ? { ...e, bullets: [...e.bullets, ''] } : e));
  }

  function updateBullet(entryId: string, idx: number, value: string) {
    update(entries.map(e =>
      e.id === entryId
        ? { ...e, bullets: e.bullets.map((b, i) => i === idx ? value : b) }
        : e
    ));
  }

  function removeBullet(entryId: string, idx: number) {
    update(entries.map(e =>
      e.id === entryId ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e
    ));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {entries.map((entry, i) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-card-actions">
            <button className="icon-btn danger" style={{ width: 24, height: 24 }} onClick={() => removeEntry(entry.id)} title="Remove entry">
              <Trash2 size={12} />
            </button>
          </div>

          <div className="field-grid">
            <div className="field-group">
              <label className="field-label">Company</label>
              <input className="field-input" value={entry.company} onChange={e => updateEntry(entry.id, 'company', e.target.value)} placeholder="Company Inc." />
            </div>
            <div className="field-group">
              <label className="field-label">Role / Title</label>
              <input className="field-input" value={entry.role} onChange={e => updateEntry(entry.id, 'role', e.target.value)} placeholder="Senior Engineer" />
            </div>
          </div>

          <div className="field-grid" style={{ marginTop: 8 }}>
            <div className="field-group">
              <label className="field-label">Start Date</label>
              <input className="field-input" type="month" value={entry.startDate} onChange={e => updateEntry(entry.id, 'startDate', e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">End Date</label>
              <input className="field-input" type="month" value={entry.endDate} onChange={e => updateEntry(entry.id, 'endDate', e.target.value)} disabled={entry.current} />
            </div>
          </div>

          <label className="field-checkbox-row" style={{ marginTop: 8 }}>
            <input type="checkbox" checked={entry.current} onChange={e => updateEntry(entry.id, 'current', e.target.checked)} />
            Currently working here
          </label>

          <div className="field-group" style={{ marginTop: 8 }}>
            <label className="field-label">Location</label>
            <input className="field-input" value={entry.location} onChange={e => updateEntry(entry.id, 'location', e.target.value)} placeholder="New York, NY" />
          </div>

          {/* Bullets */}
          <div style={{ marginTop: 10 }}>
            <label className="field-label">Bullet Points</label>
            <div className="bullet-list">
              {entry.bullets.map((bullet, idx) => (
                <div key={idx} className="bullet-row">
                  <span className="bullet-dot">●</span>
                  <textarea
                    className="bullet-input"
                    value={bullet}
                    rows={2}
                    onChange={e => updateBullet(entry.id, idx, e.target.value)}
                    placeholder="Describe an achievement or responsibility..."
                  />
                  <button
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4, marginTop: 6 }}
                    onClick={() => removeBullet(entry.id, idx)}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button className="btn-add" onClick={() => addBullet(entry.id)}>
                <Plus size={12} /> Add Bullet
              </button>
            </div>
          </div>

          {i < entries.length - 1 && <hr className="entry-divider" />}
        </div>
      ))}

      <button className="btn-add" onClick={addEntry}>
        <Plus size={13} /> Add Experience
      </button>
    </div>
  );
}
