'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { CVPreview } from '@/components/preview/CVPreview';
import { ThemePicker } from '@/components/preview/ThemePicker';
import { useCVStore } from '@/store/useCVStore';
import {
  FileText,
  Undo2,
  Redo2,
  RotateCcw,
  Edit3,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const PDFDownloadButton = dynamic(
  () => import('@/components/pdf/PDFDownloadButton'),
  { ssr: false, loading: () => <button className="btn btn-primary btn-sm" disabled>Export PDF</button> }
);

export default function Home() {
  const { cvTitle, setCvTitle, undo, redo, canUndo, canRedo, resetToDefault } =
    useCVStore();
  const [editorCollapsed, setEditorCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  return (
    <div className="app-shell">
      {/* ── Navbar ── */}
      <header className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <FileText size={18} />
            <span>CV Maker</span>
          </div>
          <input
            id="cv-title"
            className="cv-title-input"
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            placeholder="Untitled Resume"
          />
        </div>

        <div className="navbar-center">
          <div className="mobile-tabs">
            <button
              id="tab-editor"
              className={`mobile-tab ${mobileView === 'editor' ? 'active' : ''}`}
              onClick={() => setMobileView('editor')}
            >
              <Edit3 size={13} /> Editor
            </button>
            <button
              id="tab-preview"
              className={`mobile-tab ${mobileView === 'preview' ? 'active' : ''}`}
              onClick={() => setMobileView('preview')}
            >
              <Eye size={13} /> Preview
            </button>
          </div>
        </div>

        <div className="navbar-right">
          <button
            id="btn-undo"
            className="icon-btn"
            onClick={undo}
            disabled={!canUndo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={15} />
          </button>
          <button
            id="btn-redo"
            className="icon-btn"
            onClick={redo}
            disabled={!canRedo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={15} />
          </button>
          <button
            id="btn-reset"
            className="icon-btn danger"
            onClick={() => {
              if (confirm('Reset to default resume? All changes will be lost.'))
                resetToDefault();
            }}
            title="Reset to default"
          >
            <RotateCcw size={15} />
          </button>
          <ThemePicker />
          <PDFDownloadButton />
        </div>
      </header>

      {/* ── Main ── */}
      <div className="main-content">
        <aside
          className={`editor-sidebar${editorCollapsed ? ' collapsed' : ''}${
            mobileView !== 'editor' ? ' mobile-hidden' : ''
          }`}
        >
          <EditorPanel />
          <button
            className="collapse-btn"
            onClick={() => setEditorCollapsed((p) => !p)}
            title={editorCollapsed ? 'Expand editor' : 'Collapse editor'}
          >
            {editorCollapsed ? (
              <ChevronRight size={14} />
            ) : (
              <ChevronLeft size={14} />
            )}
          </button>
        </aside>

        <main
          className={`preview-area${
            mobileView !== 'preview' ? ' mobile-hidden' : ''
          }`}
        >
          <div className="preview-toolbar">
            <Eye size={13} /> Live Preview · A4 Format
          </div>
          <div className="preview-paper">
            <CVPreview />
          </div>
        </main>
      </div>
    </div>
  );
}
