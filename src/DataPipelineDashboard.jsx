import React, { useState } from 'react';

const G  = '#1D9E75';
const G2 = '#217522';
const Y  = '#EAB308';
const R  = '#D85A30';
const B  = '#378ADD';
const P  = '#7F77DD';

const MILESTONES = [
  {
    id: 1,
    stage: 'Ingestion',
    icon: '📥',
    color: B,
    status: 'complete',
    label: 'Raw data collected',
    detail: 'Pull raw CSV exports from 3 sources: M-Pesa transaction logs, Titanic dataset (Seaborn), and Nairobi GTFS transit feed. Validate file checksums and row counts before proceeding.',
    stats: [
      { label: 'Sources', value: '3' },
      { label: 'Raw rows', value: '12 840' },
      { label: 'Formats', value: 'CSV · JSON · GTFS' },
    ],
    tools: ['Python', 'Requests', 'Pandas'],
  },
  {
    id: 2,
    stage: 'Cleaning',
    icon: '🧹',
    color: Y,
    status: 'complete',
    label: 'Nulls & outliers resolved',
    detail: 'Drop duplicate rows, impute missing ages using median-by-class strategy (Titanic), normalise M-Pesa merchant names with regex, and filter malformed GTFS stop coordinates outside Kenya bounding box.',
    stats: [
      { label: 'Duplicates removed', value: '214' },
      { label: 'Nulls imputed', value: '177' },
      { label: 'Rows retained', value: '98.3%' },
    ],
    tools: ['Pandas', 'NumPy', 'Regex'],
  },
  {
    id: 3,
    stage: 'Transformation',
    icon: '⚙️',
    color: P,
    status: 'complete',
    label: 'Features engineered',
    detail: 'One-hot encode categorical fields, build family-size composite from SibSp + Parch, extract hour/day-of-week from M-Pesa timestamps, and construct multi-hop adjacency graph for matatu routes.',
    stats: [
      { label: 'New features', value: '18' },
      { label: 'Graph nodes', value: '312' },
      { label: 'Graph edges', value: '1 048' },
    ],
    tools: ['Scikit-learn', 'NetworkX', 'Pandas'],
  },
  {
    id: 4,
    stage: 'Analysis',
    icon: '📊',
    color: G,
    status: 'complete',
    label: 'Models & stats run',
    detail: 'Logistic regression on Titanic survival (AUC 0.84), chi-square independence tests across sex × class, k-means budget clustering on M-Pesa categories, and Dijkstra shortest-path on the GTFS graph.',
    stats: [
      { label: 'Model AUC', value: '0.84' },
      { label: 'χ² p-value', value: '< 0.001' },
      { label: 'Route pairs solved', value: '980' },
    ],
    tools: ['Scikit-learn', 'SciPy', 'NetworkX'],
  },
  {
    id: 5,
    stage: 'Visualisation',
    icon: '📈',
    color: G2,
    status: 'complete',
    label: 'Dashboards delivered',
    detail: 'Rendered interactive Chart.js dashboards for Titanic survival analysis and M-Pesa budget breakdown. Exposed GTFS route engine via Flask REST API consumed by the Shii Ngapi front-end.',
    stats: [
      { label: 'Charts produced', value: '11' },
      { label: 'API endpoints', value: '4' },
      { label: 'End users', value: 'Live demo' },
    ],
    tools: ['Chart.js', 'Flask', 'React'],
  },
  {
    id: 6,
    stage: 'Deployment',
    icon: '🚀',
    color: R,
    status: 'active',
    label: 'Hosted & monitored',
    detail: 'Portfolio deployed to GitHub Pages via automated Actions workflow. GTFS routing API containerised with Docker and queued for Railway hosting. Automated nightly data refresh planned via cron.',
    stats: [
      { label: 'CI/CD', value: 'GitHub Actions' },
      { label: 'Hosting', value: 'GH Pages · Railway' },
      { label: 'Next step', value: 'Cron refresh' },
    ],
    tools: ['Docker', 'GitHub Actions', 'Railway'],
  },
];

