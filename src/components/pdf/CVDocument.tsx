import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
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

/* ─── Helpers ─────────────────────────────────────── */
function fmtDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  if (!y || !m) return dateStr;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[Number(m) - 1]} ${y}`;
}

/* ─── Styles ──────────────────────────────────────── */
function makeStyles(accent: string) {
  return StyleSheet.create({
    page: { fontFamily: 'Helvetica', fontSize: 10, color: '#333', backgroundColor: '#fff' },
    header: { backgroundColor: accent, padding: '24 32 20', color: '#fff' },
    headerName: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#fff', letterSpacing: 0.5 },
    headerTitle: { fontSize: 12, color: '#ffffffcc', marginTop: 3 },
    headerContact: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
    headerContactItem: { fontSize: 9, color: '#ffffffaa' },
    headerSummary: { fontSize: 9.5, color: '#ffffffdd', marginTop: 10, lineHeight: 1.5, maxWidth: 440 },
    body: { padding: '16 32 32' },
    section: { marginBottom: 14 },
    sectionTitle: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      color: accent,
      borderBottomWidth: 1,
      borderBottomColor: `${accent}55`,
      paddingBottom: 3,
      marginBottom: 8,
    },
    divider: { borderTopWidth: 0.5, borderTopColor: '#e8e8ef', marginVertical: 10 },
    entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#1a1a2e' },
    entrySubtitle: { fontSize: 9.5, color: '#555' },
    entryDate: { fontSize: 9, color: '#888' },
    bullet: { flexDirection: 'row', marginTop: 2, marginLeft: 8 },
    bulletDot: { width: 10, fontSize: 9, color: accent },
    bulletText: { flex: 1, fontSize: 9.5, color: '#444', lineHeight: 1.45 },
    skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
    skillTag: {
      fontSize: 9,
      padding: '2 7',
      borderRadius: 10,
      backgroundColor: `${accent}18`,
      color: accent,
    },
    langRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    langName: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#333' },
    langProf: { fontSize: 9, color: '#888' },
    langBar: { marginTop: 2, height: 2, backgroundColor: '#e8e8ef', borderRadius: 1 },
    langFill: { height: 2, backgroundColor: accent, borderRadius: 1 },
    techBadge: { fontSize: 8, padding: '1 5', backgroundColor: '#f0f0f4', color: '#555', marginRight: 3, marginTop: 2 },
    customText: { fontSize: 9.5, color: '#444', lineHeight: 1.5 },
  });
}

const PROF_WIDTH: Record<string, number> = {
  Native: 1, Fluent: 0.85, Advanced: 0.7, Intermediate: 0.5, Basic: 0.3,
};

/* ─── Section Renderers ───────────────────────────── */
function PDFHeader({ section, s }: { section: CVSection; s: ReturnType<typeof makeStyles> }) {
  const d = section.data as HeaderData;
  return (
    <View style={s.header}>
      <Text style={s.headerName}>{d.name}</Text>
      {d.jobTitle ? <Text style={s.headerTitle}>{d.jobTitle}</Text> : null}
      <View style={s.headerContact}>
        {d.email    ? <Text style={s.headerContactItem}>✉ {d.email}</Text> : null}
        {d.phone    ? <Text style={s.headerContactItem}>☏ {d.phone}</Text> : null}
        {d.location ? <Text style={s.headerContactItem}>⊙ {d.location}</Text> : null}
        {d.linkedin ? <Text style={s.headerContactItem}>⊞ {d.linkedin}</Text> : null}
        {d.website  ? <Text style={s.headerContactItem}>⊕ {d.website}</Text> : null}
      </View>
      {d.summary ? <Text style={s.headerSummary}>{d.summary}</Text> : null}
    </View>
  );
}

function PDFExperience({ section, s }: { section: CVSection; s: ReturnType<typeof makeStyles> }) {
  const entries = section.data as ExperienceEntry[];
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{section.title}</Text>
      {entries.map((e) => (
        <View key={e.id} style={{ marginBottom: 10 }}>
          <View style={s.entryRow}>
            <View>
              <Text style={s.entryTitle}>{e.role}</Text>
              <Text style={s.entrySubtitle}>{e.company}{e.location ? ` · ${e.location}` : ''}</Text>
            </View>
            <Text style={s.entryDate}>{fmtDate(e.startDate)} – {e.current ? 'Present' : fmtDate(e.endDate)}</Text>
          </View>
          {e.bullets.filter(Boolean).map((b, i) => (
            <View key={i} style={s.bullet}>
              <Text style={s.bulletDot}>•  </Text>
              <Text style={s.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function PDFEducation({ section, s }: { section: CVSection; s: ReturnType<typeof makeStyles> }) {
  const entries = section.data as EducationEntry[];
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{section.title}</Text>
      {entries.map((e) => (
        <View key={e.id} style={{ marginBottom: 8 }}>
          <View style={s.entryRow}>
            <View>
              <Text style={s.entryTitle}>{e.school}</Text>
              <Text style={s.entrySubtitle}>{e.degree}{e.field ? ` in ${e.field}` : ''}{e.gpa ? ` · GPA ${e.gpa}` : ''}</Text>
            </View>
            <Text style={s.entryDate}>{fmtDate(e.startDate)}{e.endDate ? ` – ${fmtDate(e.endDate)}` : ''}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function PDFSkills({ section, s }: { section: CVSection; s: ReturnType<typeof makeStyles> }) {
  const skills = section.data as Skill[];
  const byCategory: Record<string, Skill[]> = {};
  skills.forEach(sk => {
    if (!byCategory[sk.category]) byCategory[sk.category] = [];
    byCategory[sk.category].push(sk);
  });
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{section.title}</Text>
      {Object.entries(byCategory).map(([cat, items]) => (
        <View key={cat} style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 8, color: '#888', width: 64, textTransform: 'uppercase', letterSpacing: 0.5, paddingTop: 2 }}>{cat}</Text>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {items.map(sk => <Text key={sk.id} style={s.skillTag}>{sk.name}</Text>)}
          </View>
        </View>
      ))}
    </View>
  );
}

function PDFProjects({ section, s }: { section: CVSection; s: ReturnType<typeof makeStyles> }) {
  const projects = section.data as Project[];
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{section.title}</Text>
      {projects.map((p) => (
        <View key={p.id} style={{ marginBottom: 8 }}>
          <View style={s.entryRow}>
            <Text style={s.entryTitle}>{p.name}</Text>
            {p.link ? <Text style={{ fontSize: 8, color: s.sectionTitle.color }}>{p.link}</Text> : null}
          </View>
          {p.description ? <Text style={s.customText}>{p.description}</Text> : null}
          {p.technologies.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 3 }}>
              {p.technologies.map((t, i) => <Text key={i} style={s.techBadge}>{t}</Text>)}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function PDFCerts({ section, s }: { section: CVSection; s: ReturnType<typeof makeStyles> }) {
  const certs = section.data as Certification[];
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{section.title}</Text>
      {certs.map((c) => (
        <View key={c.id} style={{ ...s.entryRow, marginBottom: 6 }}>
          <View>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#1a1a2e' }}>{c.name}</Text>
            <Text style={s.entrySubtitle}>{c.issuer}</Text>
          </View>
          <Text style={s.entryDate}>{fmtDate(c.date)}</Text>
        </View>
      ))}
    </View>
  );
}

function PDFLanguages({ section, s, accent }: { section: CVSection; s: ReturnType<typeof makeStyles>; accent: string }) {
  const langs = section.data as Language[];
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{section.title}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {langs.map((l) => (
          <View key={l.id} style={{ width: '45%' }}>
            <View style={s.langRow}>
              <Text style={s.langName}>{l.name}</Text>
              <Text style={s.langProf}>{l.proficiency}</Text>
            </View>
            <View style={s.langBar}>
              <View style={{ ...s.langFill, width: `${(PROF_WIDTH[l.proficiency] ?? 0.5) * 100}%` }} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function PDFCustom({ section, s }: { section: CVSection; s: ReturnType<typeof makeStyles> }) {
  const data = section.data as CustomData;
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{section.title}</Text>
      <Text style={s.customText}>{data.content}</Text>
    </View>
  );
}

/* ─── Main Document ───────────────────────────────── */
interface Props {
  sections: CVSection[];
  theme: CVTheme;
  cvTitle: string;
}

export function CVDocument({ sections, theme, cvTitle }: Props) {
  const s = makeStyles(theme.accentColor);
  const visibleSections = sections.filter(sec => sec.visible);
  const headerSection = visibleSections.find(sec => sec.type === 'header');
  const contentSections = visibleSections.filter(sec => sec.type !== 'header');

  return (
    <Document title={cvTitle} author={(headerSection?.data as HeaderData)?.name ?? cvTitle}>
      <Page size="A4" style={s.page}>
        {headerSection && <PDFHeader section={headerSection} s={s} />}
        <View style={s.body}>
          {contentSections.map((section, idx) => (
            <View key={section.id}>
              {(() => {
                switch (section.type) {
                  case 'experience':     return <PDFExperience section={section} s={s} />;
                  case 'education':      return <PDFEducation section={section} s={s} />;
                  case 'skills':         return <PDFSkills section={section} s={s} />;
                  case 'projects':       return <PDFProjects section={section} s={s} />;
                  case 'certifications': return <PDFCerts section={section} s={s} />;
                  case 'languages':      return <PDFLanguages section={section} s={s} accent={theme.accentColor} />;
                  case 'custom':         return <PDFCustom section={section} s={s} />;
                  default:               return null;
                }
              })()}
              {idx < contentSections.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
