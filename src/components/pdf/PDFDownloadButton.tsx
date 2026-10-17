'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { useCVStore } from '@/store/useCVStore';
import { CVDocument } from './CVDocument';
import { Download } from 'lucide-react';

export default function PDFDownloadButton() {
  const { sections, theme, cvTitle } = useCVStore();

  return (
    <PDFDownloadLink
      document={<CVDocument sections={sections} theme={theme} cvTitle={cvTitle} />}
      fileName={`${cvTitle.replace(/\s+/g, '_') || 'resume'}.pdf`}
    >
      {({ loading, error }) => (
        <button
          id="btn-export-pdf"
          className="btn btn-primary btn-sm"
          disabled={loading}
          title={error ? String(error) : 'Download PDF'}
        >
          <Download size={14} />
          {loading ? 'Preparing…' : 'Export PDF'}
        </button>
      )}
    </PDFDownloadLink>
  );
}
