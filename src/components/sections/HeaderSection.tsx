'use client';

import { useCVStore } from '@/store/useCVStore';
import { CVSection, HeaderData } from '@/types/cv';

interface Props { section: CVSection; }

export function HeaderSection({ section }: Props) {
  const { updateSectionData } = useCVStore();
  const data = section.data as HeaderData;

  function update(field: keyof HeaderData, value: string) {
    updateSectionData(section.id, { ...data, [field]: value });
  }

  return (
    <div>
      <div className="field-grid">
        <div className="field-group">
          <label className="field-label">Full Name</label>
          <input className="field-input" value={data.name} onChange={e => update('name', e.target.value)} placeholder="Jane Doe" />
        </div>
        <div className="field-group">
          <label className="field-label">Job Title</label>
          <input className="field-input" value={data.jobTitle} onChange={e => update('jobTitle', e.target.value)} placeholder="Software Engineer" />
        </div>
      </div>

      <div className="field-grid">
        <div className="field-group">
          <label className="field-label">Email</label>
          <input className="field-input" type="email" value={data.email} onChange={e => update('email', e.target.value)} placeholder="jane@email.com" />
        </div>
        <div className="field-group">
          <label className="field-label">Phone</label>
          <input className="field-input" value={data.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      <div className="field-grid">
        <div className="field-group">
          <label className="field-label">Location</label>
          <input className="field-input" value={data.location} onChange={e => update('location', e.target.value)} placeholder="New York, NY" />
        </div>
        <div className="field-group">
          <label className="field-label">LinkedIn</label>
          <input className="field-input" value={data.linkedin} onChange={e => update('linkedin', e.target.value)} placeholder="linkedin.com/in/..." />
        </div>
      </div>

      <div className="field-group" style={{ marginTop: 10 }}>
        <label className="field-label">Website / Portfolio</label>
        <input className="field-input" value={data.website} onChange={e => update('website', e.target.value)} placeholder="yourwebsite.com" />
      </div>

      <div className="field-group" style={{ marginTop: 10 }}>
        <label className="field-label">Professional Summary</label>
        <textarea
          className="field-input field-textarea"
          value={data.summary}
          onChange={e => update('summary', e.target.value)}
          placeholder="A brief summary of your career, expertise, and goals..."
          rows={4}
        />
      </div>
    </div>
  );
}
