<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import TiltedCard from './TiltedCard';

const TitanicDashboard = ({ onOpenCV }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [hoveredKPI, setHoveredKPI] = useState(null);
  const [hoveredChart, setHoveredChart] = useState(null);
  
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);
  const chart5Ref = useRef(null);
  const chart6Ref = useRef(null);
  const chart7Ref = useRef(null);
  const chart8Ref = useRef(null);
  
  let chart1Instance = useRef(null);
  let chart2Instance = useRef(null);
  let chart3Instance = useRef(null);
  let chart4Instance = useRef(null);
  let chart5Instance = useRef(null);
  let chart6Instance = useRef(null);
  let chart7Instance = useRef(null);
  let chart8Instance = useRef(null);

  const G = '#1D9E75';
  const R = '#D85A30';
  const B1 = '#185FA5';
  const B2 = '#378ADD';
  const B3 = '#85B7EB';
  const P1 = '#534AB7';
  const P2 = '#7F77DD';
  const GR = '#888780';
  const GRID = 'rgba(128,128,128,0.12)';
  const TXT = '#888780';

  const chartDetails = {
    c1: {
      title: "Survival by Sex",
      description: "Chi-square analysis showing significant survival disparity between genders (χ² = 260.7, p < 0.001). Female passengers had a 74.2% survival rate compared to 18.9% for males, supporting the 'women and children first' protocol.",
      stats: { chi2: "260.7", p_value: "< 0.001", insight: "Gender was the strongest predictor of survival" }
    },
    c2: {
      title: "Survival by Class",
      description: "Social class strongly influenced survival chances (χ² = 102.9, p < 0.001). First-class passengers had a 63.0% survival rate, while third-class only had 24.2%, highlighting socioeconomic disparities in the disaster.",
      stats: { chi2: "102.9", p_value: "< 0.001", insight: "Class disparity: 1st class 63% vs 3rd class 24.2%" }
    },
    c3: {
      title: "Age Distribution",
      description: "Younger passengers had slightly higher survival rates (t-test: t = -2.07, p = 0.039). Survivors averaged 28.3 years compared to 30.6 years for non-survivors, suggesting age played a role but was less significant than gender.",
      stats: { t_stat: "-2.07", p_value: "0.039", insight: "Survivors were ~2.3 years younger on average" }
    },
    c4: {
      title: "Sex × Class Interaction",
      description: "The gender advantage was most pronounced in 1st class (female survival 96.8% vs male 36.9%) but dropped significantly in 3rd class (50.0% vs 13.5%), suggesting class modified the 'women first' protocol's effectiveness.",
      stats: { interaction: "Significant", insight: "Female advantage dropped from 96.8% to 50.0% in 3rd class" }
    },
    c5: {
      title: "Family Composition Effect",
      description: "An inverted-U pattern emerged: passengers with small families (2-4 members) had the highest survival rate (57.8%), while those alone (30.4%) or with large families (16.1%) fared worse. Social support networks influenced survival.",
      stats: { pattern: "Inverted-U", insight: "Small families (2-4) had 57.8% survival rate" }
    },
    c6: {
      title: "Embarkation Port Analysis",
      description: "Passengers from Cherbourg had higher survival (55.4%) vs Southampton (33.7%), but this advantage is confounded by class - Cherbourg had more 1st class passengers. Port alone wasn't causally linked to survival.",
      stats: { cherbourg: "55.4%", southampton: "33.7%", insight: "Cherbourg advantage explained by class composition" }
    },
    c7: {
      title: "Fare Distribution",
      description: "Survivors paid significantly higher fares (£48.40 avg vs £22.12), a 119% premium. Higher fares (1st/2nd class) provided better access to lifeboats, though fare itself correlates strongly with class.",
      stats: { survivors: "£48.40", perished: "£22.12", insight: "119% fare premium for survivors" }
    },
    c8: {
      title: "Logistic Regression Results",
      description: "Multivariate analysis confirms gender dominates all predictors (OR = 12.35 for females). 3rd class had dramatically lower odds (OR = 0.10), while age (OR = 0.96) and family size (OR = 0.72) had smaller but significant effects.",
      stats: { female_or: "12.35", third_class_or: "0.10", insight: "Gender effect remains after adjusting for class, age, and family" }
    }
  };

  useEffect(() => {
    const base = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { display: false }, 
        tooltip: { 
          callbacks: {},
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#1D9E75',
          bodyColor: 'rgba(255,255,255,0.8)',
          borderColor: '#1D9E75',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8
        } 
      },
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      }
    };

    if (chart1Ref.current) {
      chart1Instance.current = new Chart(chart1Ref.current, {
        type: 'doughnut',
        data: {
          labels: ['Female survived', 'Female perished', 'Male survived', 'Male perished'],
          datasets: [{
            data: [233, 81, 109, 468],
            backgroundColor: [G, '#9FE1CB', R, '#F5C4B3'],
            borderWidth: 2, borderColor: 'transparent', hoverOffset: 12,
            hoverBorderWidth: 3, hoverBorderColor: 'white'
          }]
        },
        options: { ...base, cutout: '62%' }
      });
    }

    if (chart2Ref.current) {
      chart2Instance.current = new Chart(chart2Ref.current, {
        type: 'doughnut',
        data: {
          labels: ['1st survived', '1st perished', '2nd survived', '2nd perished', '3rd survived', '3rd perished'],
          datasets: [{
            data: [136, 80, 87, 97, 119, 372],
            backgroundColor: [B1, '#B5D4F4', B2, '#85B7EB', B3, '#E6F1FB'],
            borderWidth: 2, borderColor: 'transparent', hoverOffset: 12,
            hoverBorderWidth: 3, hoverBorderColor: 'white'
          }]
        },
        options: { ...base, cutout: '62%' }
      });
    }

    if (chart3Ref.current) {
      const ageBins = ['0–9', '10–19', '20–29', '30–39', '40–49', '50–59', '60–69', '70+'];
      chart3Instance.current = new Chart(chart3Ref.current, {
        type: 'bar',
        data: {
          labels: ageBins,
          datasets: [
            { label: 'Survived', data: [28, 45, 77, 62, 41, 25, 10, 2], backgroundColor: G + 'cc', barPercentage: 0.9, categoryPercentage: 0.9, hoverBackgroundColor: G },
            { label: 'Perished', data: [8, 22, 145, 128, 89, 24, 6, 2], backgroundColor: R + 'cc', barPercentage: 0.9, categoryPercentage: 0.9, hoverBackgroundColor: R }
          ]
        },
        options: {
          ...base,
          scales: {
            x: { stacked: false, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } },
            y: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } }
          }
        }
      });
    }

    if (chart4Ref.current) {
      chart4Instance.current = new Chart(chart4Ref.current, {
        type: 'bar',
        data: {
          labels: ['1st class', '2nd class', '3rd class'],
          datasets: [
            { label: 'Female', data: [96.8, 92.1, 50.0], backgroundColor: G, borderRadius: 3, hoverBackgroundColor: G + 'dd' },
            { label: 'Male', data: [36.9, 15.7, 13.5], backgroundColor: R, borderRadius: 3, hoverBackgroundColor: R + 'dd' }
          ]
        },
        options: {
          ...base,
          scales: {
            x: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 11 } } },
            y: { max: 105, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, callback: v => v + '%' } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%` } } }
        }
      });
    }

    if (chart5Ref.current) {
      chart5Instance.current = new Chart(chart5Ref.current, {
        type: 'bar',
        data: {
          labels: ['Alone\n(n=537)', 'Small 2–4\n(n=292)', 'Large 5+\n(n=62)'],
          datasets: [{ data: [30.4, 57.8, 16.1], backgroundColor: [R + 'cc', G + 'cc', GR + 'cc'], borderRadius: 4, hoverBackgroundColor: [R, G, GR] }]
        },
        options: {
          ...base,
          scales: {
            x: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } },
            y: { max: 75, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, callback: v => v + '%' } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y.toFixed(1)}%` } } }
        }
      });
    }

    if (chart6Ref.current) {
      chart6Instance.current = new Chart(chart6Ref.current, {
        type: 'bar',
        data: {
          labels: ['Southampton\n(n=644)', 'Cherbourg\n(n=168)', 'Queenstown\n(n=77)'],
          datasets: [{ data: [33.7, 55.4, 39.0], backgroundColor: [GR + 'cc', P1 + 'cc', P2 + 'cc'], borderRadius: 4, hoverBackgroundColor: [GR, P1, P2] }]
        },
        options: {
          ...base,
          scales: {
            x: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } },
            y: { max: 72, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, callback: v => v + '%' } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y.toFixed(1)}%` } } }
        }
      });
    }

    if (chart7Ref.current) {
      chart7Instance.current = new Chart(chart7Ref.current, {
        type: 'bar',
        data: {
          labels: ['£0–10', '£11–25', '£26–50', '£51–100', '£100+'],
          datasets: [
            { label: 'Survived %', data: [18, 58, 82, 91, 93], backgroundColor: G + 'cc', borderRadius: 3, hoverBackgroundColor: G },
            { label: 'Perished %', data: [36, 72, 62, 40, 22], backgroundColor: R + 'cc', borderRadius: 3, hoverBackgroundColor: R }
          ]
        },
        options: {
          ...base,
          scales: {
            x: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, autoSkip: false } },
            y: { max: 105, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, callback: v => v + '%' } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` } } }
        }
      });
    }

    if (chart8Ref.current) {
      const orVals = [12.35, 0.964, 0.28, 0.10, 0.72, 2.18];
      chart8Instance.current = new Chart(chart8Ref.current, {
        type: 'bar',
        data: {
          labels: ['female sex', 'age (per yr)', '2nd class', '3rd class', 'family size', 'Cherbourg'],
          datasets: [{ 
            data: orVals, 
            backgroundColor: orVals.map(v => v > 1 ? G + 'cc' : R + 'cc'), 
            borderRadius: 3,
            hoverBackgroundColor: orVals.map(v => v > 1 ? G : R)
          }]
        },
        options: {
          ...base,
          indexAxis: 'y',
          scales: {
            x: {
              type: 'logarithmic', min: 0.05, max: 20,
              grid: { color: GRID },
              ticks: { color: TXT, font: { size: 10 }, callback: v => v >= 1 ? v : v.toFixed(2) }
            },
            y: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` OR = ${ctx.parsed.x.toFixed(3)}` } } }
        }
      });
    }

    return () => {
      [chart1Instance, chart2Instance, chart3Instance, chart4Instance,
       chart5Instance, chart6Instance, chart7Instance, chart8Instance]
        .forEach(ref => ref.current?.destroy());
    };
  }, []);

  const handleChartClick = (chartId) => {
    setSelectedChart(chartDetails[chartId]);
    setIsExpanded(true);
  };

  const closeOverlay = () => {
    setIsExpanded(false);
    setSelectedChart(null);
  };

  return (
    <>
      <div className="titanic-dashboard-wrapper">
        <div className="titanic-container">
          <h2 className="sr-only">
            Titanic survival analysis dashboard showing 8 charts: KPI strip, survival by sex donut,
            survival by class donut, age distribution by survival, survival rate by class and sex grouped bar,
            family size survival, embarkation port survival, and fare box comparison.
          </h2>

          {/* Header */}
          <div className="dashboard-header">
            <div>
              <span className="dashboard-title">Titanic survival analysis</span>
              <span className="dashboard-subtitle">RMS Titanic · April 1912 · N = 891 passengers</span>
            </div>
            <span className="dashboard-question">research question: are sex & age independently associated with survival?</span>
          </div>

          {/* KPI Cards */}
          <div className="kpi-grid">
            {[
              { label: 'total passengers', value: '891', color: 'white', detail: 'Total passengers included in analysis' },
              { label: 'survived', value: <>342 <span className="kpi-percentage">38.4%</span></>, color: '#1D9E75', detail: 'Overall survival rate of 38.4%' },
              { label: 'female survival', value: '74.2%', color: '#1D9E75', detail: 'Female survival rate was significantly higher' },
              { label: 'male survival', value: '18.9%', color: '#D85A30', detail: 'Male survival rate was dramatically lower' },
              { label: 'missing age', value: <>177 <span className="kpi-percentage">19.9%</span></>, color: '#BA7517', detail: 'Age was missing for 19.9% of passengers' },
            ].map(({ label, value, color, detail }, idx) => (
              <div 
                className={`kpi-card ${hoveredKPI === idx ? 'hovered' : ''}`} 
                key={label}
                onMouseEnter={() => setHoveredKPI(idx)}
                onMouseLeave={() => setHoveredKPI(null)}
              >
                <div className="kpi-label">{label}</div>
                <div className="kpi-value" style={{ color }}>{value}</div>
                {hoveredKPI === idx && <div className="kpi-tooltip">{detail}</div>}
              </div>
            ))}
          </div>

          {/* Row 1 */}
          <div className="charts-row-1">
            {[
              { id: 'c1', title: 'Survival by sex', subtitle: 'χ² = 260.7 · p < 0.001 · H1', legend: [['#1D9E75','female 74.2%'],['#D85A30','male 18.9%']], ref: chart1Ref },
              { id: 'c2', title: 'Survival by class', subtitle: 'χ² = 102.9 · p < 0.001 · SES', legend: [['#185FA5','1st 63.0%'],['#378ADD','2nd 47.3%'],['#85B7EB','3rd 24.2%']], ref: chart2Ref },
              { id: 'c3', title: 'Age distribution by survival', subtitle: 't-test: t = −2.07 · p = 0.039 · H2 supported', legend: [['#1D9E75','survived (mean 28.3 yrs)'],['#D85A30','perished (mean 30.6 yrs)']], ref: chart3Ref },
            ].map(({ id, title, subtitle, legend, ref }) => (
              <div 
                className={`chart-card ${hoveredChart === id ? 'hovered' : ''}`} 
                key={id} 
                onClick={() => handleChartClick(id)}
                onMouseEnter={() => setHoveredChart(id)}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="chart-title">{title}</div>
                <div className="chart-subtitle">{subtitle}</div>
                <div className="chart-legend">
                  {legend.map(([color, label]) => (
                    <span className="legend-item" key={label}>
                      <span className="legend-color" style={{ background: color }} />
                      {label}
                    </span>
                  ))}
                </div>
                <div className="chart-container"><canvas ref={ref} role="img" /></div>
                {hoveredChart === id && <div className="chart-hint">Click for detailed analysis</div>}
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="charts-row-2">
            {[
              { id: 'c4', title: 'Sex × class interaction — survival rate (%)', subtitle: 'H3: protocol attenuated in 3rd class · female drop 96.8% → 50.0%', legend: [['#1D9E75','female'],['#D85A30','male']], ref: chart4Ref },
              { id: 'c5', title: 'Family composition', subtitle: 'H5: inverted-U · small family best', legend: [['#D85A30','alone'],['#1D9E75','small'],['#888780','large']], ref: chart5Ref },
              { id: 'c6', title: 'Embarkation port', subtitle: 'Cherbourg advantage confounded by class', legend: [['#888780','S 33.7%'],['#534AB7','C 55.4%'],['#7F77DD','Q 39.0%']], ref: chart6Ref },
            ].map(({ id, title, subtitle, legend, ref }) => (
              <div 
                className={`chart-card ${hoveredChart === id ? 'hovered' : ''}`} 
                key={id} 
                onClick={() => handleChartClick(id)}
                onMouseEnter={() => setHoveredChart(id)}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="chart-title">{title}</div>
                <div className="chart-subtitle">{subtitle}</div>
                <div className="chart-legend">
                  {legend.map(([c,l]) => (
                    <span className="legend-item" key={l}><span className="legend-color" style={{ background: c }} />{l}</span>
                  ))}
                </div>
                <div className="chart-container"><canvas ref={ref} role="img" /></div>
                {hoveredChart === id && <div className="chart-hint">Click for detailed analysis</div>}
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="charts-row-3">
            {[
              { id: 'c7', title: 'Fare distribution by survival', subtitle: 'H4: survivors paid £48.40 avg vs £22.12 — 119% premium · log transform recommended', legend: [['#1D9E75','survived'],['#D85A30','perished']], ref: chart7Ref, small: true },
              { id: 'c8', title: 'Adjusted odds ratios — logistic regression', subtitle: 'sex effect dominates all predictors · both H1 & H2 survive full adjustment', legend: [], ref: chart8Ref, small: true },
            ].map(({ id, title, subtitle, legend, ref, small }) => (
              <div 
                className={`chart-card ${hoveredChart === id ? 'hovered' : ''}`} 
                key={id} 
                onClick={() => handleChartClick(id)}
                onMouseEnter={() => setHoveredChart(id)}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="chart-title">{title}</div>
                <div className="chart-subtitle">{subtitle}</div>
                {legend.length > 0 && (
                  <div className="chart-legend">
                    {legend.map(([c,l]) => (
                      <span className="legend-item" key={l}><span className="legend-color" style={{ background: c }} />{l}</span>
                    ))}
                  </div>
                )}
                <div className={small ? "chart-container-small" : "chart-container"}><canvas ref={ref} role="img" /></div>
                {hoveredChart === id && <div className="chart-hint">Click for detailed analysis</div>}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="dashboard-footer">
            <span>Dataset: Seaborn built-in Titanic · N = 891 · missing age = 177 (MAR) · cabin excluded (MNAR, 77.1%)</span>
          </div>
        </div>

        {/* Chart Detail Overlay */}
        {isExpanded && selectedChart && (
          <div className="chart-overlay" onClick={closeOverlay}>
            <div className="chart-overlay-content" onClick={e => e.stopPropagation()}>
              <button className="close-overlay" onClick={closeOverlay} aria-label="Close" />

              <h3 className="overlay-title">{selectedChart.title}</h3>
              <p className="overlay-description">{selectedChart.description}</p>
              <div className="overlay-stats">
                {Object.entries(selectedChart.stats).map(([key, value]) => (
                  <div key={key} className="stat-item">
                    <span className="stat-label">{key.replace('_', ' ').toUpperCase()}</span>
                    <span className="stat-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body, html, #__next, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .titanic-dashboard-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          overflow: auto;
          background: #0a0a0a;
          margin: 0;
          padding: 0;
        }

        .titanic-container {
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(33, 117, 34, 0.2);
          padding: 20px;
          margin: 0;
          width: 100%;
          height: auto;
          min-height: 100vh;
          box-sizing: border-box;
        }

        .sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border-width: 0;
        }

        /* ── Header ── */
        .dashboard-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 16px;
          border-bottom: 0.5px solid rgba(255,255,255,0.1);
          padding-bottom: 10px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .dashboard-title   { font-size: 18px; font-weight: 500; color: white; }
        .dashboard-subtitle { font-size: 13px; color: rgba(255,255,255,0.6); margin-left: 10px; }
        .dashboard-question { font-size: 12px; color: rgba(255,255,255,0.4); }

        /* ── KPI Grid with hover effects ── */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }
        .kpi-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          padding: 12px 14px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .kpi-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(29,158,117,0.3);
          border-color: rgba(29,158,117,0.4);
          background: rgba(29,158,117,0.08);
        }
        .kpi-card.hovered {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(29,158,117,0.4);
        }
        .kpi-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 4px; transition: color 0.2s ease; }
        .kpi-card:hover .kpi-label { color: rgba(255,255,255,0.9); }
        .kpi-value { font-size: 22px; font-weight: 500; transition: transform 0.2s ease; }
        .kpi-card:hover .kpi-value { transform: scale(1.05); }
        .kpi-percentage { font-size: 13px; font-weight: 400; }
        .kpi-tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.9);
          color: #1D9E75;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 6px;
          white-space: nowrap;
          z-index: 10;
          border: 1px solid rgba(29,158,117,0.3);
          pointer-events: none;
          animation: fadeInUp 0.2s ease;
        }

        /* ── Chart rows ── */
        .charts-row-1 { display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 12px; margin-bottom: 12px; }
        .charts-row-2 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .charts-row-3 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* ── Chart card with enhanced hover ── */
        .chart-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15);
        }
        .chart-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 28px 52px -12px rgba(0,0,0,0.6), 0 0 0 2px rgba(29,158,117,0.2);
          border-color: rgba(29,158,117,0.35);
          background: rgba(29,158,117,0.05);
        }
        .chart-card.hovered {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 28px 52px -12px rgba(0,0,0,0.6), 0 0 0 2px rgba(29,158,117,0.3);
        }
        .chart-card:hover .chart-title { color: #1D9E75; }
        .chart-card:hover .chart-subtitle { color: rgba(255,255,255,0.8); }

        .chart-title    { font-size: 13px; font-weight: 500; color: white; margin-bottom: 2px; transition: color 0.2s ease; }
        .chart-subtitle { font-size: 11px; color: rgba(255,255,255,0.6); margin-bottom: 8px; transition: color 0.2s ease; }
        .chart-legend   { display: flex; gap: 12px; margin-bottom: 6px; font-size: 11px; color: rgba(255,255,255,0.6); flex-wrap: wrap; }
        .legend-item    { display: flex; align-items: center; gap: 4px; transition: transform 0.2s ease; }
        .chart-card:hover .legend-item { transform: translateX(2px); }
        .legend-color   { width: 10px; height: 10px; border-radius: 2px; display: inline-block; flex-shrink: 0; transition: transform 0.2s ease; }
        .chart-card:hover .legend-color { transform: scale(1.2); }
        .chart-container       { position: relative; height: 160px; }
        .chart-container-small { position: relative; height: 150px; }
        .chart-hint {
          position: absolute;
          bottom: 8px;
          right: 12px;
          font-size: 10px;
          color: #1D9E75;
          background: rgba(0,0,0,0.6);
          padding: 2px 8px;
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        .chart-card:hover .chart-hint { opacity: 1; }

        /* ── Footer ── */
        .dashboard-footer {
          margin-top: 12px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* ── Overlay ── */
        .chart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.12);
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        .chart-overlay-content {
          background: rgba(10,10,10,0.96);
          border: 1px solid rgba(29,158,117,0.25);
          border-radius: 24px;
          padding: 36px 32px 32px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04) inset;
          animation: slideUp 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .close-overlay {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.55);
          font-size: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          padding: 0;
        }
        .close-overlay::before,
        .close-overlay::after {
          content: '';
          position: absolute;
          width: 11px;
          height: 1.5px;
          background: currentColor;
          border-radius: 2px;
        }
        .close-overlay::before { transform: rotate(45deg); }
        .close-overlay::after  { transform: rotate(-45deg); }
        .close-overlay:hover {
          background: rgba(232,72,85,0.15);
          border-color: rgba(232,72,85,0.45);
          color: #E84855;
          transform: rotate(90deg) scale(1.1);
        }

        .overlay-title {
          font-size: 22px;
          font-weight: 500;
          color: white;
          margin: 0 0 12px;
        }
        .overlay-description {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
          margin-bottom: 20px;
        }
        .overlay-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 0;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
        }
        .stat-item  { flex: 1; min-width: 120px; }
        .stat-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 4px;
        }
        .stat-value {
          display: block;
          font-size: 18px;
          font-weight: 500;
          color: #1D9E75;
        }

        /* ── Animations ── */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        canvas { width: 100% !important; height: auto !important; }

        /* ── Responsive ── */
        @media (max-width: 992px) {
          .charts-row-1,
          .charts-row-2,
          .charts-row-3 { grid-template-columns: 1fr !important; }
          .kpi-grid      { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .kpi-grid         { grid-template-columns: 1fr !important; }
          .dashboard-header { flex-direction: column; align-items: flex-start; }
          .titanic-container { padding: 16px; }
        }
      `}</style>
    </>
  );
};

=======
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import TiltedCard from './TiltedCard';

const TitanicDashboard = ({ onOpenCV }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [hoveredKPI, setHoveredKPI] = useState(null);
  const [hoveredChart, setHoveredChart] = useState(null);
  
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);
  const chart5Ref = useRef(null);
  const chart6Ref = useRef(null);
  const chart7Ref = useRef(null);
  const chart8Ref = useRef(null);
  
  let chart1Instance = useRef(null);
  let chart2Instance = useRef(null);
  let chart3Instance = useRef(null);
  let chart4Instance = useRef(null);
  let chart5Instance = useRef(null);
  let chart6Instance = useRef(null);
  let chart7Instance = useRef(null);
  let chart8Instance = useRef(null);

  const G = '#1D9E75';
  const R = '#D85A30';
  const B1 = '#185FA5';
  const B2 = '#378ADD';
  const B3 = '#85B7EB';
  const P1 = '#534AB7';
  const P2 = '#7F77DD';
  const GR = '#888780';
  const GRID = 'rgba(128,128,128,0.12)';
  const TXT = '#888780';

  const chartDetails = {
    c1: {
      title: "Survival by Sex",
      description: "Chi-square analysis showing significant survival disparity between genders (χ² = 260.7, p < 0.001). Female passengers had a 74.2% survival rate compared to 18.9% for males, supporting the 'women and children first' protocol.",
      stats: { chi2: "260.7", p_value: "< 0.001", insight: "Gender was the strongest predictor of survival" }
    },
    c2: {
      title: "Survival by Class",
      description: "Social class strongly influenced survival chances (χ² = 102.9, p < 0.001). First-class passengers had a 63.0% survival rate, while third-class only had 24.2%, highlighting socioeconomic disparities in the disaster.",
      stats: { chi2: "102.9", p_value: "< 0.001", insight: "Class disparity: 1st class 63% vs 3rd class 24.2%" }
    },
    c3: {
      title: "Age Distribution",
      description: "Younger passengers had slightly higher survival rates (t-test: t = -2.07, p = 0.039). Survivors averaged 28.3 years compared to 30.6 years for non-survivors, suggesting age played a role but was less significant than gender.",
      stats: { t_stat: "-2.07", p_value: "0.039", insight: "Survivors were ~2.3 years younger on average" }
    },
    c4: {
      title: "Sex × Class Interaction",
      description: "The gender advantage was most pronounced in 1st class (female survival 96.8% vs male 36.9%) but dropped significantly in 3rd class (50.0% vs 13.5%), suggesting class modified the 'women first' protocol's effectiveness.",
      stats: { interaction: "Significant", insight: "Female advantage dropped from 96.8% to 50.0% in 3rd class" }
    },
    c5: {
      title: "Family Composition Effect",
      description: "An inverted-U pattern emerged: passengers with small families (2-4 members) had the highest survival rate (57.8%), while those alone (30.4%) or with large families (16.1%) fared worse. Social support networks influenced survival.",
      stats: { pattern: "Inverted-U", insight: "Small families (2-4) had 57.8% survival rate" }
    },
    c6: {
      title: "Embarkation Port Analysis",
      description: "Passengers from Cherbourg had higher survival (55.4%) vs Southampton (33.7%), but this advantage is confounded by class - Cherbourg had more 1st class passengers. Port alone wasn't causally linked to survival.",
      stats: { cherbourg: "55.4%", southampton: "33.7%", insight: "Cherbourg advantage explained by class composition" }
    },
    c7: {
      title: "Fare Distribution",
      description: "Survivors paid significantly higher fares (£48.40 avg vs £22.12), a 119% premium. Higher fares (1st/2nd class) provided better access to lifeboats, though fare itself correlates strongly with class.",
      stats: { survivors: "£48.40", perished: "£22.12", insight: "119% fare premium for survivors" }
    },
    c8: {
      title: "Logistic Regression Results",
      description: "Multivariate analysis confirms gender dominates all predictors (OR = 12.35 for females). 3rd class had dramatically lower odds (OR = 0.10), while age (OR = 0.96) and family size (OR = 0.72) had smaller but significant effects.",
      stats: { female_or: "12.35", third_class_or: "0.10", insight: "Gender effect remains after adjusting for class, age, and family" }
    }
  };

  useEffect(() => {
    const base = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { display: false }, 
        tooltip: { 
          callbacks: {},
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#1D9E75',
          bodyColor: 'rgba(255,255,255,0.8)',
          borderColor: '#1D9E75',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8
        } 
      },
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      }
    };

    if (chart1Ref.current) {
      chart1Instance.current = new Chart(chart1Ref.current, {
        type: 'doughnut',
        data: {
          labels: ['Female survived', 'Female perished', 'Male survived', 'Male perished'],
          datasets: [{
            data: [233, 81, 109, 468],
            backgroundColor: [G, '#9FE1CB', R, '#F5C4B3'],
            borderWidth: 2, borderColor: 'transparent', hoverOffset: 12,
            hoverBorderWidth: 3, hoverBorderColor: 'white'
          }]
        },
        options: { ...base, cutout: '62%' }
      });
    }

    if (chart2Ref.current) {
      chart2Instance.current = new Chart(chart2Ref.current, {
        type: 'doughnut',
        data: {
          labels: ['1st survived', '1st perished', '2nd survived', '2nd perished', '3rd survived', '3rd perished'],
          datasets: [{
            data: [136, 80, 87, 97, 119, 372],
            backgroundColor: [B1, '#B5D4F4', B2, '#85B7EB', B3, '#E6F1FB'],
            borderWidth: 2, borderColor: 'transparent', hoverOffset: 12,
            hoverBorderWidth: 3, hoverBorderColor: 'white'
          }]
        },
        options: { ...base, cutout: '62%' }
      });
    }

    if (chart3Ref.current) {
      const ageBins = ['0–9', '10–19', '20–29', '30–39', '40–49', '50–59', '60–69', '70+'];
      chart3Instance.current = new Chart(chart3Ref.current, {
        type: 'bar',
        data: {
          labels: ageBins,
          datasets: [
            { label: 'Survived', data: [28, 45, 77, 62, 41, 25, 10, 2], backgroundColor: G + 'cc', barPercentage: 0.9, categoryPercentage: 0.9, hoverBackgroundColor: G },
            { label: 'Perished', data: [8, 22, 145, 128, 89, 24, 6, 2], backgroundColor: R + 'cc', barPercentage: 0.9, categoryPercentage: 0.9, hoverBackgroundColor: R }
          ]
        },
        options: {
          ...base,
          scales: {
            x: { stacked: false, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } },
            y: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } }
          }
        }
      });
    }

    if (chart4Ref.current) {
      chart4Instance.current = new Chart(chart4Ref.current, {
        type: 'bar',
        data: {
          labels: ['1st class', '2nd class', '3rd class'],
          datasets: [
            { label: 'Female', data: [96.8, 92.1, 50.0], backgroundColor: G, borderRadius: 3, hoverBackgroundColor: G + 'dd' },
            { label: 'Male', data: [36.9, 15.7, 13.5], backgroundColor: R, borderRadius: 3, hoverBackgroundColor: R + 'dd' }
          ]
        },
        options: {
          ...base,
          scales: {
            x: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 11 } } },
            y: { max: 105, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, callback: v => v + '%' } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%` } } }
        }
      });
    }

    if (chart5Ref.current) {
      chart5Instance.current = new Chart(chart5Ref.current, {
        type: 'bar',
        data: {
          labels: ['Alone\n(n=537)', 'Small 2–4\n(n=292)', 'Large 5+\n(n=62)'],
          datasets: [{ data: [30.4, 57.8, 16.1], backgroundColor: [R + 'cc', G + 'cc', GR + 'cc'], borderRadius: 4, hoverBackgroundColor: [R, G, GR] }]
        },
        options: {
          ...base,
          scales: {
            x: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } },
            y: { max: 75, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, callback: v => v + '%' } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y.toFixed(1)}%` } } }
        }
      });
    }

    if (chart6Ref.current) {
      chart6Instance.current = new Chart(chart6Ref.current, {
        type: 'bar',
        data: {
          labels: ['Southampton\n(n=644)', 'Cherbourg\n(n=168)', 'Queenstown\n(n=77)'],
          datasets: [{ data: [33.7, 55.4, 39.0], backgroundColor: [GR + 'cc', P1 + 'cc', P2 + 'cc'], borderRadius: 4, hoverBackgroundColor: [GR, P1, P2] }]
        },
        options: {
          ...base,
          scales: {
            x: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } },
            y: { max: 72, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, callback: v => v + '%' } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y.toFixed(1)}%` } } }
        }
      });
    }

    if (chart7Ref.current) {
      chart7Instance.current = new Chart(chart7Ref.current, {
        type: 'bar',
        data: {
          labels: ['£0–10', '£11–25', '£26–50', '£51–100', '£100+'],
          datasets: [
            { label: 'Survived %', data: [18, 58, 82, 91, 93], backgroundColor: G + 'cc', borderRadius: 3, hoverBackgroundColor: G },
            { label: 'Perished %', data: [36, 72, 62, 40, 22], backgroundColor: R + 'cc', borderRadius: 3, hoverBackgroundColor: R }
          ]
        },
        options: {
          ...base,
          scales: {
            x: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, autoSkip: false } },
            y: { max: 105, grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 }, callback: v => v + '%' } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` } } }
        }
      });
    }

    if (chart8Ref.current) {
      const orVals = [12.35, 0.964, 0.28, 0.10, 0.72, 2.18];
      chart8Instance.current = new Chart(chart8Ref.current, {
        type: 'bar',
        data: {
          labels: ['female sex', 'age (per yr)', '2nd class', '3rd class', 'family size', 'Cherbourg'],
          datasets: [{ 
            data: orVals, 
            backgroundColor: orVals.map(v => v > 1 ? G + 'cc' : R + 'cc'), 
            borderRadius: 3,
            hoverBackgroundColor: orVals.map(v => v > 1 ? G : R)
          }]
        },
        options: {
          ...base,
          indexAxis: 'y',
          scales: {
            x: {
              type: 'logarithmic', min: 0.05, max: 20,
              grid: { color: GRID },
              ticks: { color: TXT, font: { size: 10 }, callback: v => v >= 1 ? v : v.toFixed(2) }
            },
            y: { grid: { color: GRID }, ticks: { color: TXT, font: { size: 10 } } }
          },
          plugins: { tooltip: { callbacks: { label: ctx => ` OR = ${ctx.parsed.x.toFixed(3)}` } } }
        }
      });
    }

    return () => {
      [chart1Instance, chart2Instance, chart3Instance, chart4Instance,
       chart5Instance, chart6Instance, chart7Instance, chart8Instance]
        .forEach(ref => ref.current?.destroy());
    };
  }, []);

  const handleChartClick = (chartId) => {
    setSelectedChart(chartDetails[chartId]);
    setIsExpanded(true);
  };

  const closeOverlay = () => {
    setIsExpanded(false);
    setSelectedChart(null);
  };

  return (
    <>
      <div className="titanic-dashboard-wrapper">
        <div className="titanic-container">
          <h2 className="sr-only">
            Titanic survival analysis dashboard showing 8 charts: KPI strip, survival by sex donut,
            survival by class donut, age distribution by survival, survival rate by class and sex grouped bar,
            family size survival, embarkation port survival, and fare box comparison.
          </h2>

          {/* Header */}
          <div className="dashboard-header">
            <div>
              <span className="dashboard-title">Titanic survival analysis</span>
              <span className="dashboard-subtitle">RMS Titanic · April 1912 · N = 891 passengers</span>
            </div>
            <span className="dashboard-question">research question: are sex & age independently associated with survival?</span>
          </div>

          {/* KPI Cards */}
          <div className="kpi-grid">
            {[
              { label: 'total passengers', value: '891', color: 'white', detail: 'Total passengers included in analysis' },
              { label: 'survived', value: <>342 <span className="kpi-percentage">38.4%</span></>, color: '#1D9E75', detail: 'Overall survival rate of 38.4%' },
              { label: 'female survival', value: '74.2%', color: '#1D9E75', detail: 'Female survival rate was significantly higher' },
              { label: 'male survival', value: '18.9%', color: '#D85A30', detail: 'Male survival rate was dramatically lower' },
              { label: 'missing age', value: <>177 <span className="kpi-percentage">19.9%</span></>, color: '#BA7517', detail: 'Age was missing for 19.9% of passengers' },
            ].map(({ label, value, color, detail }, idx) => (
              <div 
                className={`kpi-card ${hoveredKPI === idx ? 'hovered' : ''}`} 
                key={label}
                onMouseEnter={() => setHoveredKPI(idx)}
                onMouseLeave={() => setHoveredKPI(null)}
              >
                <div className="kpi-label">{label}</div>
                <div className="kpi-value" style={{ color }}>{value}</div>
                {hoveredKPI === idx && <div className="kpi-tooltip">{detail}</div>}
              </div>
            ))}
          </div>

          {/* Row 1 */}
          <div className="charts-row-1">
            {[
              { id: 'c1', title: 'Survival by sex', subtitle: 'χ² = 260.7 · p < 0.001 · H1', legend: [['#1D9E75','female 74.2%'],['#D85A30','male 18.9%']], ref: chart1Ref },
              { id: 'c2', title: 'Survival by class', subtitle: 'χ² = 102.9 · p < 0.001 · SES', legend: [['#185FA5','1st 63.0%'],['#378ADD','2nd 47.3%'],['#85B7EB','3rd 24.2%']], ref: chart2Ref },
              { id: 'c3', title: 'Age distribution by survival', subtitle: 't-test: t = −2.07 · p = 0.039 · H2 supported', legend: [['#1D9E75','survived (mean 28.3 yrs)'],['#D85A30','perished (mean 30.6 yrs)']], ref: chart3Ref },
            ].map(({ id, title, subtitle, legend, ref }) => (
              <div 
                className={`chart-card ${hoveredChart === id ? 'hovered' : ''}`} 
                key={id} 
                onClick={() => handleChartClick(id)}
                onMouseEnter={() => setHoveredChart(id)}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="chart-title">{title}</div>
                <div className="chart-subtitle">{subtitle}</div>
                <div className="chart-legend">
                  {legend.map(([color, label]) => (
                    <span className="legend-item" key={label}>
                      <span className="legend-color" style={{ background: color }} />
                      {label}
                    </span>
                  ))}
                </div>
                <div className="chart-container"><canvas ref={ref} role="img" /></div>
                {hoveredChart === id && <div className="chart-hint">Click for detailed analysis</div>}
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="charts-row-2">
            {[
              { id: 'c4', title: 'Sex × class interaction — survival rate (%)', subtitle: 'H3: protocol attenuated in 3rd class · female drop 96.8% → 50.0%', legend: [['#1D9E75','female'],['#D85A30','male']], ref: chart4Ref },
              { id: 'c5', title: 'Family composition', subtitle: 'H5: inverted-U · small family best', legend: [['#D85A30','alone'],['#1D9E75','small'],['#888780','large']], ref: chart5Ref },
              { id: 'c6', title: 'Embarkation port', subtitle: 'Cherbourg advantage confounded by class', legend: [['#888780','S 33.7%'],['#534AB7','C 55.4%'],['#7F77DD','Q 39.0%']], ref: chart6Ref },
            ].map(({ id, title, subtitle, legend, ref }) => (
              <div 
                className={`chart-card ${hoveredChart === id ? 'hovered' : ''}`} 
                key={id} 
                onClick={() => handleChartClick(id)}
                onMouseEnter={() => setHoveredChart(id)}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="chart-title">{title}</div>
                <div className="chart-subtitle">{subtitle}</div>
                <div className="chart-legend">
                  {legend.map(([c,l]) => (
                    <span className="legend-item" key={l}><span className="legend-color" style={{ background: c }} />{l}</span>
                  ))}
                </div>
                <div className="chart-container"><canvas ref={ref} role="img" /></div>
                {hoveredChart === id && <div className="chart-hint">Click for detailed analysis</div>}
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="charts-row-3">
            {[
              { id: 'c7', title: 'Fare distribution by survival', subtitle: 'H4: survivors paid £48.40 avg vs £22.12 — 119% premium · log transform recommended', legend: [['#1D9E75','survived'],['#D85A30','perished']], ref: chart7Ref, small: true },
              { id: 'c8', title: 'Adjusted odds ratios — logistic regression', subtitle: 'sex effect dominates all predictors · both H1 & H2 survive full adjustment', legend: [], ref: chart8Ref, small: true },
            ].map(({ id, title, subtitle, legend, ref, small }) => (
              <div 
                className={`chart-card ${hoveredChart === id ? 'hovered' : ''}`} 
                key={id} 
                onClick={() => handleChartClick(id)}
                onMouseEnter={() => setHoveredChart(id)}
                onMouseLeave={() => setHoveredChart(null)}
              >
                <div className="chart-title">{title}</div>
                <div className="chart-subtitle">{subtitle}</div>
                {legend.length > 0 && (
                  <div className="chart-legend">
                    {legend.map(([c,l]) => (
                      <span className="legend-item" key={l}><span className="legend-color" style={{ background: c }} />{l}</span>
                    ))}
                  </div>
                )}
                <div className={small ? "chart-container-small" : "chart-container"}><canvas ref={ref} role="img" /></div>
                {hoveredChart === id && <div className="chart-hint">Click for detailed analysis</div>}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="dashboard-footer">
            <span>Dataset: Seaborn built-in Titanic · N = 891 · missing age = 177 (MAR) · cabin excluded (MNAR, 77.1%)</span>
          </div>
        </div>

        {/* Chart Detail Overlay */}
        {isExpanded && selectedChart && (
          <div className="chart-overlay" onClick={closeOverlay}>
            <div className="chart-overlay-content" onClick={e => e.stopPropagation()}>
              <button className="close-overlay" onClick={closeOverlay} aria-label="Close" />

              <h3 className="overlay-title">{selectedChart.title}</h3>
              <p className="overlay-description">{selectedChart.description}</p>
              <div className="overlay-stats">
                {Object.entries(selectedChart.stats).map(([key, value]) => (
                  <div key={key} className="stat-item">
                    <span className="stat-label">{key.replace('_', ' ').toUpperCase()}</span>
                    <span className="stat-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body, html, #__next, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .titanic-dashboard-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          overflow: auto;
          background: #0a0a0a;
          margin: 0;
          padding: 0;
        }

        .titanic-container {
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(33, 117, 34, 0.2);
          padding: 20px;
          margin: 0;
          width: 100%;
          height: auto;
          min-height: 100vh;
          box-sizing: border-box;
        }

        .sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border-width: 0;
        }

        /* ── Header ── */
        .dashboard-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 16px;
          border-bottom: 0.5px solid rgba(255,255,255,0.1);
          padding-bottom: 10px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .dashboard-title   { font-size: 18px; font-weight: 500; color: white; }
        .dashboard-subtitle { font-size: 13px; color: rgba(255,255,255,0.6); margin-left: 10px; }
        .dashboard-question { font-size: 12px; color: rgba(255,255,255,0.4); }

        /* ── KPI Grid with hover effects ── */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }
        .kpi-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          padding: 12px 14px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .kpi-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(29,158,117,0.3);
          border-color: rgba(29,158,117,0.4);
          background: rgba(29,158,117,0.08);
        }
        .kpi-card.hovered {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(29,158,117,0.4);
        }
        .kpi-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 4px; transition: color 0.2s ease; }
        .kpi-card:hover .kpi-label { color: rgba(255,255,255,0.9); }
        .kpi-value { font-size: 22px; font-weight: 500; transition: transform 0.2s ease; }
        .kpi-card:hover .kpi-value { transform: scale(1.05); }
        .kpi-percentage { font-size: 13px; font-weight: 400; }
        .kpi-tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.9);
          color: #1D9E75;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 6px;
          white-space: nowrap;
          z-index: 10;
          border: 1px solid rgba(29,158,117,0.3);
          pointer-events: none;
          animation: fadeInUp 0.2s ease;
        }

        /* ── Chart rows ── */
        .charts-row-1 { display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 12px; margin-bottom: 12px; }
        .charts-row-2 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .charts-row-3 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* ── Chart card with enhanced hover ── */
        .chart-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15);
        }
        .chart-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 28px 52px -12px rgba(0,0,0,0.6), 0 0 0 2px rgba(29,158,117,0.2);
          border-color: rgba(29,158,117,0.35);
          background: rgba(29,158,117,0.05);
        }
        .chart-card.hovered {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 28px 52px -12px rgba(0,0,0,0.6), 0 0 0 2px rgba(29,158,117,0.3);
        }
        .chart-card:hover .chart-title { color: #1D9E75; }
        .chart-card:hover .chart-subtitle { color: rgba(255,255,255,0.8); }

        .chart-title    { font-size: 13px; font-weight: 500; color: white; margin-bottom: 2px; transition: color 0.2s ease; }
        .chart-subtitle { font-size: 11px; color: rgba(255,255,255,0.6); margin-bottom: 8px; transition: color 0.2s ease; }
        .chart-legend   { display: flex; gap: 12px; margin-bottom: 6px; font-size: 11px; color: rgba(255,255,255,0.6); flex-wrap: wrap; }
        .legend-item    { display: flex; align-items: center; gap: 4px; transition: transform 0.2s ease; }
        .chart-card:hover .legend-item { transform: translateX(2px); }
        .legend-color   { width: 10px; height: 10px; border-radius: 2px; display: inline-block; flex-shrink: 0; transition: transform 0.2s ease; }
        .chart-card:hover .legend-color { transform: scale(1.2); }
        .chart-container       { position: relative; height: 160px; }
        .chart-container-small { position: relative; height: 150px; }
        .chart-hint {
          position: absolute;
          bottom: 8px;
          right: 12px;
          font-size: 10px;
          color: #1D9E75;
          background: rgba(0,0,0,0.6);
          padding: 2px 8px;
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        .chart-card:hover .chart-hint { opacity: 1; }

        /* ── Footer ── */
        .dashboard-footer {
          margin-top: 12px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* ── Overlay ── */
        .chart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.12);
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        .chart-overlay-content {
          background: rgba(10,10,10,0.96);
          border: 1px solid rgba(29,158,117,0.25);
          border-radius: 24px;
          padding: 36px 32px 32px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04) inset;
          animation: slideUp 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .close-overlay {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.55);
          font-size: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          padding: 0;
        }
        .close-overlay::before,
        .close-overlay::after {
          content: '';
          position: absolute;
          width: 11px;
          height: 1.5px;
          background: currentColor;
          border-radius: 2px;
        }
        .close-overlay::before { transform: rotate(45deg); }
        .close-overlay::after  { transform: rotate(-45deg); }
        .close-overlay:hover {
          background: rgba(232,72,85,0.15);
          border-color: rgba(232,72,85,0.45);
          color: #E84855;
          transform: rotate(90deg) scale(1.1);
        }

        .overlay-title {
          font-size: 22px;
          font-weight: 500;
          color: white;
          margin: 0 0 12px;
        }
        .overlay-description {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
          margin-bottom: 20px;
        }
        .overlay-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 0;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
        }
        .stat-item  { flex: 1; min-width: 120px; }
        .stat-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 4px;
        }
        .stat-value {
          display: block;
          font-size: 18px;
          font-weight: 500;
          color: #1D9E75;
        }

        /* ── Animations ── */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        canvas { width: 100% !important; height: auto !important; }

        /* ── Responsive ── */
        @media (max-width: 992px) {
          .charts-row-1,
          .charts-row-2,
          .charts-row-3 { grid-template-columns: 1fr !important; }
          .kpi-grid      { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .kpi-grid         { grid-template-columns: 1fr !important; }
          .dashboard-header { flex-direction: column; align-items: flex-start; }
          .titanic-container { padding: 16px; }
        }
      `}</style>
    </>
  );
};

>>>>>>> 12e07bc573124e378ab29574986787b29ee87cc9
export default TitanicDashboard;