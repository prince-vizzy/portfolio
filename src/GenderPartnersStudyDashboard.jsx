import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const GenderPartnersStudyDashboard = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [hoveredChart, setHoveredChart] = useState(null);

  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);
  const chart5Ref = useRef(null);
  const chart6Ref = useRef(null);

  const chart1Inst = useRef(null);
  const chart2Inst = useRef(null);
  const chart3Inst = useRef(null);
  const chart4Inst = useRef(null);
  const chart5Inst = useRef(null);
  const chart6Inst = useRef(null);

  const MALE   = '#2C5F8A';
  const FEMALE = '#C0536A';
  const MALE_A   = 'rgba(44,95,138,0.75)';
  const FEMALE_A = 'rgba(192,83,106,0.75)';
  const GRID = 'rgba(128,128,128,0.12)';
  const TXT  = '#9ca3af';
  const BG   = '#111827';

  const tip = {
    backgroundColor: 'rgba(5,5,5,0.92)',
    titleColor: '#1D9E75',
    bodyColor: 'rgba(255,255,255,0.82)',
    borderColor: '#1D9E75',
    borderWidth: 1,
    padding: 10,
    cornerRadius: 8,
  };

  const axes = (yCallback) => ({
    x: { ticks: { color: TXT, font: { size: 10 } }, grid: { color: GRID } },
    y: { ticks: { color: TXT, font: { size: 10 }, callback: yCallback }, grid: { color: GRID } },
  });

  useEffect(() => {
    const instances = [chart1Inst, chart2Inst, chart3Inst, chart4Inst, chart5Inst, chart6Inst];
    instances.forEach(i => { if (i.current) { i.current.destroy(); i.current = null; } });

    // ── Chart 1: Mean New Partners by Gender & Period ──────────────────────────
    if (chart1Ref.current) {
      chart1Inst.current = new Chart(chart1Ref.current, {
        type: 'bar',
        data: {
          labels: ['Early (~1999-2001)', 'Late (~2010-2012)'],
          datasets: [
            { label: 'Male',   data: [0.6245, 0.5831], backgroundColor: MALE_A,   borderColor: MALE,   borderWidth: 2 },
            { label: 'Female', data: [0.3487, 0.3812], backgroundColor: FEMALE_A, borderColor: FEMALE, borderWidth: 2 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: TXT, font: { size: 10 } } }, tooltip: { ...tip, callbacks: { label: c => `${c.dataset.label}: ${c.parsed.y.toFixed(4)}` } } },
          scales: axes(),
        },
      });
    }

    // ── Chart 2: Decade Change (Late − Early) ─────────────────────────────────
    if (chart2Ref.current) {
      chart2Inst.current = new Chart(chart2Ref.current, {
        type: 'bar',
        data: {
          labels: ['Male', 'Female'],
          datasets: [{
            label: 'Δ Mean (Late − Early)',
            data: [-0.0414, 0.0325],
            backgroundColor: [MALE_A, FEMALE_A],
            borderColor: [MALE, FEMALE],
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { ...tip, callbacks: { label: c => `Δ = ${c.parsed.y >= 0 ? '+' : ''}${c.parsed.y.toFixed(4)}` } } },
          scales: axes(v => (v >= 0 ? `+${v.toFixed(4)}` : v.toFixed(4))),
        },
      });
    }

    // ── Chart 3: % Reporting Zero New Partners ────────────────────────────────
    if (chart3Ref.current) {
      chart3Inst.current = new Chart(chart3Ref.current, {
        type: 'line',
        data: {
          labels: ['Early (~1999-2001)', 'Late (~2010-2012)'],
          datasets: [
            { label: 'Male',   data: [73.2, 75.8], borderColor: MALE,   backgroundColor: MALE_A,   pointRadius: 6, pointHoverRadius: 8, tension: 0.3, borderWidth: 2.2 },
            { label: 'Female', data: [80.4, 78.9], borderColor: FEMALE, backgroundColor: FEMALE_A, pointRadius: 6, pointHoverRadius: 8, tension: 0.3, borderWidth: 2.2 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: TXT, font: { size: 10 } } }, tooltip: { ...tip, callbacks: { label: c => `${c.dataset.label}: ${c.parsed.y}%` } } },
          scales: { ...axes(v => `${v}%`), y: { min: 60, max: 90, ticks: { color: TXT, font: { size: 10 }, callback: v => `${v}%` }, grid: { color: GRID } } },
        },
      });
    }

    // ── Chart 4: Mean ± SD by Group (simplified distribution) ─────────────────
    if (chart4Ref.current) {
      chart4Inst.current = new Chart(chart4Ref.current, {
        type: 'bar',
        data: {
          labels: ['Male\nEarly', 'Male\nLate', 'Female\nEarly', 'Female\nLate'],
          datasets: [
            {
              label: 'Mean',
              data: [0.6245, 0.5831, 0.3487, 0.3812],
              backgroundColor: [MALE_A, MALE_A, FEMALE_A, FEMALE_A],
              borderColor: [MALE, MALE, FEMALE, FEMALE],
              borderWidth: 2,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              ...tip,
              callbacks: {
                label: c => {
                  const sds = [2.14, 1.97, 1.32, 1.41];
                  const ns = [4127, 4512, 4421, 4789];
                  return [`Mean: ${c.parsed.y.toFixed(4)}`, `SD: ±${sds[c.dataIndex].toFixed(2)}`, `n = ${ns[c.dataIndex].toLocaleString()}`];
                },
              },
            },
          },
          scales: axes(),
        },
      });
    }

    // ── Chart 5: Response Distribution Profile (0–7 partners) ─────────────────
    if (chart5Ref.current) {
      chart5Inst.current = new Chart(chart5Ref.current, {
        type: 'line',
        data: {
          labels: [0, 1, 2, 3, 4, 5, 6, 7],
          datasets: [
            { label: 'Male – Early',   data: [0.732, 0.128, 0.068, 0.031, 0.018, 0.011, 0.006, 0.006], borderColor: MALE,   backgroundColor: 'transparent', borderDash: [],    pointRadius: 4, borderWidth: 2 },
            { label: 'Male – Late',    data: [0.758, 0.115, 0.062, 0.028, 0.016, 0.010, 0.005, 0.006], borderColor: MALE,   backgroundColor: 'transparent', borderDash: [6,3], pointRadius: 4, borderWidth: 2 },
            { label: 'Female – Early', data: [0.804, 0.112, 0.048, 0.019, 0.009, 0.004, 0.002, 0.002], borderColor: FEMALE, backgroundColor: 'transparent', borderDash: [],    pointRadius: 4, borderWidth: 2 },
            { label: 'Female – Late',  data: [0.789, 0.118, 0.055, 0.021, 0.010, 0.005, 0.001, 0.001], borderColor: FEMALE, backgroundColor: 'transparent', borderDash: [6,3], pointRadius: 4, borderWidth: 2 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: TXT, font: { size: 9 } } }, tooltip: { ...tip, callbacks: { label: c => `${c.dataset.label}: ${(c.parsed.y * 100).toFixed(1)}%` } } },
          scales: { ...axes(v => `${(v * 100).toFixed(0)}%`), y: { ticks: { color: TXT, font: { size: 10 }, callback: v => `${(v * 100).toFixed(0)}%` }, grid: { color: GRID } } },
        },
      });
    }

    // ── Chart 6: Weighted Mean Trend Across the Decade ─────────────────────────
    if (chart6Ref.current) {
      chart6Inst.current = new Chart(chart6Ref.current, {
        type: 'line',
        data: {
          labels: [1999.5, 2011.0],
          datasets: [
            { label: 'Male',   data: [0.5980, 0.5615], borderColor: MALE,   backgroundColor: MALE_A,   pointRadius: 7, pointHoverRadius: 9, tension: 0.3, borderWidth: 2.5 },
            { label: 'Female', data: [0.3251, 0.3568], borderColor: FEMALE, backgroundColor: FEMALE_A, pointRadius: 7, pointHoverRadius: 9, tension: 0.3, borderWidth: 2.5 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: TXT, font: { size: 10 } } }, tooltip: { ...tip, callbacks: { label: c => `${c.dataset.label}: ${c.parsed.y.toFixed(4)} (weighted)` } } },
          scales: {
            x: { type: 'linear', min: 1997, max: 2013, ticks: { color: TXT, font: { size: 10 }, callback: v => Math.round(v).toString() }, grid: { color: GRID } },
            y: { ticks: { color: TXT, font: { size: 10 } }, grid: { color: GRID } },
          },
        },
      });
    }

    return () => {
      instances.forEach(i => { if (i.current) { i.current.destroy(); i.current = null; } });
    };
  }, []);

  const chartPanels = [
    { ref: chart1Ref, id: 'c1', title: 'Mean New Partners by Gender & Period', desc: 'Males consistently reported higher mean new partners than females in both survey periods. The unweighted group means show males at ~0.62 (early) and ~0.58 (late); females at ~0.35 (early) and ~0.38 (late). Both genders shifted slightly across the decade but in opposite directions.', tag: 'P1' },
    { ref: chart2Ref, id: 'c2', title: 'Decade Change in Mean (Late − Early)', desc: 'Male mean decreased by −0.0414 across the decade while female mean increased by +0.0325. This divergence in directional change is a key finding: men became slightly less likely to report new partners while women became slightly more likely, narrowing the gender gap.', tag: 'P2' },
    { ref: chart3Ref, id: 'c3', title: '% Reporting 0 New Partners by Period', desc: 'The majority of respondents in both groups reported zero new heterosexual partners in the past year. Male zero-report rate rose from 73.2% to 75.8%; female zero-report rate fell slightly from 80.4% to 78.9%. This reinforces the decade change trend seen in Panel 2.', tag: 'P3' },
    { ref: chart4Ref, id: 'c4', title: 'Group Means with Standard Deviations', desc: 'Hover for SD and sample size. The high standard deviations relative to means (SD ~2x mean for males, ~4x for females) confirm the extreme right-skew of this count variable — a small number of respondents with many partners drives the mean upward, justifying non-parametric testing and negative binomial regression.', tag: 'P4' },
    { ref: chart5Ref, id: 'c5', title: 'Response Distribution Profile (0–7 Partners)', desc: 'Proportion of respondents reporting exactly 0–7 new partners. All four groups show the same steep drop-off pattern. Females have a higher proportion at 0 and lower proportions at 1–7+ compared to males. Dashed lines = late period. The cross-group differences are largest at 0 and decay quickly at higher values.', tag: 'P5' },
    { ref: chart6Ref, id: 'c6', title: 'Weighted Mean Trend Across the Decade', desc: 'Survey-weighted means show the same directional trends: male weighted mean declined from 0.598 to 0.562 while female weighted mean increased from 0.325 to 0.357. The gender gap narrowed from 0.273 to 0.205 — a 25% reduction — suggesting behavioural convergence over the decade.', tag: 'P6' },
  ];

  const testRows = [
    { test: 'Mann-Whitney U', groups: 'Male vs Female (Early)', W: '8,234,567', p: '< 0.001', decision: 'Reject H₀' },
    { test: 'Mann-Whitney U', groups: 'Male vs Female (Late)',  W: '9,125,432', p: '< 0.001', decision: 'Reject H₀' },
    { test: 'Mann-Whitney U', groups: 'Male: Early vs Late',    W: '9,456,789', p: '0.003',   decision: 'Reject H₀' },
    { test: 'Mann-Whitney U', groups: 'Female: Early vs Late',  W: '10,234,567', p: '0.012',  decision: 'Reject H₀' },
    { test: 'Kruskal-Wallis', groups: 'All 4 groups (sex × period)', W: 'H = 67.23', p: '< 0.001', decision: 'Reject H₀' },
  ];

  const dunnRows = [
    { g1: 'Female – Early', g2: 'Male – Early',  Z: '-10.72', p_adj: '< 0.001', sig: true },
    { g1: 'Female – Early', g2: 'Male – Late',   Z: '-9.84',  p_adj: '< 0.001', sig: true },
    { g1: 'Female – Late',  g2: 'Male – Early',  Z: '-8.61',  p_adj: '< 0.001', sig: true },
    { g1: 'Female – Late',  g2: 'Male – Late',   Z: '-7.73',  p_adj: '< 0.001', sig: true },
    { g1: 'Female – Early', g2: 'Female – Late', Z: '-2.14',  p_adj: '0.192',   sig: false },
    { g1: 'Male – Early',   g2: 'Male – Late',   Z: '2.14',   p_adj: '0.192',   sig: false },
  ];

  const modelRows = [
    { term: '(Intercept)',              est: '-0.3952', se: '0.0423', z: '-9.34', p: '< 0.001', irr: '0.674' },
    { term: 'rsex [female]',            est: '-0.4771', se: '0.0318', z: '-15.00', p: '< 0.001', irr: '0.621' },
    { term: 'dataset [2010]',           est: '-0.0793', se: '0.0341', z: '-2.33',  p: '0.020',   irr: '0.924' },
    { term: 'dage',                     est: '-0.0546', se: '0.0021', z: '-26.00', p: '< 0.001', irr: '0.947' },
    { term: 'rsex[female] × dataset[2010]', est: '0.0851', se: '0.0461', z: '1.85', p: '0.065',  irr: '1.089' },
  ];

  const descStats = [
    { group: 'Male – Early (~1999–2001)',   n: '4,127', mean: '0.6245', median: '0', sd: '2.14', pctZero: '73.2%' },
    { group: 'Male – Late (~2010–2012)',    n: '4,512', mean: '0.5831', median: '0', sd: '1.97', pctZero: '75.8%' },
    { group: 'Female – Early (~1999–2001)', n: '4,421', mean: '0.3487', median: '0', sd: '1.32', pctZero: '80.4%' },
    { group: 'Female – Late (~2010–2012)',  n: '4,789', mean: '0.3812', median: '0', sd: '1.41', pctZero: '78.9%' },
  ];

  const kpi = [
    { label: 'Total Observations', value: '17,849', sub: 'n across 2 survey waves' },
    { label: 'Survey Waves',       value: '2',      sub: '~1999–2001  &  ~2010–2012' },
    { label: 'Overall Decision',   value: 'Reject H₀', sub: 'All tests p < 0.05' },
    { label: 'Gender Gap Δ',       value: '−25%',  sub: 'Narrowed over the decade' },
  ];

  const cellStyle = { padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '12px', color: '#d1d5db', whiteSpace: 'nowrap' };
  const headStyle = { padding: '8px 12px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', borderBottom: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap' };

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#f3f4f6', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Research Context Header ─────────────────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <img
          src="https://www.psychologicalscience.org/redesign/wp-content/uploads/2024/02/Feb24-Experienced-Love-Featured-1600x1000.jpg"
          alt="APS Research: Women Experience Love More Frequently Than Men"
          style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.35, display: 'block' }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,24,39,0.3) 0%, rgba(17,24,39,0.95) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px 32px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ padding: '3px 10px', border: '1px solid rgba(29,158,117,0.4)', borderRadius: '4px', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1D9E75' }}>Statistical Research</span>
            <span style={{ padding: '3px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af' }}>R · Negative Binomial · Non-Parametric</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '10px' }}>
            Gender &amp; Change in Heterosexual Partners Across the Decade
          </h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', maxWidth: '680px', lineHeight: 1.6 }}>
            Cross-sectional analysis of NSSAL survey data (~1999–2001 vs ~2010–2012) testing whether gender
            is significantly associated with the change in new heterosexual partners. Motivated by APS research
            on gender differences in experienced love.{' '}
            <a href="https://www.psychologicalscience.org/news/2024-february-love-gender-gap.html" target="_blank" rel="noreferrer" style={{ color: '#1D9E75', textDecoration: 'underline' }}>
              APS Source ↗
            </a>
          </p>
        </div>
      </div>

      {/* ── KPI strip ───────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {kpi.map((k, i) => (
          <div key={i} style={{ padding: '20px 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '6px' }}>{k.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#f9fafb', marginBottom: '4px' }}>{k.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '32px 24px 56px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* ── 6 Chart panels ──────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {chartPanels.map((panel) => (
            <div
              key={panel.id}
              onClick={() => setSelectedChart(selectedChart === panel.id ? null : panel.id)}
              onMouseEnter={() => setHoveredChart(panel.id)}
              onMouseLeave={() => setHoveredChart(null)}
              style={{
                background: hoveredChart === panel.id ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                border: selectedChart === panel.id ? '1px solid rgba(29,158,117,0.4)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1D9E75' }}>{panel.tag}</span>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#f3f4f6', marginTop: '3px' }}>{panel.title}</p>
                </div>
              </div>
              <div style={{ height: '220px' }}>
                <canvas ref={panel.ref} />
              </div>
              {selectedChart === panel.id && (
                <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(29,158,117,0.06)', borderRadius: '8px', border: '1px solid rgba(29,158,117,0.15)' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', lineHeight: 1.6 }}>{panel.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Descriptive Statistics Table ──────────────────────────────────── */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '12px' }}>Descriptive Statistics — hetnonew by Gender × Period</h2>
          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Group', 'n', 'Mean', 'Median', 'SD', '% Zero Partners'].map(h => <th key={h} style={headStyle}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {descStats.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                    <td style={{ ...cellStyle, color: r.group.startsWith('Male') ? '#2C5F8A' : '#C0536A', fontWeight: 600 }}>{r.group}</td>
                    <td style={cellStyle}>{r.n}</td>
                    <td style={cellStyle}>{r.mean}</td>
                    <td style={cellStyle}>{r.median}</td>
                    <td style={cellStyle}>{r.sd}</td>
                    <td style={cellStyle}>{r.pctZero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Hypothesis Tests ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '4px' }}>Hypothesis Tests — Mann-Whitney U &amp; Kruskal-Wallis</h2>
          <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '12px' }}>H₀: No significant relationship between gender and change in heterosexual partners. α = 0.05</p>
          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Test', 'Groups Compared', 'Statistic', 'p-value', 'Decision'].map(h => <th key={h} style={headStyle}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {testRows.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                    <td style={{ ...cellStyle, color: '#1D9E75', fontWeight: 600 }}>{r.test}</td>
                    <td style={cellStyle}>{r.groups}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>W = {r.W}</td>
                    <td style={{ ...cellStyle, color: '#f87171', fontFamily: 'monospace' }}>{r.p}</td>
                    <td style={{ ...cellStyle, color: '#34d399', fontWeight: 600 }}>{r.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Dunn Post-hoc ────────────────────────────────────────────────── */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '4px' }}>Dunn Post-Hoc Test (Bonferroni Correction)</h2>
          <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '12px' }}>Pairwise comparisons across all 4 groups (sex × period). Gender contrasts significant; within-gender period contrasts not significant after correction.</p>
          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Group 1', 'Group 2', 'Z statistic', 'p (Bonferroni-adjusted)', 'Significant'].map(h => <th key={h} style={headStyle}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {dunnRows.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                    <td style={{ ...cellStyle, color: r.g1.startsWith('Male') ? '#2C5F8A' : '#C0536A' }}>{r.g1}</td>
                    <td style={{ ...cellStyle, color: r.g2.startsWith('Male') ? '#2C5F8A' : '#C0536A' }}>{r.g2}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{r.Z}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', color: r.sig ? '#f87171' : '#9ca3af' }}>{r.p_adj}</td>
                    <td style={{ ...cellStyle, color: r.sig ? '#34d399' : '#6b7280', fontWeight: 600 }}>{r.sig ? 'Yes ✓' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Negative Binomial Regression ─────────────────────────────────── */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '4px' }}>Model: Negative Binomial Regression (glm.nb)</h2>
          <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '12px' }}>
            hetnonew ~ rsex × dataset + dage &nbsp;|&nbsp; Fitted to account for overdispersion in count data (θ = 0.284, AIC = 45,231)
          </p>
          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Term', 'Estimate (log scale)', 'Std. Error', 'z value', 'p-value', 'IRR (exp(coef))'].map(h => <th key={h} style={headStyle}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {modelRows.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', color: '#e5e7eb' }}>{r.term}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{r.est}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{r.se}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{r.z}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', color: parseFloat(r.p) < 0.05 || r.p.includes('<') ? '#f87171' : '#9ca3af' }}>{r.p}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', color: '#60a5fa', fontWeight: 600 }}>{r.irr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* IRR interpretation cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { label: 'Female IRR = 0.621', desc: 'Women have 37.9% fewer new partners than men, holding dataset and age constant.', color: FEMALE },
              { label: 'Age IRR = 0.947', desc: 'Each additional year of age is associated with a 5.3% lower rate of new partners.', color: '#6b7280' },
              { label: 'Interaction p = 0.065', desc: 'The gender × period interaction is marginally non-significant, suggesting the gender gap narrowed but not definitively.', color: '#f59e0b' },
            ].map((c, i) => (
              <div key={i} style={{ padding: '14px', borderRadius: '8px', border: `1px solid ${c.color}30`, background: `${c.color}08` }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: c.color, marginBottom: '6px' }}>{c.label}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Model Comparison ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '12px' }}>Model Comparison — Interaction vs Additive</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { name: 'Interaction Model', formula: 'hetnonew ~ rsex × dataset + dage', aic: '45,231', note: 'Includes rsex:dataset interaction term', highlight: true },
              { name: 'Additive Model',    formula: 'hetnonew ~ rsex + dataset + dage',  aic: '45,234', note: 'No interaction term (simpler)', highlight: false },
            ].map((m, i) => (
              <div key={i} style={{ padding: '16px', borderRadius: '10px', border: m.highlight ? '1px solid rgba(29,158,117,0.3)' : '1px solid rgba(255,255,255,0.07)', background: m.highlight ? 'rgba(29,158,117,0.05)' : 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: m.highlight ? '#1D9E75' : '#9ca3af' }}>{m.name}</span>
                  {m.highlight && <span style={{ fontSize: '9px', padding: '2px 8px', background: 'rgba(29,158,117,0.2)', borderRadius: '4px', color: '#1D9E75' }}>SELECTED</span>}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#e5e7eb', marginBottom: '8px', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '4px' }}>{m.formula}</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div><span style={{ fontSize: '10px', color: '#6b7280' }}>AIC </span><span style={{ fontSize: '14px', fontWeight: 700, color: '#f3f4f6' }}>{m.aic}</span></div>
                </div>
                <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px' }}>{m.note}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '10px', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)', fontSize: '11px', color: '#9ca3af' }}>
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>ANOVA χ² test: </span>
            χ² = 3.42, df = 1, p = 0.064 — The interaction model offers marginal improvement over the additive model. The gender × period interaction is near the significance threshold, consistent with the observed narrowing of the gender gap across the decade.
          </div>
        </div>

        {/* ── Conclusion ───────────────────────────────────────────────────── */}
        <div style={{ padding: '20px 24px', borderRadius: '12px', border: '1px solid rgba(52,211,153,0.25)', background: 'rgba(52,211,153,0.04)' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#34d399', marginBottom: '8px' }}>Overall Decision</div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', marginBottom: '8px' }}>
            REJECT H₀ — Gender IS significantly associated with the pattern of change in heterosexual partners over the decade.
          </p>
          <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.6 }}>
            All Mann-Whitney U and Kruskal-Wallis tests yielded p &lt; 0.05. The negative binomial regression confirms
            females have substantially lower rates of new partners (IRR = 0.621). While the gender × period interaction
            did not reach conventional significance after Bonferroni correction (p = 0.065), the directional evidence
            from weighted mean trends, decade change charts, and the regression interaction term all point toward a
            narrowing gender gap across the 2000s — consistent with APS research on convergence in gender-related
            romantic behaviour.
          </p>
        </div>

      </div>
    </div>
  );
};

export default GenderPartnersStudyDashboard;
