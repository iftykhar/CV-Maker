'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { arrayMove } from '@dnd-kit/sortable';
import { CVSection, CVTheme, SectionType, SectionData } from '@/types/cv';
import { createDefaultSection, DEFAULT_SECTIONS } from '@/lib/defaultSections';

interface HistoryEntry {
  sections: CVSection[];
}

interface CVStore {
  sections: CVSection[];
  theme: CVTheme;
  cvTitle: string;
  history: HistoryEntry[];
  historyIndex: number;

  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  updateSectionData: (id: string, data: SectionData) => void;
  updateSectionTitle: (id: string, title: string) => void;
  toggleVisibility: (id: string) => void;
  setTheme: (theme: Partial<CVTheme>) => void;
  setCvTitle: (title: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  resetToDefault: () => void;
}

const INITIAL_THEME: CVTheme = { name: 'modern', accentColor: '#6366f1' };

function pushHistory(history: HistoryEntry[], historyIndex: number, sections: CVSection[]) {
  const newHistory = history.slice(0, historyIndex + 1);
  newHistory.push({ sections });
  return { history: newHistory, historyIndex: newHistory.length - 1 };
}

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      sections: DEFAULT_SECTIONS,
      theme: INITIAL_THEME,
      cvTitle: 'My Resume',
      history: [{ sections: DEFAULT_SECTIONS }],
      historyIndex: 0,

      addSection: (type) => {
        const newSection = createDefaultSection(type);
        const newSections = [...get().sections, newSection];
        const { history, historyIndex } = get();
        set({ sections: newSections, ...pushHistory(history, historyIndex, newSections) });
      },

      removeSection: (id) => {
        const newSections = get().sections.filter((s) => s.id !== id);
        const { history, historyIndex } = get();
        set({ sections: newSections, ...pushHistory(history, historyIndex, newSections) });
      },

      reorderSections: (activeId, overId) => {
        const sections = get().sections;
        const oldIndex = sections.findIndex((s) => s.id === activeId);
        const newIndex = sections.findIndex((s) => s.id === overId);
        if (oldIndex === -1 || newIndex === -1) return;
        const newSections = arrayMove(sections, oldIndex, newIndex);
        const { history, historyIndex } = get();
        set({ sections: newSections, ...pushHistory(history, historyIndex, newSections) });
      },

      updateSectionData: (id, data) => {
        set((state) => ({
          sections: state.sections.map((s) => (s.id === id ? { ...s, data } : s)),
        }));
      },

      updateSectionTitle: (id, title) => {
        set((state) => ({
          sections: state.sections.map((s) => (s.id === id ? { ...s, title } : s)),
        }));
      },

      toggleVisibility: (id) => {
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === id ? { ...s, visible: !s.visible } : s
          ),
        }));
      },

      setTheme: (theme) => {
        set((state) => ({ theme: { ...state.theme, ...theme } }));
      },

      setCvTitle: (title) => set({ cvTitle: title }),

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          set({ sections: history[newIndex].sections, historyIndex: newIndex });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          set({ sections: history[newIndex].sections, historyIndex: newIndex });
        }
      },

      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,

      resetToDefault: () =>
        set({
          sections: DEFAULT_SECTIONS,
          history: [{ sections: DEFAULT_SECTIONS }],
          historyIndex: 0,
          theme: INITIAL_THEME,
          cvTitle: 'My Resume',
        }),
    }),
    {
      name: 'cv-maker-v1',
      version: 1,
    }
  )
);
