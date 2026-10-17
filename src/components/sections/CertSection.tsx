'use client';

import { useCVStore } from '@/store/useCVStore';
import { CVSection, Certification } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props { section: CVSection; }

const uid = () => crypto.randomUUID();

export function CertSection({ section }: Props) {
  const { updateSectionData } = useCVStore();
  const certs = section.data as Certification[];

  function update(updated: Certification[]) {
    updateSectionData(section.id, updated);
  }

  function updateCert(id: string, field: keyof Certification, value: string) {
    update(certs.map(c => c.id === id ? { ...c, [field]: value } : c));
  }

  function addCert() {
    update([...certs, { id: uid(), name: '', issuer: '', date: '', link: '' }]);
  }

  function removeCert(id: string) {
    update(certs.filter(c => c.id !== id));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {certs.map((cert) => (
        <div key={cert.id} className="entry-card">
          <div className="entry-card-actions">
            <button className="icon-btn danger" style={{ width: 24, height: 24 }} onClick={() => removeCert(cert.id)}>
              <Trash2 size={12} />
            </button>
          </div>

          <div className="field-group">
            <label className="field-label">Certification Name</label>
            <input className="field-input" value={cert.name} onChange={e => updateCert(cert.id, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
          </div>

          <div className="field-grid" style={{ marginTop: 8 }}>
            <div className="field-group">
              <label className="field-label">Issuing Organization</label>
              <input className="field-input" value={cert.issuer} onChange={e => updateCert(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
            </div>
            <div className="field-group">
              <label className="field-label">Issue Date</label>
              <input className="field-input" type="month" value={cert.date} onChange={e => updateCert(cert.id, 'date', e.target.value)} />
            </div>
          </div>

          <div className="field-group" style={{ marginTop: 8 }}>
            <label className="field-label">Credential URL (optional)</label>
            <input className="field-input" value={cert.link} onChange={e => updateCert(cert.id, 'link', e.target.value)} placeholder="https://..." />
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addCert}>
        <Plus size={13} /> Add Certification
      </button>
    </div>
  );
}
