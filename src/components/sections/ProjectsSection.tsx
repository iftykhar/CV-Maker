'use client';

import { useCVStore } from '@/store/useCVStore';
import { CVSection, Project } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props { section: CVSection; }

const uid = () => crypto.randomUUID();

export function ProjectsSection({ section }: Props) {
  const { updateSectionData } = useCVStore();
  const projects = section.data as Project[];

  function update(updated: Project[]) {
    updateSectionData(section.id, updated);
  }

  function updateProject(id: string, field: keyof Project, value: unknown) {
    update(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  }

  function addProject() {
    update([...projects, { id: uid(), name: '', description: '', technologies: [], link: '', github: '' }]);
  }

  function removeProject(id: string) {
    update(projects.filter(p => p.id !== id));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {projects.map((project) => (
        <div key={project.id} className="entry-card">
          <div className="entry-card-actions">
            <button className="icon-btn danger" style={{ width: 24, height: 24 }} onClick={() => removeProject(project.id)}>
              <Trash2 size={12} />
            </button>
          </div>

          <div className="field-group">
            <label className="field-label">Project Name</label>
            <input className="field-input" value={project.name} onChange={e => updateProject(project.id, 'name', e.target.value)} placeholder="My Awesome Project" />
          </div>

          <div className="field-group" style={{ marginTop: 8 }}>
            <label className="field-label">Description</label>
            <textarea
              className="field-input field-textarea"
              rows={3}
              value={project.description}
              onChange={e => updateProject(project.id, 'description', e.target.value)}
              placeholder="Brief description of the project, its purpose, and impact..."
            />
          </div>

          <div className="field-group" style={{ marginTop: 8 }}>
            <label className="field-label">Technologies (comma-separated)</label>
            <input
              className="field-input"
              value={project.technologies.join(', ')}
              onChange={e => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>

          <div className="field-grid" style={{ marginTop: 8 }}>
            <div className="field-group">
              <label className="field-label">Live URL</label>
              <input className="field-input" value={project.link} onChange={e => updateProject(project.id, 'link', e.target.value)} placeholder="myproject.com" />
            </div>
            <div className="field-group">
              <label className="field-label">GitHub URL</label>
              <input className="field-input" value={project.github} onChange={e => updateProject(project.id, 'github', e.target.value)} placeholder="github.com/..." />
            </div>
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={addProject}>
        <Plus size={13} /> Add Project
      </button>
    </div>
  );
}
