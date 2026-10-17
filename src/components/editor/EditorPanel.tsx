'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCVStore } from '@/store/useCVStore';
import { SectionCard } from './SectionCard';
import { SectionPalette } from './SectionPalette';
import { CVSection } from '@/types/cv';
import { GripVertical } from 'lucide-react';

export function EditorPanel() {
  const { sections, reorderSections } = useCVStore();
  const [activeSection, setActiveSection] = useState<CVSection | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function handleDragStart(e: DragStartEvent) {
    const s = sections.find((sec) => sec.id === e.active.id);
    setActiveSection(s ?? null);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveSection(null);
    if (over && active.id !== over.id) {
      reorderSections(String(active.id), String(over.id));
    }
  }

  return (
    <div className="editor-scroll">
      <SectionPalette />
      <hr className="divider" />
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', padding: '4px 2px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <GripVertical size={12} /> Sections · Drag to reorder
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeSection ? (
            <div className="section-card drag-overlay" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <GripVertical size={14} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{activeSection.title}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {sections.length === 0 && (
        <div className="empty-state">
          No sections yet. Add one from the palette above.
        </div>
      )}
    </div>
  );
}
