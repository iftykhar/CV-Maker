'use client';

import { useCVStore } from '@/store/useCVStore';
import {
  CVSection,
  CVTheme,
  HeaderData,
  ExperienceEntry,
  EducationEntry,
  Skill,
  Project,
  Certification,
  Language,
  CustomData,
} from '@/types/cv';

/* ─── Utility ─────────────────────────────────────── */
function fmtDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  if (!y || !m) return dateStr;
  const date = new Date(Number(y), Number(m) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/* ─── Theme styles ────────────────────────────────── */
type ThemeStyles = {
  nameColor: string;
  nameFontSize: number;
  nameLetterSpacing: string;
  jobTitleColor: string;
  headerBg: string;
  headerPadding: string;
  contactColor: string;
  sectionTitleStyle: React.CSSProperties;
  sectionDivider: React.CSSProperties;
  bodyFont: string;
  lineHeight: number;
  accentBar: string | null;
};

function getThemeStyles(theme: CVTheme): ThemeStyles {
  const accent = theme.accentColor;

  switch (theme.name) {
    case 'classic':
      return {
        nameColor: '#1a1a2e',
        nameFontSize: 28,
        nameLetterSpacing: '0.02em',
        jobTitleColor: accent,
        headerBg: 'transparent',
        headerPadding: '32px 40px 20px',
        contactColor: '#555',
        sectionTitleStyle: {
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: accent,
          borderBottom: `2px solid ${accent}`,
          paddingBottom: 4,
          marginBottom: 10,
        },
        sectionDivider: { borderTop: 'none', margin: '16px 0' },
        bodyFont: 'Georgia, serif',
        lineHeight: 1.55,
        accentBar: null,
      };

    case 'minimal':
      return {
        nameColor: '#111',
        nameFontSize: 32,
        nameLetterSpacing: '-0.01em',
        jobTitleColor: '#666',
        headerBg: 'transparent',
        headerPadding: '36px 40px 20px',
        contactColor: '#888',
        sectionTitleStyle: {
          fontSize: 13,
          fontWeight: 600,
          color: '#111',
          borderBottom: '1px solid #e5e5e5',
          paddingBottom: 6,
          marginBottom: 12,
        },
        sectionDivider: { borderTop: 'none', margin: '18px 0' },
        bodyFont: "'Inter', 'Helvetica Neue', sans-serif",
        lineHeight: 1.6,
        accentBar: null,
      };

    case 'modern':
    default:
      return {
        nameColor: '#fff',
        nameFontSize: 26,
        nameLetterSpacing: '0.01em',
        jobTitleColor: `${accent}cc`,
        headerBg: `linear-gradient(135deg, #1a1a2e 0%, ${accent}dd 100%)`,
        headerPadding: '32px 40px',
        contactColor: '#ccc',
        sectionTitleStyle: {
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: accent,
          paddingBottom: 4,
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        },
        sectionDivider: { borderTop: 'none', margin: '14px 0' },
        bodyFont: "'Inter', system-ui, sans-serif",
        lineHeight: 1.55,
        accentBar: accent,
      };
  }
}

/* ─── Section Renderers ───────────────────────────── */
function PreviewHeader({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  const d = section.data as HeaderData;
  return (
    <div style={{ background: ts.headerBg, padding: ts.headerPadding }}>
      <h1 style={{ fontSize: ts.nameFontSize, fontWeight: 700, color: ts.nameColor, letterSpacing: ts.nameLetterSpacing, lineHeight: 1.1, margin: 0 }}>
        {d.name || 'Your Name'}
      </h1>
      {d.jobTitle && (
        <p style={{ fontSize: 15, color: ts.jobTitleColor, marginTop: 4, fontWeight: 500 }}>
          {d.jobTitle}
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px', marginTop: 12, fontSize: 12, color: ts.contactColor }}>
        {d.email    && <span>✉ {d.email}</span>}
        {d.phone    && <span>📞 {d.phone}</span>}
        {d.location && <span>📍 {d.location}</span>}
        {d.linkedin && <span>🔗 {d.linkedin}</span>}
        {d.website  && <span>🌐 {d.website}</span>}
      </div>
      {d.summary && (
        <p style={{ marginTop: 14, fontSize: 13, color: ts.name === 'modern' ? '#ddd' : '#444', lineHeight: ts.lineHeight, maxWidth: 600 }}>
          {d.summary}
        </p>
      )}
    </div>
  );
}

function SectionHeading({ title, ts }: { title: string; ts: ThemeStyles }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      {ts.accentBar && (
        <div style={{ width: 3, height: 16, borderRadius: 2, background: ts.accentBar, flexShrink: 0 }} />
      )}
      <div style={{ ...ts.sectionTitleStyle, flex: 1, margin: 0, paddingBottom: (ts.sectionTitleStyle.paddingBottom as number) ?? 0 }}>
        {title}
      </div>
    </div>
  );
}

function PreviewExperience({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  const entries = section.data as ExperienceEntry[];
  return (
    <div>
      <SectionHeading title={section.title} ts={ts} />
      {entries.map((e) => (
        <div key={e.id} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>{e.role}</p>
              <p style={{ fontSize: 13, color: '#555', margin: '2px 0 0' }}>{e.company}{e.location ? ` · ${e.location}` : ''}</p>
            </div>
            <p style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', marginLeft: 8, marginTop: 2 }}>
              {fmtDate(e.startDate)} – {e.current ? 'Present' : fmtDate(e.endDate)}
            </p>
          </div>
          {e.bullets.filter(Boolean).length > 0 && (
            <ul style={{ margin: '6px 0 0 0', paddingLeft: 18, fontSize: 12, color: '#444', lineHeight: ts.lineHeight }}>
              {e.bullets.filter(Boolean).map((b, i) => (
                <li key={i} style={{ marginBottom: 2 }}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function PreviewEducation({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  const entries = section.data as EducationEntry[];
  return (
    <div>
      <SectionHeading title={section.title} ts={ts} />
      {entries.map((e) => (
        <div key={e.id} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>{e.school}</p>
              <p style={{ fontSize: 13, color: '#555', margin: '2px 0 0' }}>
                {e.degree}{e.field ? ` in ${e.field}` : ''}{e.location ? ` · ${e.location}` : ''}
              </p>
              {e.gpa && <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0' }}>GPA: {e.gpa}</p>}
            </div>
            <p style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', marginLeft: 8 }}>
              {fmtDate(e.startDate)}{e.endDate ? ` – ${fmtDate(e.endDate)}` : ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewSkills({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  const skills = section.data as Skill[];
  const byCategory: Record<string, Skill[]> = {};
  skills.forEach(s => {
    if (!byCategory[s.category]) byCategory[s.category] = [];
    byCategory[s.category].push(s);
  });

  return (
    <div>
      <SectionHeading title={section.title} ts={ts} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Object.entries(byCategory).map(([cat, items]) => (
          <div key={cat} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#888', minWidth: 70, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {cat}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {items.map(s => (
                <span key={s.id} style={{
                  fontSize: 11,
                  padding: '3px 9px',
                  borderRadius: 99,
                  background: `${ts.accentBar ?? ts.sectionTitleStyle.color}18`,
                  color: String(ts.sectionTitleStyle.color),
                  fontWeight: 500,
                  border: `1px solid ${ts.accentBar ?? ts.sectionTitleStyle.color}30`,
                }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewProjects({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  const projects = section.data as Project[];
  return (
    <div>
      <SectionHeading title={section.title} ts={ts} />
      {projects.map((p) => (
        <div key={p.id} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>{p.name}</p>
            {p.link && <span style={{ fontSize: 11, color: String(ts.sectionTitleStyle.color) }}>↗ {p.link}</span>}
            {p.github && <span style={{ fontSize: 11, color: '#888' }}>⌥ {p.github}</span>}
          </div>
          {p.description && <p style={{ fontSize: 12, color: '#444', margin: '4px 0', lineHeight: ts.lineHeight }}>{p.description}</p>}
          {p.technologies.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
              {p.technologies.map((t, i) => (
                <span key={i} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#f0f0f4', color: '#555', fontFamily: 'monospace' }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PreviewCerts({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  const certs = section.data as Certification[];
  return (
    <div>
      <SectionHeading title={section.title} ts={ts} />
      {certs.map((c) => (
        <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>{c.name}</p>
            <p style={{ fontSize: 12, color: '#666', margin: '1px 0 0' }}>{c.issuer}</p>
          </div>
          <p style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', marginLeft: 8 }}>{fmtDate(c.date)}</p>
        </div>
      ))}
    </div>
  );
}

function PreviewLanguages({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  const langs = section.data as Language[];
  const PROF_WIDTH: Record<string, string> = {
    Native: '100%', Fluent: '85%', Advanced: '70%', Intermediate: '50%', Basic: '30%',
  };
  return (
    <div>
      <SectionHeading title={section.title} ts={ts} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px 24px' }}>
        {langs.map((l) => (
          <div key={l.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{l.name}</span>
              <span style={{ fontSize: 11, color: '#888' }}>{l.proficiency}</span>
            </div>
            <div style={{ height: 3, background: '#e8e8ef', borderRadius: 99 }}>
              <div style={{
                height: '100%',
                width: PROF_WIDTH[l.proficiency] ?? '50%',
                background: ts.accentBar ?? String(ts.sectionTitleStyle.color),
                borderRadius: 99,
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCustom({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  const data = section.data as CustomData;
  return (
    <div>
      <SectionHeading title={section.title} ts={ts} />
      <p style={{ fontSize: 13, color: '#444', lineHeight: ts.lineHeight }}>{data.content}</p>
    </div>
  );
}

function RenderSection({ section, ts }: { section: CVSection; ts: ThemeStyles }) {
  if (!section.visible) return null;
  switch (section.type) {
    case 'header':         return <PreviewHeader section={section} ts={ts} />;
    case 'experience':     return <PreviewExperience section={section} ts={ts} />;
    case 'education':      return <PreviewEducation section={section} ts={ts} />;
    case 'skills':         return <PreviewSkills section={section} ts={ts} />;
    case 'projects':       return <PreviewProjects section={section} ts={ts} />;
    case 'certifications': return <PreviewCerts section={section} ts={ts} />;
    case 'languages':      return <PreviewLanguages section={section} ts={ts} />;
    case 'custom':         return <PreviewCustom section={section} ts={ts} />;
    default:               return null;
  }
}

/* ─── Main Preview ────────────────────────────────── */
export function CVPreview() {
  const { sections, theme } = useCVStore();
  const ts = getThemeStyles(theme);

  const headerSection = sections.find(s => s.type === 'header' && s.visible);
  const contentSections = sections.filter(s => s.type !== 'header' && s.visible);

  return (
    <div style={{ fontFamily: ts.bodyFont, fontSize: 13, color: '#333', lineHeight: ts.lineHeight, minHeight: 1123 }}>
      {/* Header */}
      {headerSection && <PreviewHeader section={headerSection} ts={ts} />}

      {/* Body sections */}
      <div style={{ padding: headerSection ? '20px 40px 40px' : '40px' }}>
        {contentSections.map((section, idx) => (
          <div key={section.id}>
            <RenderSection section={section} ts={ts} />
            {idx < contentSections.length - 1 && (
              <div style={{ borderTop: '1px solid #e8e8ef', margin: '18px 0' }} />
            )}
          </div>
        ))}

        {/* Hidden sections notice */}
        {sections.filter(s => !s.visible).length > 0 && (
          <div style={{ marginTop: 20, padding: '8px 12px', background: '#f9f9fc', border: '1px dashed #ccc', borderRadius: 4, fontSize: 11, color: '#aaa' }}>
            {sections.filter(s => !s.visible).length} hidden section(s) · toggle eye icon in editor to show
          </div>
        )}
      </div>
    </div>
  );
}