const STATUS_DOT = { complete: G, active: Y, pending: 'rgba(255,255,255,0.2)' };

export default function DataPipelineDashboard() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: 'white', background: '#080808', minHeight: '100vh', padding: '24px 20px 48px' }}>

      {/* Header */}
      <div style={{ borderBottom: '0.5px solid rgba(255,255,255,0.1)', paddingBottom: 14, marginBottom: 28 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>End-to-End Data Pipeline</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
          6 milestones · Titanic · M-Pesa · Shii Ngapi datasets · Python + React
        </div>
      </div>

      {/* Pipeline flow strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
        {MILESTONES.map((m, i) => (
          <React.Fragment key={m.id}>
            <button
              onClick={() => setSelected(selected?.id === m.id ? null : m)}
              style={{
                flexShrink: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '10px 14px',
                borderRadius: 12,
                border: `1px solid ${selected?.id === m.id ? m.color : 'rgba(255,255,255,0.08)'}`,
                background: selected?.id === m.id ? m.color + '18' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                transition: 'all 0.25s',
                minWidth: 88,
              }}
            >
              <div style={{ fontSize: 22 }}>{m.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: selected?.id === m.id ? m.color : 'rgba(255,255,255,0.85)' }}>{m.stage}</div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_DOT[m.status], boxShadow: m.status === 'active' ? `0 0 8px ${Y}` : 'none' }} />
            </button>
            {i < MILESTONES.length - 1 && (
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.15)' }} />
                <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid rgba(255,255,255,0.2)' }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Detail panel — shown when a milestone is selected */}
      {selected && (
        <div style={{
          marginBottom: 28,
          padding: '20px 24px',
          borderRadius: 16,
          border: `1px solid ${selected.color}44`,
          background: selected.color + '0d',
          animation: 'panelIn 0.25s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>{selected.icon}</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: selected.color }}>{selected.stage}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{selected.label}</div>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>{selected.detail}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            {selected.stats.map(s => (
              <div key={s.label} style={{ flex: '1 1 120px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 14px' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: selected.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {selected.tools.map(t => (
              <span key={t} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, border: `1px solid ${selected.color}55`, color: selected.color, background: selected.color + '11' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Milestone cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {MILESTONES.map(m => (
          <div
            key={m.id}
            onClick={() => setSelected(selected?.id === m.id ? null : m)}
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              border: `1px solid ${selected?.id === m.id ? m.color + '66' : 'rgba(255,255,255,0.07)'}`,
              background: selected?.id === m.id ? m.color + '0d' : 'rgba(255,255,255,0.03)',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { if (selected?.id !== m.id) { e.currentTarget.style.borderColor = m.color + '44'; e.currentTarget.style.background = m.color + '08'; } }}
            onMouseLeave={e => { if (selected?.id !== m.id) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{m.stage}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>Milestone {m.id}</div>
                </div>
              </div>
              <span style={{
                fontSize: 9, padding: '2px 8px', borderRadius: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                background: m.status === 'complete' ? G + '22' : m.status === 'active' ? Y + '22' : 'rgba(255,255,255,0.06)',
                color: m.status === 'complete' ? G : m.status === 'active' ? Y : 'rgba(255,255,255,0.4)',
                border: `1px solid ${m.status === 'complete' ? G + '44' : m.status === 'active' ? Y + '44' : 'rgba(255,255,255,0.1)'}`,
              }}>
                {m.status === 'active' ? '● Active' : m.status === 'complete' ? '✓ Done' : 'Pending'}
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 12 }}>{m.label}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {m.tools.map(t => (
                <span key={t} style={{ fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 24, display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>
        <span><span style={{ color: G }}>●</span> Complete</span>
        <span><span style={{ color: Y }}>●</span> Active</span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>● Pending</span>
        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.35)' }}>Click a stage or card to expand</span>
      </div>

      <style>{`
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          div[style*='minmax(280px'] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
