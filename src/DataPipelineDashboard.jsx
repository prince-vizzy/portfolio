import React, { useEffect, useRef, useState } from 'react';

/* ── palette ─────────────────────────────────────────────────────────────── */
const G  = '#1D9E75';
const B  = '#378ADD';
const Y  = '#EAB308';
const P  = '#7F77DD';
const R  = '#D85A30';
const DIM = 'rgba(255,255,255,0.55)';
const CARD = 'rgba(255,255,255,0.04)';
const BORDER = 'rgba(255,255,255,0.08)';

/* ── hardcoded study data ────────────────────────────────────────────────── */
const PLATFORMS = [
  { name: 'TikTok',    users: 94,  min: 245, mh: 3.501, add: 3.546, share: 4.6  },
  { name: 'Snapchat',  users: 181, min: 231, mh: 3.314, add: 3.368, share: 8.9  },
  { name: 'Discord',   users: 197, min: 223, mh: 3.198, add: 3.223, share: 9.6  },
  { name: 'Pinterest', users: 144, min: 221, mh: 3.176, add: 3.199, share: 7.0  },
  { name: 'Instagram', users: 358, min: 219, mh: 3.222, add: 3.270, share: 17.5 },
  { name: 'YouTube',   users: 410, min: 209, mh: 3.131, add: 3.184, share: 20.0 },
  { name: 'Facebook',  users: 407, min: 208, mh: 3.150, add: 3.207, share: 19.9 },
  { name: 'Reddit',    users: 124, min: 207, mh: 3.106, add: 3.113, share: 6.1  },
  { name: 'Twitter',   users: 131, min: 206, mh: 3.049, add: 3.089, share: 6.4  },
];

const GENDERS = [
  { name: 'Female',     count: 263, min: 221, mh: 3.187, add: 3.240, wb: 3.303, color: P },
  { name: 'Male',       count: 208, min: 183, mh: 3.023, add: 3.056, wb: 3.117, color: B },
  { name: 'Non-binary', count: 7,   min: 270, mh: 3.393, add: 3.572, wb: 3.143, color: Y },
];

const AGE_GROUPS = [
  { group: 'Teen (≤18)',          n: 32,  add: 2.990, color: Y },
  { group: 'Young Adult (19–24)', n: 295, add: 3.320, color: G },
  { group: 'Adult (25–34)',       n: 76,  add: 3.263, color: B },
  { group: 'Older (35+)',         n: 75,  add: 2.529, color: P },
];

const CORRELATIONS = [
  { var: 'Concentration Difficulty', r: 0.762, rho: 0.756 },
  { var: 'Easily Distracted',        r: 0.715, rho: 0.693 },
  { var: 'Depression Frequency',     r: 0.706, rho: 0.689 },
  { var: 'Distraction While Busy',   r: 0.694, rho: 0.682 },
  { var: 'Interest Fluctuation',     r: 0.694, rho: 0.693 },
  { var: 'Bothered By Worries',      r: 0.679, rho: 0.663 },
  { var: 'Restlessness',             r: 0.647, rho: 0.646 },
  { var: 'Social Comparison',        r: 0.588, rho: 0.583 },
  { var: 'Purposeless Usage',        r: 0.534, rho: 0.499 },
  { var: 'Daily Minutes',            r: 0.443, rho: 0.429 },
];

// rows = usage tier (high→low), cols = [High Risk, Moderate Risk, Low Risk, Very High Risk]
const HEATMAP_ROWS = [
  { usage: 'Very High (5+ h)', vals: [71, 24,  2, 19], total: 116 },
  { usage: 'High (3–4.5 h)',   vals: [84, 47, 10, 19], total: 160 },
  { usage: 'Moderate (2–2.5 h)', vals: [44, 44, 6,  7], total: 101 },
  { usage: 'Low (≤1.5 h)',     vals: [19, 51, 29,  2], total: 101 },
];
const HEATMAP_COLS = ['High Risk', 'Moderate\nRisk', 'Low Risk', 'Very High\nRisk'];
const HEATMAP_COLORS = [R, Y, G, '#C06EC0'];

/* ── tiny reusable chart primitives ─────────────────────────────────────── */

function HBar({ label, value, max, color, unit = '', labelW = 148 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
      <div style={{ width: labelW, textAlign: 'right', fontSize: 11, color: DIM, flexShrink: 0, lineHeight: 1.3 }}>{label}</div>
      <div style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden', minWidth: 0 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.7s cubic-bezier(.4,0,.2,1)' }} />
      </div>
      <div style={{ width: 52, fontSize: 11, color: 'white', flexShrink: 0 }}>{value}{unit}</div>
    </div>
  );
}

function VBar({ label, value, max, color, sub }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 4 }}>{value.toFixed(2)}</div>
      <div style={{ width: '60%', height: 100, background: 'rgba(255,255,255,0.06)', borderRadius: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: `${pct}%`, background: color, borderRadius: 4, transition: 'height 0.7s cubic-bezier(.4,0,.2,1)' }} />
      </div>
      <div style={{ fontSize: 10, color: DIM, marginTop: 5, textAlign: 'center', lineHeight: 1.3 }}>{label}</div>
      {sub && <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Kpi({ label, value, sub, color }) {
  return (
    <div style={{ flex: '1 1 120px', background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ fontSize: 10, color: DIM, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || 'white', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: DIM, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 20, border: `1px solid ${color}55`, color, background: color + '11' }}>
      {children}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: DIM, marginBottom: 12, fontWeight: 600 }}>
      {children}
    </div>
  );
}

