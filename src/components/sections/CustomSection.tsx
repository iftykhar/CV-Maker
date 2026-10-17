'use client';

import { useCVStore } from '@/store/useCVStore';
import { CVSection, CustomData } from '@/types/cv';

interface Props { section: CVSection; }

export function CustomSection({ section }: Props) {
  const { updateSectionData } = useCVStore();
  const data = section.data as CustomData;

  return (
    <div>
      <label className="field-label" style={{ display: 'block', marginBottom: 6 }}>Content</label>
      <textarea
        className="field-input field-textarea"
        rows={5}
        value={data.content}
        onChange={e => updateSectionData(section.id, { content: e.target.value })}
        placeholder="Write any additional information here..."
        style={{ minHeight: 120 }}
      />
      <p className="text-muted" style={{ marginTop: 6 }}>
        Free-form text block. Will appear as a paragraph in the preview.
      </p>
    </div>
  );
}