/* ── Milestone 2: Cleaning tab ───────────────────────────────────────────── */
function M2Panel() {
  const steps = [
    { icon: '🏷️', title: 'Renamed 23 columns', desc: 'Survey questions → concise code-friendly labels (e.g. "What is your age?" → Age).' },
    { icon: '🚿', title: 'Screener filter', desc: 'Removed respondents who answered "No" to using social media — kept only active users.' },
    { icon: '🩹', title: 'Median imputation', desc: '30 missing Likert & time values filled with column median — robust to skew.' },
    { icon: '✂️', title: 'Outlier capping (3×IQR)', desc: '55 extreme Age values clipped to [6, 41]. Prevents regression blow-up.' },
    { icon: '📐', title: 'Time normalisation', desc: 'Text ranges ("2–3 hours") → integer minutes (150). Enables arithmetic comparisons.' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <Kpi label="Respondents" value="478" sub="after screener filter" color={B} />
        <Kpi label="Columns" value="23" sub="after renaming" color={G} />
        <Kpi label="Duplicates removed" value="0" sub="dataset was clean" color={G} />
        <Kpi label="Outliers capped" value="55" sub="Age via 3×IQR" color={Y} />
        <Kpi label="Nulls imputed" value="30" sub="median strategy" color={P} />
        <Kpi label="Rows retained" value="100%" sub="no rows dropped" color={G} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10, marginBottom: 24 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 11, color: DIM, lineHeight: 1.6 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <SectionTitle>Column rename examples (5 of 23)</SectionTitle>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
        {[
          ['What is your age?', 'Age'],
          ['What is the average time you spend on social media every day?', 'Daily_Usage → Daily_Minutes (int)'],
          ['How often do you find yourself using Social media without a specific purpose?', 'Purposeless_Usage'],
          ['How often do you feel depressed or down?', 'Depression_Frequency'],
          ['On a scale of 1 to 5, how easily distracted are you?', 'Easily_Distracted'],
        ].map(([orig, clean], i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', borderBottom: i < 4 ? `1px solid ${BORDER}` : 'none' }}>
            <div style={{ flex: 1, fontSize: 11, color: DIM, lineHeight: 1.4 }}>{orig}</div>
            <div style={{ fontSize: 11, color: G, fontFamily: 'monospace', whiteSpace: 'nowrap', flexShrink: 0 }}>→ {clean}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Milestone 3: Feature Engineering + Transform tab ───────────────────── */
function M3Panel() {
  const [platMetric, setPlatMetric] = useState('min');
  const [corrMetric, setCorrMetric] = useState('r');
  const [hovPlatform, setHovPlatform] = useState(null);
  const [hovCorr, setHovCorr] = useState(null);

  const platMax = platMetric === 'min' ? 260 : 3.6;
  const platLabel = platMetric === 'min' ? 'Avg daily minutes' : 'Avg MH impact score (1–5)';

  // Color by MH impact (low=green, high=red)
  const mhColor = (mh) => {
    const t = (mh - 3.0) / 0.55;
    const r = Math.round(29 + t * (216 - 29));
    const g = Math.round(158 + t * (90 - 158));
    const b = Math.round(117 + t * (48 - 117));
    return `rgb(${r},${g},${b})`;
  };

  const features = [
    { name: 'Addiction_Score',       desc: 'Mean of 4 compulsive-use Likert items',    color: R  },
    { name: 'Attention_Score',       desc: 'Mean of distraction & focus items',         color: Y  },
    { name: 'Social_Anxiety_Score',  desc: 'Mean of comparison & validation items',     color: P  },
    { name: 'Wellbeing_Score',       desc: 'Mean of depression & interest items',       color: B  },
    { name: 'MH_Impact_Score',       desc: 'Grand mean of all 4 pillars',               color: G  },
    { name: 'Platform_Count',        desc: 'Number of platforms used simultaneously',   color: DIM },
    { name: 'Usage_Tier',            desc: 'Binned daily usage into 4 categories',      color: DIM },
    { name: 'MH_Risk_Tier',          desc: 'Quartile-based risk classification',        color: DIM },
    { name: 'Age_Group',             desc: 'Teen / Young Adult / Adult / Older',        color: DIM },
    { name: 'MH_Impact_Pct_Rank',    desc: 'Percentile rank within sample',             color: DIM },
  ];

  return (
    <div>
      {/* Feature overview */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <Kpi label="Input shape"  value="478 × 23" sub="from Milestone 2" color={B} />
        <Kpi label="Output shape" value="478 × 33" sub="+10 new features" color={G} />
        <Kpi label="Composite scores" value="5" sub="Addiction · Attention · Anxiety · Wellbeing · MH" color={P} />
        <Kpi label="Platforms aggregated" value="9" sub="exploded from multi-select" color={Y} />
      </div>

      <SectionTitle>10 engineered features</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 8, marginBottom: 24 }}>
        {features.map(f => (
          <div key={f.name} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: f.color, flexShrink: 0, marginTop: 5 }} />
            <div>
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: f.color !== DIM ? f.color : 'white', marginBottom: 2 }}>{f.name}</div>
              <div style={{ fontSize: 10, color: DIM, lineHeight: 1.4 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform chart */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <SectionTitle>Platform comparison</SectionTitle>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['min', 'Daily minutes'], ['mh', 'MH impact']].map(([k, l]) => (
            <button key={k} onClick={() => setPlatMetric(k)} style={{
              fontSize: 10, padding: '3px 10px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${platMetric === k ? G : BORDER}`,
              background: platMetric === k ? G + '22' : 'transparent',
              color: platMetric === k ? G : DIM,
            }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: DIM, marginBottom: 10 }}>{platLabel} — sorted high → low</div>
        {PLATFORMS.map((p, i) => {
          const val  = platMetric === 'min' ? p.min : p.mh;
          const col  = platMetric === 'min' ? mhColor(p.mh) : mhColor(p.mh);
          const pct  = ((val / platMax) * 100).toFixed(1);
          const disp = platMetric === 'min' ? `${val} min` : p.mh.toFixed(3);
          const isHov = hovPlatform === i;
          return (
            <div
              key={p.name}
              onMouseEnter={() => setHovPlatform(i)}
              onMouseLeave={() => setHovPlatform(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7, cursor: 'pointer' }}
            >
              <div style={{ width: 64, textAlign: 'right', fontSize: 11, color: isHov ? 'white' : DIM, flexShrink: 0 }}>{p.name}</div>
              <div style={{ flex: 1, height: 22, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: col, borderRadius: 4, transition: 'width 0.6s ease, background 0.3s' }} />
              </div>
              <div style={{ width: 54, fontSize: 11, color: isHov ? 'white' : DIM, flexShrink: 0 }}>{disp}</div>
              {isHov && (
                <div style={{ position: 'absolute', right: 0, fontSize: 9, color: DIM }}>
                  {p.users} users · {p.share}% share
                </div>
              )}
            </div>
          );
        })}
        {hovPlatform !== null && (
          <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 8, fontSize: 11, color: DIM, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(() => {
              const p = PLATFORMS[hovPlatform];
              return [
                ['Users', p.users],
                ['Share', `${p.share}%`],
                ['Avg min/day', `${p.min}`],
                ['MH impact', p.mh.toFixed(3)],
                ['Addiction', p.add.toFixed(3)],
              ].map(([l, v]) => (
                <span key={l}><span style={{ color: G }}>{v}</span> {l}</span>
              ));
            })()}
          </div>
        )}
      </div>

      {/* Gender + Age side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        {/* Gender */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
          <SectionTitle>Gender breakdown</SectionTitle>
          {GENDERS.map(g => (
            <div key={g.name} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: g.color }}>{g.name}</span>
                <span style={{ fontSize: 10, color: DIM }}>n={g.count}</span>
              </div>
              {[['MH Impact', g.mh, 3.6, g.color], ['Addiction', g.add, 3.8, R], ['Wellbeing', g.wb, 3.5, B]].map(([l, v, max, c]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 56, fontSize: 10, color: DIM }}>{l}</div>
                  <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${(v / max) * 100}%`, height: '100%', background: c, opacity: 0.8, borderRadius: 3 }} />
                  </div>
                  <div style={{ width: 32, fontSize: 10, color: 'white' }}>{v.toFixed(2)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Age groups */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
          <SectionTitle>Addiction score by age group</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 130, padding: '0 8px', marginBottom: 8 }}>
            {AGE_GROUPS.map(a => {
              const pct = ((a.add - 2.4) / (3.4 - 2.4)) * 100;
              return (
                <div key={a.group} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'white', marginBottom: 4 }}>{a.add.toFixed(2)}</div>
                  <div style={{ width: '70%', height: `${pct}%`, background: a.color, borderRadius: '4px 4px 0 0', minHeight: 6, transition: 'height 0.7s ease' }} />
                </div>
              );
            })}
          </div>
          {AGE_GROUPS.map(a => (
            <div key={a.group} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: a.color, flexShrink: 0 }} />
              <div style={{ fontSize: 9, color: DIM, flex: 1 }}>{a.group}</div>
              <div style={{ fontSize: 9, color: DIM }}>n={a.n}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, fontSize: 10, color: DIM, lineHeight: 1.5 }}>
            ANOVA F=15.07, p&lt;0.001 — Older adults score 0.79 points lower than Young Adults (Tukey HSD).
          </div>
        </div>
      </div>

      {/* Correlation chart */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <SectionTitle>Correlations with MH Impact Score</SectionTitle>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['r', 'Pearson r'], ['rho', 'Spearman ρ']].map(([k, l]) => (
            <button key={k} onClick={() => setCorrMetric(k)} style={{
              fontSize: 10, padding: '3px 10px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${corrMetric === k ? P : BORDER}`,
              background: corrMetric === k ? P + '22' : 'transparent',
              color: corrMetric === k ? P : DIM,
            }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
        {CORRELATIONS.map((c, i) => {
          const val = c[corrMetric];
          const isHov = hovCorr === i;
          const strength = val >= 0.7 ? R : val >= 0.6 ? Y : val >= 0.5 ? G : DIM;
          return (
            <div
              key={c.var}
              onMouseEnter={() => setHovCorr(i)}
              onMouseLeave={() => setHovCorr(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7, cursor: 'default' }}
            >
              <div style={{ width: 156, textAlign: 'right', fontSize: 11, color: isHov ? 'white' : DIM, flexShrink: 0 }}>{c.var}</div>
              <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${val * 100}%`, height: '100%', background: strength, opacity: isHov ? 1 : 0.75, borderRadius: 4, transition: 'width 0.6s ease, opacity 0.2s' }} />
              </div>
              <div style={{ width: 36, fontSize: 11, color: strength, fontWeight: isHov ? 700 : 400, flexShrink: 0 }}>{val.toFixed(3)}</div>
            </div>
          );
        })}
        <div style={{ marginTop: 12, display: 'flex', gap: 14, fontSize: 10, color: DIM }}>
          <span><span style={{ color: R }}>■</span> Strong (≥0.70)</span>
          <span><span style={{ color: Y }}>■</span> Moderate (0.60–0.69)</span>
          <span><span style={{ color: G }}>■</span> Fair (0.50–0.59)</span>
          <span style={{ marginLeft: 'auto' }}>All p &lt; 0.001</span>
        </div>
      </div>
    </div>
  );
}

/* ── Milestone 4: Analysis tab ───────────────────────────────────────────── */
function M4Panel() {
  const [expanded, setExpanded] = useState(null);
  const [hovCell, setHovCell]   = useState(null);

  const htests = [
    {
      id: 1, icon: '⚖️',
      title: 'Gender × MH Impact',
      method: 'Independent samples t-test',
      result: 'SIGNIFICANT',
      resultColor: R,
      headline: 'Females score 0.164 points higher than males in MH impact.',
      stats: [
        { label: 'Male mean',    value: '3.023' },
        { label: 'Female mean',  value: '3.187' },
        { label: 't-statistic',  value: '-2.304' },
        { label: 'p-value',      value: '0.0216' },
        { label: "Cohen's d",    value: '-0.214 (small)' },
      ],
      detail: 'Levene\'s test confirmed equal variances (p=0.39). The difference is statistically real but small — gender explains only ~4% of variance in MH impact.',
    },
    {
      id: 2, icon: '📊',
      title: 'Usage Tier × MH Risk',
      method: 'Chi-square test of independence',
      result: 'SIGNIFICANT',
      resultColor: R,
      headline: 'Heavy users are disproportionately classified as High or Very High Risk.',
      stats: [
        { label: 'χ² statistic', value: '102.20' },
        { label: 'df',           value: '9' },
        { label: 'p-value',      value: '< 0.001' },
        { label: "Cramér's V",   value: '0.267 (moderate)' },
      ],
      detail: '71 of 116 "Very High (5+h)" users fall into High Risk. Just 2 fall into Low Risk. Low-usage respondents are the inverse — 29/101 in Low Risk.',
    },
    {
      id: 3, icon: '📐',
      title: 'Addiction Score × Age',
      method: 'One-way ANOVA + Tukey HSD',
      result: 'SIGNIFICANT',
      resultColor: R,
      headline: 'Young adults (19–24) score highest on addiction; older adults score lowest.',
      stats: [
        { label: 'F-statistic', value: '15.075' },
        { label: 'p-value',     value: '< 0.001' },
        { label: 'Young Adult', value: '3.320 (n=295)' },
        { label: 'Older (35+)', value: '2.529 (n=75)' },
        { label: 'Gap',         value: '0.791 (Tukey p=0.000)' },
      ],
      detail: 'Only two pairs survive Tukey correction: Young Adults vs Older (Δ=0.79) and Adults (25-34) vs Older (Δ=0.73). Teens show intermediate scores.',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <Kpi label="Simple R²"   value="0.629" sub="Addiction → MH Impact" color={G} />
        <Kpi label="Multiple R²" value="0.944" sub="All predictors combined" color={G} />
        <Kpi label="Bootstrap CI" value="[3.05, 3.18]" sub="95% CI for MH Impact mean" color={B} />
        <Kpi label="Key predictor" value="Social Anxiety" sub="β=0.297, p<0.001 (***)" color={P} />
      </div>

      {/* Hypothesis test cards */}
      <SectionTitle>Hypothesis tests</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: 24 }}>
        {htests.map(h => (
          <div
            key={h.id}
            onClick={() => setExpanded(expanded === h.id ? null : h.id)}
            style={{
              background: CARD, border: `1px solid ${expanded === h.id ? h.resultColor + '55' : BORDER}`,
              borderRadius: 14, padding: '16px 18px', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{h.icon}</span>
              <span style={{
                fontSize: 9, padding: '2px 8px', borderRadius: 10, fontWeight: 700, letterSpacing: '0.06em',
                background: h.resultColor + '22', color: h.resultColor, border: `1px solid ${h.resultColor}44`,
              }}>{h.result}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 4 }}>{h.title}</div>
            <div style={{ fontSize: 10, color: DIM, marginBottom: 8 }}>{h.method}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 10 }}>{h.headline}</div>

            {expanded === h.id && (
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12, animation: 'fadeIn 0.2s ease' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                  {h.stats.map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '6px 10px', fontSize: 10 }}>
                      <div style={{ color: DIM, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ color: h.resultColor, fontWeight: 600 }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: DIM, lineHeight: 1.6 }}>{h.detail}</div>
              </div>
            )}
            <div style={{ fontSize: 9, color: DIM, textAlign: 'right' }}>{expanded === h.id ? '▲ collapse' : '▼ expand'}</div>
          </div>
        ))}
      </div>

      {/* Regression */}
      <SectionTitle>Linear regression</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
          <div style={{ fontSize: 11, color: DIM, marginBottom: 10 }}>Simple: Addiction → MH Impact</div>
          <div style={{ fontSize: 15, fontFamily: 'monospace', color: G, marginBottom: 12, lineHeight: 1.6 }}>
            MH_Impact =<br />1.129 + 0.629 × Addiction
          </div>
          {[
            { label: 'R²',          value: '0.629', color: G },
            { label: 'RMSE',        value: '0.469', color: B },
            { label: 'F-stat',      value: '808.5', color: Y },
            { label: 'p-value',     value: '< 0.001', color: R },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11 }}>
              <span style={{ color: DIM }}>{s.label}</span>
              <span style={{ color: s.color, fontWeight: 600 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
          <div style={{ fontSize: 11, color: DIM, marginBottom: 10 }}>Multiple regression — all predictors</div>
          {[
            { label: 'R²',              value: '0.944', color: G },
            { label: 'Adj. R²',         value: '0.942', color: G },
            { label: 'AIC',             value: '-246.6', color: B },
            { label: 'Social Anxiety β','value': '0.297***', color: P },
            { label: 'Daily Minutes β', value: '0.0001 (ns)', color: DIM },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11 }}>
              <span style={{ color: DIM }}>{s.label}</span>
              <span style={{ color: s.color, fontWeight: 600 }}>{s.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 10, color: DIM, lineHeight: 1.5 }}>
            Social Anxiety is the dominant driver (t=26.46, p&lt;0.001). Daily time spent is not independently significant once mental health constructs are controlled.
          </div>
        </div>
      </div>

      {/* Usage × Risk heatmap */}
      <SectionTitle>Usage tier × MH risk heatmap (χ²=102.2, p&lt;0.001)</SectionTitle>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr>
              <th style={{ padding: '6px 10px', textAlign: 'left', color: DIM, fontWeight: 400, fontSize: 10 }}>Usage Tier</th>
              {HEATMAP_COLS.map((c, i) => (
                <th key={i} style={{ padding: '6px 10px', textAlign: 'center', color: HEATMAP_COLORS[i], fontWeight: 600, fontSize: 10, whiteSpace: 'pre' }}>{c}</th>
              ))}
              <th style={{ padding: '6px 10px', textAlign: 'center', color: DIM, fontWeight: 400, fontSize: 10 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {HEATMAP_ROWS.map((row, ri) => (
              <tr key={ri}>
                <td style={{ padding: '8px 10px', color: DIM, fontSize: 10, whiteSpace: 'nowrap' }}>{row.usage}</td>
                {row.vals.map((v, ci) => {
                  const pct  = v / row.total;
                  const alpha = 0.1 + pct * 0.7;
                  const isHov = hovCell?.r === ri && hovCell?.c === ci;
                  return (
                    <td
                      key={ci}
                      onMouseEnter={() => setHovCell({ r: ri, c: ci })}
                      onMouseLeave={() => setHovCell(null)}
                      style={{
                        padding: '8px 10px', textAlign: 'center',
                        background: `rgba(${ci === 0 ? '216,90,48' : ci === 1 ? '234,179,8' : ci === 2 ? '29,158,117' : '192,110,192'},${isHov ? 0.35 : alpha})`,
                        borderRadius: 6, cursor: 'default',
                        transition: 'background 0.2s',
                        fontWeight: isHov ? 700 : 400,
                        color: isHov ? 'white' : 'rgba(255,255,255,0.85)',
                      }}
                    >
                      {v}
                      {isHov && <div style={{ fontSize: 9, color: DIM }}>({(pct * 100).toFixed(0)}%)</div>}
                    </td>
                  );
                })}
                <td style={{ padding: '8px 10px', textAlign: 'center', color: DIM, fontSize: 10 }}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 10, fontSize: 10, color: DIM }}>
          Hover cells to see row %. Cramér's V = 0.267 (moderate association).
        </div>
      </div>
    </div>
  );
}

/* ── Milestone 5: Visualisation tab ─────────────────────────────────────── */
function M5Panel() {
  const [iframeHeight, setIframeHeight] = useState(3600);
  const iframeCleanupRef = useRef(null);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const src  = `${base}/smmh-dashboard/index.html`;

  useEffect(() => () => {
    iframeCleanupRef.current?.();
  }, []);

  const handleDashboardLoad = (event) => {
    const iframe = event.currentTarget;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!doc) return;

    iframeCleanupRef.current?.();

    const m6Label = [...doc.querySelectorAll('.sec-lbl')]
      .find(label => label.textContent.includes('M6') || label.textContent.includes('AI Risk Prediction Engine'));
    const m6Start = m6Label?.closest('.sec');
    const footer = doc.querySelector('.dash-footer');

    if (m6Start && footer) {
      let node = m6Start;
      while (node && node !== footer) {
        const next = node.nextElementSibling;
        node.remove();
        node = next;
      }
    }

    const resize = () => {
      const nextHeight = Math.max(
        720,
        doc.documentElement?.scrollHeight || 0,
        doc.body?.scrollHeight || 0,
      );
      setIframeHeight(nextHeight);
    };

    doc.documentElement.style.overflow = 'hidden';
    if (doc.body) doc.body.style.overflow = 'hidden';

    const ResizeObserverCtor = iframe.contentWindow?.ResizeObserver || window.ResizeObserver;
    const observer = ResizeObserverCtor ? new ResizeObserverCtor(resize) : null;
    observer?.observe(doc.documentElement);
    if (doc.body) observer?.observe(doc.body);
    iframe.contentWindow?.addEventListener('resize', resize);

    iframeCleanupRef.current = () => {
      observer?.disconnect();
      iframe.contentWindow?.removeEventListener('resize', resize);
    };

    resize();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, flexShrink: 0 }}>
        <Kpi label="Output stage"   value="M5"       sub="Visualisation"           color={G} />
        <Kpi label="Charts"         value="8+"        sub="interactive panels"      color={B} />
        <Kpi label="Dataset"        value="478 rows"  sub="33 features rendered"    color={P} />
        <Kpi label="Filters"        value="Live"      sub="gender · age · platform" color={Y} />
      </div>
      
      <iframe
        title="Social Media Usage vs Mental Health Dashboard"
        src={src}
        scrolling="no"
        onLoad={handleDashboardLoad}
        style={{
          width: '100%',
          height: iframeHeight,
          minHeight: 720,
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          display: 'block',
          overflow: 'hidden',
          background: '#080808',
        }}
      />
    </div>
  );
}

/* ── Milestone 6: Model tab ──────────────────────────────────────────────── */
function M6Panel() {
  const [selModel, setSelModel] = useState('rf');
  const [hovImp, setHovImp]     = useState(null);
  const [hovCell, setHovCell]   = useState(null);
  const [mlTab, setMlTab]       = useState('screener');

  const MODELS = [
    { id: 'lr',  label: 'Logistic Reg.', acc: 0.7396, f1: 0.710, color: B },
    { id: 'rf',  label: 'Random Forest', acc: 0.8125, f1: 0.793, color: G },
    { id: 'svm', label: 'SVM (RBF)',     acc: 0.7813, f1: 0.752, color: P },
    { id: 'knn', label: 'KNN (k=5)',     acc: 0.6979, f1: 0.673, color: Y },
  ];

  const CM_LABELS  = ['High Risk', 'Mod. Risk', 'Low Risk', 'V.High Risk'];
  const CM_COLORS  = [R, Y, G, '#C06EC0'];
  const CM_ACTUALS = [44, 33, 9, 10];
  const CM_DATA    = {
    lr:  [[32, 9, 0, 3], [8, 20, 3, 2], [1, 3, 5, 0], [2, 2, 0, 6]],
    rf:  [[38, 4, 0, 2], [5, 25, 2, 1], [0, 2, 7, 0], [1, 1, 0, 8]],
    svm: [[35, 6, 0, 3], [6, 23, 3, 1], [0, 2, 6, 1], [2, 1, 0, 7]],
    knn: [[30, 10, 1, 3], [8, 18, 4, 3], [1, 3, 4, 1], [3, 2, 0, 5]],
  };

  const FEAT_IMP = [
    { name: 'Addiction_Score',      imp: 0.281, color: R },
    { name: 'Social_Anxiety_Score', imp: 0.224, color: P },
    { name: 'MH_Impact_Score',      imp: 0.183, color: G },
    { name: 'Wellbeing_Score',      imp: 0.119, color: B },
    { name: 'Attention_Score',      imp: 0.098, color: Y },
    { name: 'Daily_Minutes',        imp: 0.063, color: DIM },
    { name: 'Age',                  imp: 0.032, color: DIM },
  ];

  const CLASS_REPORT = [
    { cls: 'High Risk',      prec: 0.864, rec: 0.864, f1: 0.864, n: 44, color: R },
    { cls: 'Moderate Risk',  prec: 0.781, rec: 0.758, f1: 0.769, n: 33, color: Y },
    { cls: 'Low Risk',       prec: 0.778, rec: 0.778, f1: 0.778, n: 9,  color: G },
    { cls: 'Very High Risk', prec: 0.727, rec: 0.800, f1: 0.762, n: 10, color: '#C06EC0' },
  ];

  const activeModel = MODELS.find(m => m.id === selModel);
  const cm          = CM_DATA[selModel];

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <Kpi label="Best accuracy"  value="81.3%"    sub="Random Forest · test set"    color={G} />
        <Kpi label="Macro F1"       value="0.793"    sub="4-class classification"       color={G} />
        <Kpi label="Train / Test"   value="382 / 96" sub="80 / 20 stratified split"    color={B} />
        <Kpi label="Features used"  value="7"        sub="composite scores + raw"       color={P} />
        <Kpi label="Target classes" value="4"        sub="High · Mod · Low · Very High" color={Y} />
      </div>

      {/* Model selector */}
      <SectionTitle>Model comparison — select to inspect</SectionTitle>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {MODELS.map(m => (
          <button
            key={m.id}
            onClick={() => setSelModel(m.id)}
            style={{
              fontSize: 11, padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${selModel === m.id ? m.color : BORDER}`,
              background: selModel === m.id ? m.color + '22' : 'transparent',
              color: selModel === m.id ? m.color : DIM,
              fontWeight: selModel === m.id ? 600 : 400, transition: 'all 0.2s',
            }}
          >{m.label}</button>
        ))}
      </div>

      {/* Accuracy + F1 bars */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[['Accuracy', 'acc', v => `${(v * 100).toFixed(1)}%`], ['Macro F1', 'f1', v => v.toFixed(3)]].map(([title, key, fmt]) => (
            <div key={key}>
              <div style={{ fontSize: 10, color: DIM, marginBottom: 10 }}>{title}</div>
              {MODELS.map(m => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 96, fontSize: 10, color: selModel === m.id ? m.color : DIM, flexShrink: 0 }}>{m.label}</div>
                  <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${m[key] * 100}%`, height: '100%', background: m.color, opacity: selModel === m.id ? 1 : 0.35, borderRadius: 4, transition: 'all 0.5s' }} />
                  </div>
                  <div style={{ width: 42, fontSize: 10, color: selModel === m.id ? m.color : DIM, fontWeight: selModel === m.id ? 700 : 400 }}>{fmt(m[key])}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Confusion matrix + Feature importance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        {/* Confusion matrix */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
          <SectionTitle>Confusion matrix — {activeModel.label}</SectionTitle>
          <div style={{ fontSize: 9, color: DIM, marginBottom: 10 }}>Rows = actual · Cols = predicted</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, 1fr)', gap: 3, alignItems: 'center' }}>
            <div />
            {CM_LABELS.map((l, i) => (
              <div key={i} style={{ fontSize: 8, color: CM_COLORS[i], textAlign: 'center', lineHeight: 1.3, paddingBottom: 4 }}>{l}</div>
            ))}
            {cm.map((row, ri) => (
              <React.Fragment key={ri}>
                <div style={{ fontSize: 8, color: CM_COLORS[ri], paddingRight: 4, lineHeight: 1.3, textAlign: 'right' }}>{CM_LABELS[ri]}</div>
                {row.map((v, ci) => {
                  const isDiag = ri === ci;
                  const pct    = v / CM_ACTUALS[ri];
                  const alpha  = isDiag ? 0.45 + pct * 0.5 : pct * 0.4;
                  const isHov  = hovCell?.r === ri && hovCell?.c === ci;
                  return (
                    <div
                      key={ci}
                      onMouseEnter={() => setHovCell({ r: ri, c: ci })}
                      onMouseLeave={() => setHovCell(null)}
                      style={{
                        textAlign: 'center', borderRadius: 6, padding: '9px 4px',
                        background: `${CM_COLORS[ri]}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`,
                        border: isDiag ? `1px solid ${CM_COLORS[ri]}88` : '1px solid transparent',
                        fontSize: 13, fontWeight: isDiag ? 700 : 400,
                        color: isDiag ? 'white' : 'rgba(255,255,255,0.65)',
                        cursor: 'default', transition: 'all 0.15s',
                        outline: isHov ? `1px solid ${CM_COLORS[ri]}` : 'none',
                      }}
                    >
                      {v}
                      {isHov && <div style={{ fontSize: 8, color: DIM }}>({(pct * 100).toFixed(0)}%)</div>}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Feature importance */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
          <SectionTitle>Feature importance (Random Forest)</SectionTitle>
          <div style={{ fontSize: 9, color: DIM, marginBottom: 12 }}>Mean decrease in impurity</div>
          {FEAT_IMP.map((f, i) => (
            <div
              key={f.name}
              onMouseEnter={() => setHovImp(i)}
              onMouseLeave={() => setHovImp(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9, cursor: 'default' }}
            >
              <div style={{ width: 124, textAlign: 'right', fontSize: 10, fontFamily: 'monospace', color: hovImp === i ? f.color : DIM, flexShrink: 0, lineHeight: 1.3 }}>{f.name}</div>
              <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(f.imp / 0.3) * 100}%`, height: '100%', background: f.color, opacity: hovImp === i ? 1 : 0.7, borderRadius: 4, transition: 'all 0.4s' }} />
              </div>
              <div style={{ width: 36, fontSize: 10, color: hovImp === i ? f.color : DIM, fontWeight: hovImp === i ? 700 : 400 }}>{f.imp.toFixed(3)}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, fontSize: 10, color: DIM, lineHeight: 1.5 }}>
            Addiction_Score + Social_Anxiety_Score account for &gt;50% of total importance — consistent with M4 regression findings.
          </div>
        </div>
      </div>

      {/* Per-class report */}
      <SectionTitle>Per-class report — Random Forest</SectionTitle>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {['Class', 'Precision', 'Recall', 'F1-score', 'Support'].map((h, i) => (
                <th key={i} style={{ padding: '10px 14px', textAlign: i === 0 ? 'left' : 'center', color: DIM, fontWeight: 400, fontSize: 10 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CLASS_REPORT.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < CLASS_REPORT.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: r.color, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ color: r.color }}>{r.cls}</span>
                  </span>
                </td>
                {[r.prec, r.rec, r.f1].map((v, vi) => (
                  <td key={vi} style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 40, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${v * 100}%`, height: '100%', background: r.color, opacity: 0.75, borderRadius: 3 }} />
                      </div>
                      <span style={{ color: 'white', fontWeight: 500 }}>{v.toFixed(3)}</span>
                    </div>
                  </td>
                ))}
                <td style={{ padding: '10px 14px', textAlign: 'center', color: DIM }}>{r.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '10px 14px', fontSize: 10, color: DIM, borderTop: `1px solid ${BORDER}`, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <span>Macro avg F1: <span style={{ color: G }}>0.793</span></span>
          <span>Weighted avg F1: <span style={{ color: G }}>0.811</span></span>
          <span>Accuracy: <span style={{ color: G }}>81.3%</span></span>
          <span style={{ marginLeft: 'auto' }}>n_test = 96</span>
        </div>
      </div>

      {/* Live Risk Screener */}
      <RiskScreener mlTab={mlTab} setMlTab={setMlTab} />
    </div>
  );
}

/* ── Milestone 6: Live Risk Screener + Model Insights ────────────────────── */
function RiskScreener({ mlTab, setMlTab }) {
  // Feature slider state
  const [sliders, setSliders] = useState({
    purposeless: 3,
    distraction: 3,
    restlessness: 3,
    easily_distracted: 3,
    worries: 3,
    concentration: 3,
    comparison: 3,
    comp_feelings: 3,
    validation: 3,
    depression: 3,
    fluctuation: 3,
    sleep: 3,
  });
  const [dailyMinutes, setDailyMinutes] = useState('150');
  const [prediction, setPrediction] = useState(null);
  const [showAccordion, setShowAccordion] = useState(false);

  // Model coefficients (from trained pipeline)
  const MODEL_COEFS = {
    Daily_Minutes: 0.0038,
    Purposeless_Usage: 0.4521,
    Distraction_While_Busy: 0.6842,
    Restlessness: 0.5123,
    Easily_Distracted: 0.4917,
    Bothered_By_Worries: 0.3821,
    Concentration_Difficulty: 0.7621,
    Social_Comparison: 0.3456,
    Comparison_Feelings: 0.2891,
    Validation_Seeking: 0.5234,
    Depression_Frequency: 0.7123,
    Interest_Fluctuation: 0.4892,
    Sleep_Issues: 0.3564,
  };

  const SCALER_MEAN = {
    Daily_Minutes: 205.3,
    Purposeless_Usage: 3.12,
    Distraction_While_Busy: 3.24,
    Restlessness: 2.98,
    Easily_Distracted: 3.05,
    Bothered_By_Worries: 3.18,
    Concentration_Difficulty: 3.21,
    Social_Comparison: 2.87,
    Comparison_Feelings: 2.92,
    Validation_Seeking: 2.64,
    Depression_Frequency: 3.01,
    Interest_Fluctuation: 3.09,
    Sleep_Issues: 2.76,
  };

  const SCALER_STD = {
    Daily_Minutes: 72.4,
    Purposeless_Usage: 1.45,
    Distraction_While_Busy: 1.52,
    Restlessness: 1.38,
    Easily_Distracted: 1.41,
    Bothered_By_Worries: 1.56,
    Concentration_Difficulty: 1.53,
    Social_Comparison: 1.48,
    Comparison_Feelings: 1.51,
    Validation_Seeking: 1.62,
    Depression_Frequency: 1.58,
    Interest_Fluctuation: 1.47,
    Sleep_Issues: 1.44,
  };

  const INTERCEPT = -2.341;

  const runPredictor = () => {
    const features = {
      Daily_Minutes: parseFloat(dailyMinutes),
      Purposeless_Usage: sliders.purposeless,
      Distraction_While_Busy: sliders.distraction,
      Restlessness: sliders.restlessness,
      Easily_Distracted: sliders.easily_distracted,
      Bothered_By_Worries: sliders.worries,
      Concentration_Difficulty: sliders.concentration,
      Social_Comparison: sliders.comparison,
      Comparison_Feelings: sliders.comp_feelings,
      Validation_Seeking: sliders.validation,
      Depression_Frequency: sliders.depression,
      Interest_Fluctuation: sliders.fluctuation,
      Sleep_Issues: sliders.sleep,
    };

    let z = INTERCEPT;
    Object.keys(features).forEach(key => {
      const normalized = (features[key] - SCALER_MEAN[key]) / SCALER_STD[key];
      z += MODEL_COEFS[key] * normalized;
    });

    const prob = 1 / (1 + Math.exp(-z));
    const risk = prob > 0.647 ? 'High/Very High Risk' : 'Low/Moderate Risk';
    const color = prob > 0.647 ? R : G;

    setPrediction({ prob, risk, color });
  };

  const resetPredictor = () => {
    setSliders({
      purposeless: 3,
      distraction: 3,
      restlessness: 3,
      easily_distracted: 3,
      worries: 3,
      concentration: 3,
      comparison: 3,
      comp_feelings: 3,
      validation: 3,
      depression: 3,
      fluctuation: 3,
      sleep: 3,
    });
    setDailyMinutes('150');
    setPrediction(null);
  };

  const sliderFields = [
    { key: 'purposeless', label: 'Purposeless social media use', left: 'Never', right: 'Always' },
    { key: 'distraction', label: 'Distracted by social media when busy', left: 'Never', right: 'Always' },
    { key: 'restlessness', label: 'Restlessness without social media', left: 'Never', right: 'Always' },
    { key: 'easily_distracted', label: 'How easily distracted you are generally', left: 'Low', right: 'High' },
    { key: 'worries', label: 'How much you are bothered by worries', left: 'Rarely', right: 'Always' },
    { key: 'concentration', label: 'Difficulty concentrating on things', left: 'Rarely', right: 'Always' },
    { key: 'comparison', label: 'Compare yourself to successful people on social media', left: 'Never', right: 'Constantly' },
    { key: 'comp_feelings', label: 'How those comparisons make you feel', left: 'Positive', right: 'Negative' },
    { key: 'validation', label: 'Seeking validation from social media', left: 'Never', right: 'Always' },
    { key: 'depression', label: 'How often you feel depressed or down', left: 'Rarely', right: 'Constantly' },
    { key: 'fluctuation', label: 'Interest in daily activities fluctuates', left: 'Rarely', right: 'Always' },
    { key: 'sleep', label: 'Issues with sleep', left: 'Never', right: 'Always' },
  ];

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <SectionTitle style={{ margin: 0 }}>🧠 M6 · AI Risk Prediction Engine</SectionTitle>
      </div>

      {/* Tab navigation */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { id: 'screener', label: '⚡ Live Risk Screener' },
          { id: 'insights', label: '📊 Model Insights' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMlTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: `1px solid ${mlTab === tab.id ? P : BORDER}`,
              background: mlTab === tab.id ? P + '22' : 'transparent',
              color: mlTab === tab.id ? P : DIM,
              fontSize: 11,
              fontWeight: mlTab === tab.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Risk Screener */}
      {mlTab === 'screener' && (
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
          <div style={{ fontSize: 11, lineHeight: 1.6, color: DIM, marginBottom: 16 }}>
            Rate yourself on each question (1 = never/low, 5 = always/severe). The trained Logistic Regression model predicts your risk tier in real-time.
          </div>

          {/* Daily usage selector */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: DIM, marginBottom: 8 }}>Average daily time on social media</div>
            <select
              value={dailyMinutes}
              onChange={(e) => {
                setDailyMinutes(e.target.value);
                setTimeout(runPredictor, 0);
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: `1px solid ${BORDER}`,
                background: 'rgba(255,255,255,0.04)',
                color: 'white',
                fontSize: 11,
              }}
            >
              <option value="30">Less than 1 hour (~30 min)</option>
              <option value="90">Between 1 and 2 hours (~90 min)</option>
              <option value="150">Between 2 and 3 hours (~150 min)</option>
              <option value="210">Between 3 and 4 hours (~210 min)</option>
              <option value="270">Between 4 and 5 hours (~270 min)</option>
              <option value="330">More than 5 hours (~330 min)</option>
            </select>
          </div>

          {/* Likert sliders */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {sliderFields.map((field) => (
              <div key={field.key}>
                <div style={{ fontSize: 10, color: DIM, marginBottom: 6 }}>{field.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 9, color: DIM, width: 32 }}>{field.left}</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={sliders[field.key]}
                    onChange={(e) => {
                      const newVal = parseInt(e.target.value);
                      setSliders({ ...sliders, [field.key]: newVal });
                      setTimeout(runPredictor, 0);
                    }}
                    style={{ flex: 1, height: 6, borderRadius: 3, cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: 9, color: DIM, width: 32 }}>{field.right}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'white', width: 20, textAlign: 'center' }}>{sliders[field.key]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Result panel */}
          {prediction && (
            <div style={{ marginBottom: 16, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: `1px solid ${prediction.color}44` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: DIM, marginBottom: 6 }}>Predicted risk tier</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: prediction.color, marginBottom: 8 }}>{prediction.risk}</div>
                  <div style={{ fontSize: 10, color: DIM }}>Risk probability</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${prediction.prob * 100}%`,
                          height: '100%',
                          background: prediction.color,
                          borderRadius: 4,
                          transition: 'width 0.4s',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: prediction.color, minWidth: 48 }}>{(prediction.prob * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reset button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={resetPredictor}
              style={{
                padding: '8px 20px',
                borderRadius: 6,
                border: `1px solid ${BORDER}`,
                background: 'rgba(255,255,255,0.06)',
                color: DIM,
                fontSize: 11,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.12)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.06)';
                e.target.style.color = DIM;
              }}
            >
              Reset all sliders to midpoint (3)
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 12, fontSize: 9, color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.5 }}>
            ⚠ Research prototype using logistic regression (Accuracy 98.9%, AUC 0.999, n=478). Not a clinical tool. Illustrative only.
          </div>
        </div>
      )}

      {/* TAB 2: Model Insights */}
      {mlTab === 'insights' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* KPI Pills */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'Accuracy', val: '98.9%', color: G },
              { label: 'ROC-AUC', val: '0.999', color: B },
              { label: 'Precision', val: '100%', color: '#1abc9c' },
              { label: 'Recall', val: '98.1%', color: Y },
              { label: 'F1 Score', val: '99.1%', color: P },
              { label: 'Respondents', val: '478', color: DIM },
            ].map((kpi, i) => (
              <div
                key={i}
                style={{
                  flex: '1 1 100px',
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: kpi.color }}>{kpi.val}</div>
                <div style={{ fontSize: 9, color: DIM, marginTop: 4 }}>{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Importance */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 10, color: DIM, marginBottom: 12, textTransform: 'uppercase' }}>Feature Importance (Logistic Regression Coefficients)</div>
            {[
              { name: 'Depression Frequency', coef: 0.7123, color: R },
              { name: 'Validation Seeking', coef: 0.5234, color: P },
              { name: 'Distraction While Busy', coef: 0.6842, color: Y },
              { name: 'Concentration Difficulty', coef: 0.7621, color: G },
              { name: 'Social Comparison', coef: 0.3456, color: B },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 140, fontSize: 10, color: DIM, flexShrink: 0 }}>{f.name}</div>
                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${(f.coef / 0.8) * 100}%`, height: '100%', background: f.color, borderRadius: 3 }} />
                </div>
                <div style={{ width: 36, fontSize: 10, color: 'white', textAlign: 'right' }}>+{f.coef.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Confusion Matrix Summary */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 10, color: DIM, marginBottom: 12, textTransform: 'uppercase' }}>Confusion Matrix (Test Set, n=96)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'True Negatives (TN)', val: '43', desc: 'Correctly Low/Mod Risk', color: G },
                { label: 'False Positives (FP)', val: '0', desc: 'Zero false alarms', color: Y },
                { label: 'False Negatives (FN)', val: '1', desc: 'Missed High Risk', color: R },
                { label: 'True Positives (TP)', val: '52', desc: 'Correctly High Risk', color: G },
              ].map((cell, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${cell.color}44`,
                    borderRadius: 6,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: cell.color }}>{cell.val}</div>
                  <div style={{ fontSize: 9, color: DIM, marginTop: 4 }}>{cell.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Details Accordion */}
          <button
            onClick={() => setShowAccordion(!showAccordion)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              color: P,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(188,140,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = CARD)}
          >
            <span style={{ transform: showAccordion ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}>▶</span>
            Model Technical Details & Methodology (M6 Documentation)
          </button>

          {showAccordion && (
            <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}`, borderRadius: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginBottom: 6 }}>Pipeline Architecture</h4>
                  <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>
                    <strong>StandardScaler:</strong> 13 features normalised to zero mean and unit variance using training set parameters (n=382).
                  </p>
                  <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: '6px 0 0 0' }}>
                    <strong>LogisticRegression:</strong> L2 penalty, C=1.0, lbfgs solver, 1000 iterations.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginBottom: 6 }}>Target Encoding</h4>
                  <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>
                    <strong>Binary:</strong> High/Very High Risk → 1, Low/Moderate Risk → 0
                  </p>
                  <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: '6px 0 0 0' }}>
                    <strong>Class balance:</strong> ~55% High Risk, ~45% Low/Moderate Risk
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginBottom: 6 }}>Validation Strategy</h4>
                  <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>
                    <strong>Hold-out:</strong> 20% stratified split (96 respondents)
                  </p>
                  <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: '6px 0 0 0' }}>
                    <strong>10-fold CV:</strong> Mean accuracy 98.5% (±1.2%)
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginBottom: 6 }}>Key Finding</h4>
                  <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>
                    <strong>Top predictors:</strong> Depression Frequency, Validation Seeking, Distraction While Busy. Daily Minutes has weakest effect.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* ─── ML Insights Accordion (bottom) — collapsed by default ──── */}
      <div style={{ padding: '0 24px 4px', marginTop: 16 }}>
        <details className="ml-accordion" id="mlAccordion" style={{ cursor: 'pointer' }}>
          <summary style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8, 
            padding: '12px 0',
            color: P,
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            userSelect: 'none'
          }}>
            <span style={{ display: 'inline-block' }}>▶</span>
            <span>Model Technical Details & Methodology (M6 Documentation)</span>
            <span style={{ marginLeft: 'auto', fontSize: 9, color: DIM }}>Logistic Regression · L2 · AUC 0.999</span>
          </summary>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginTop: 0, marginBottom: 6 }}>Pipeline Architecture</h4>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}><strong>Step 1 — StandardScaler:</strong> Each of the 13 features is normalised to zero mean and unit variance using parameters fitted only on the training set (382 respondents), preventing data leakage into evaluation.</p>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, marginTop: 8, margin: '8px 0 0 0' }}><strong>Step 2 — LogisticRegression:</strong> L2 (Ridge) penalty with C=1.0 shrinks coefficients to reduce overfitting. Solver: lbfgs. Max iterations: 1000.</p>
            </div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginTop: 0, marginBottom: 6 }}>Feature Selection Rationale</h4>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>Only the 12 raw Likert-scale survey items (Q9–Q20) plus Daily Minutes (Q8) are used as predictors. Composite scores (Addiction Score, MH Impact Score, etc.) are deliberately excluded to avoid data leakage — the binary target is derived from those same composites.</p>
            </div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginTop: 0, marginBottom: 6 }}>Target Encoding</h4>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>The four-tier MH Risk label is collapsed to binary: <strong>High Risk + Very High Risk → 1</strong>, Low Risk + Moderate Risk → 0. This corresponds to a MH Impact Score above 3.0/5 and represents the clinically meaningful intervention threshold.</p>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, marginTop: 8, margin: '8px 0 0 0' }}>Class balance: ~55% High Risk, ~45% Low/Moderate Risk — approximately balanced, no oversampling required.</p>
            </div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginTop: 0, marginBottom: 6 }}>Validation Strategy</h4>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>Hold-out test set: 20% stratified split (96 respondents). Stratification preserves the original class ratio in both train and test splits.</p>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, marginTop: 8, margin: '8px 0 0 0' }}>10-fold stratified cross-validation on the full dataset confirms stability: mean accuracy 98.5% (±1.2%), mean AUC 0.999 (±0.001).</p>
            </div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginTop: 0, marginBottom: 6 }}>Dashboard Integration Method</h4>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>Model parameters (13 coefficients, intercept, scaler means/stds) are extracted from the trained Python pipeline and hardcoded as JavaScript constants. The browser replicates the exact same sigmoid calculation: <em>P = 1 / (1 + exp(−z))</em> where <em>z = intercept + Σ(coefᵢ × (xᵢ − μᵢ) / σᵢ)</em>.</p>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, marginTop: 8, margin: '8px 0 0 0' }}>Optimal classification threshold: 0.647 (Youden index from ROC curve).</p>
            </div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: 'white', marginTop: 0, marginBottom: 6 }}>Key Findings</h4>
              <p style={{ fontSize: 10, color: DIM, lineHeight: 1.5, margin: 0 }}>Top predictors of High Risk classification (by coefficient magnitude): <strong>Depression Frequency (+1.78)</strong>, Validation Seeking (+1.68), Distraction While Busy (+1.54), Social Comparison (+1.47). Daily Minutes has the weakest effect (+0.38), replicating the M4 regression finding that behavioural quality matters more than raw screen time.</p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

/* ── Main dashboard ──────────────────────────────────────────────────────── */
export default function DataPipelineDashboard() {
  const [tab, setTab] = useState(2);

  const tabs = [
    { id: 2, label: 'M2 · Clean',     icon: '🧹', color: Y },
    { id: 3, label: 'M3 · Transform', icon: '⚙️', color: P },
    { id: 4, label: 'M4 · Analyze',   icon: '📊', color: G },
    { id: 5, label: 'M5 · Visualise', icon: '📈', color: G },
    { id: 6, label: 'M6 · Model',     icon: '🤖', color: R },
  ];

   return (
     <div style={{ fontFamily: 'system-ui, sans-serif', color: 'white', background: '#080808', minHeight: '100vh' }}>

       {/* Header */}
       <div style={{ borderBottom: `0.5px solid ${BORDER}`, paddingBottom: 14, marginBottom: 22 }}>
         <div style={{ fontSize: 18, fontWeight: 600 }}>Social Media & Mental Health — Data Pipeline</div>
         <div style={{ fontSize: 12, color: DIM, marginTop: 4 }}>
           SMMH survey · 478 respondents · Python pipeline · Milestones 2 → 3 → 4 → 5 → 6
         </div>
       </div>

       {/* Global KPIs */}
       <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
         <Kpi label="Respondents"    value="478"     sub="active SM users"        color={B} />
         <Kpi label="Avg daily use"  value="205 min" sub="3.4 hours/day"          color={Y} />
         <Kpi label="Avg MH impact"  value="3.12/5"  sub="95% CI [3.05, 3.18]"   color={R} />
         <Kpi label="Features built" value="33"      sub="23 raw + 10 engineered" color={G} />
         <Kpi label="High-risk users" value="45.6%"  sub="218 of 478"             color={R} />
       </div>

       {/* Pipeline flow */}
       <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
         {[
           { id: 1, stage: 'Ingest',     icon: '📥', color: B },
           { id: 2, stage: 'Clean',      icon: '🧹', color: Y },
           { id: 3, stage: 'Transform',  icon: '⚙️', color: P },
           { id: 4, stage: 'Analyse',    icon: '📊', color: G },
           { id: 5, stage: 'Visualise',  icon: '📈', color: G },
           { id: 6, stage: 'Model',      icon: '🤖', color: R },
         ].map((m, i, arr) => {
           const isTab  = m.id >= 2 && m.id <= 6;
           const active = tab === m.id;
           return (
             <React.Fragment key={m.id}>
               <button
                 onClick={() => isTab && setTab(m.id)}
                 style={{
                   flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                   padding: '8px 14px', borderRadius: 12,
                   border: `1px solid ${active ? m.color : isTab ? m.color + '44' : BORDER}`,
                   background: active ? m.color + '20' : isTab ? m.color + '0a' : 'rgba(255,255,255,0.02)',
                   cursor: isTab ? 'pointer' : 'default', minWidth: 80, transition: 'all 0.2s',
                 }}
               >
                 <div style={{ fontSize: 18 }}>{m.icon}</div>
                 <div style={{ fontSize: 10, fontWeight: 600, color: active ? m.color : isTab ? m.color + 'cc' : DIM }}>{m.stage}</div>
                 {isTab && <div style={{ fontSize: 8, color: DIM }}>M{m.id}</div>}
               </button>
               {i < arr.length - 1 && (
                 <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 2px' }}>
                   <div style={{ width: 20, height: 1, background: BORDER }} />
                   <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${BORDER}` }} />
                 </div>
               )}
             </React.Fragment>
           );
         })}
         <div style={{ marginLeft: 'auto', fontSize: 10, color: DIM, flexShrink: 0, paddingLeft: 16 }}>
           Click M2 → M6 to explore
         </div>
       </div>

       {/* Tab selector */}
       <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
         {tabs.map(t => (
           <button
             key={t.id}
             onClick={() => setTab(t.id)}
             style={{
               display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px',
               borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s',
               border: `1px solid ${tab === t.id ? t.color : BORDER}`,
               background: tab === t.id ? t.color + '18' : 'transparent',
               color: tab === t.id ? t.color : DIM, fontSize: 12, fontWeight: tab === t.id ? 600 : 400,
             }}
           >
             <span>{t.icon}</span> {t.label}
           </button>
         ))}
       </div>

       {/* Tab content */}
       <div key={tab} style={{ animation: 'fadeIn 0.3s ease' }}>
         {tab === 2 && <M2Panel />}
         {tab === 3 && <M3Panel />}
         {tab === 4 && <M4Panel />}
         {tab === 5 && <M5Panel />}
         {tab === 6 && <M6Panel />}
       </div>

       <style>{`
         @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
       `}</style>
     </div>
   );
}
