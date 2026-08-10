import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import AlitaFlowPhoneShowcase from './AlitaFlowPhoneShowcase';

const GREEN = '#00ff88';
const AMBER = '#fbbf24';
const RED = '#ef4444';
const GRID = 'rgba(128,128,128,0.12)';
const TXT = '#888780';

const INVENTORY = [
  { name: 'Flexible Basin (½")', stock: 27 },
  { name: 'Magic Connector (1¼")', stock: 24 },
  { name: 'Silicon Haluken', stock: 20 },
  { name: 'Thread Tube Small', stock: 20 },
  { name: 'Thread Tube Big', stock: 18 },
  { name: 'Flexible Long', stock: 16 },
  { name: 'Basin Tap Star', stock: 10 },
  { name: 'Brass Hinge', stock: 10 },
  { name: 'Bottle Trap Viega (1½")', stock: 9 },
  { name: 'Tissue Holder (Phone)', stock: 9 },
  { name: 'Toothbrush Holder Square (O)', stock: 2 },
  { name: 'Lorenzetti', stock: 1 },
  { name: 'Horizon', stock: 1 },
  { name: 'Angle Valve Double', stock: 0 },
];

const TOTAL_ITEMS = 48;
const TOTAL_STOCK = 382;
const OUT_OF_STOCK = INVENTORY.filter(i => i.stock === 0).length;
const LOW_STOCK = INVENTORY.filter(i => i.stock > 0 && i.stock <= 3).length;

function stockColor(stock) {
  if (stock === 0) return RED;
  if (stock <= 3) return AMBER;
  return GREEN;
}

export default function AlitaFlowShowcase() {
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredItem, setHoveredItem] = useState(null);

  const donutRef = useRef(null);
  const donutInst = useRef(null);

  useEffect(() => {
    if (activeTab !== 'overview' || !donutRef.current) return;
    const timer = setTimeout(() => {
      donutInst.current?.destroy();
      donutInst.current = new Chart(donutRef.current, {
        type: 'doughnut',
        data: {
          labels: ['In Stock', 'Low Stock (≤3)', 'Out of Stock'],
          datasets: [{
            data: [TOTAL_ITEMS - LOW_STOCK - OUT_OF_STOCK, LOW_STOCK, OUT_OF_STOCK],
            backgroundColor: [GREEN + 'cc', AMBER + 'cc', RED + 'cc'],
            hoverBackgroundColor: [GREEN, AMBER, RED],
            borderWidth: 2,
            borderColor: 'transparent',
            hoverOffset: 10,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.85)',
              titleColor: GREEN,
              bodyColor: 'rgba(255,255,255,0.8)',
              borderColor: GREEN,
              borderWidth: 1,
              callbacks: { label: ctx => ` ${ctx.parsed} items` },
            },
          },
        },
      });
    }, 50);
    return () => {
      clearTimeout(timer);
      donutInst.current?.destroy();
    };
  }, [activeTab]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: 'white', background: '#080808', minHeight: '100vh', padding: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, borderBottom: '0.5px solid rgba(255,255,255,0.1)', paddingBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #0a0c0e, #0d0f12)', border: `1px solid ${GREEN}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💧</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>Alita Flow</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Victory · 2026 · React + PWA</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['overview', 'inventory', 'app'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11,
                fontWeight: 500, textTransform: 'capitalize', letterSpacing: '0.05em',
                background: activeTab === tab ? GREEN : 'rgba(255,255,255,0.06)',
                color: activeTab === tab ? '#000' : 'rgba(255,255,255,0.75)',
                transition: 'all 0.2s',
              }}
            >
              {tab === 'app' ? '📱 The App' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
            {[
              { label: 'Items Tracked', value: TOTAL_ITEMS.toString(), sub: 'in the catalog', color: GREEN },
              { label: 'Units in Stock', value: TOTAL_STOCK.toString(), sub: 'across all items', color: '#3B82F6' },
              { label: 'Low Stock', value: LOW_STOCK.toString(), sub: '≤ 3 units left', color: AMBER },
              { label: 'Out of Stock', value: OUT_OF_STOCK.toString(), sub: 'needs restocking', color: RED },
            ].map(kpi => (
              <div key={kpi.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${GREEN}66`; e.currentTarget.style.background = `${GREEN}0f`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>{kpi.label}</div>
                <div style={{ fontSize: 22, fontWeight: 600, color: kpi.color }}>{kpi.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 12, marginBottom: 14 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Stock Health</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>{TOTAL_ITEMS} items tracked</div>
              <div style={{ position: 'relative', height: 180 }}>
                <canvas ref={donutRef} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: GREEN }}>{TOTAL_ITEMS - LOW_STOCK - OUT_OF_STOCK}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>healthy</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', marginTop: 12 }}>
                {[['In Stock', GREEN], ['Low', AMBER], ['Out', RED]].map(([label, color]) => (
                  <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>How Offline Sync Works</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 14 }}>Selling with no signal still works</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['📴', 'Device goes offline mid-sale'],
                  ['💾', 'Sale recorded locally with its real timestamp'],
                  ['📶', 'Connection returns — app notices automatically'],
                  ['✅', 'Queued sales replay in order to the live Google Sheet'],
                ].map(([icon, text], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(0,255,136,0.08)', border: `1px solid ${GREEN}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{icon}</div>
                    <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.8)' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── INVENTORY TAB ── */}
      {activeTab === 'inventory' && (
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Live Stock · Synced from Google Sheets
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {INVENTORY.map((item, i) => {
              const hovered = hoveredItem === i;
              const color = stockColor(item.stock);
              const pct = Math.min((item.stock / 30) * 100, 100);
              return (
                <div key={item.name}
                  onMouseEnter={() => setHoveredItem(i)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    background: hovered ? `${GREEN}11` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${hovered ? `${GREEN}55` : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 12, padding: '10px 16px', cursor: 'default', transition: 'all 0.2s',
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: 'white' }}>{item.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color }}>
                      {item.stock === 0 ? 'OUT' : `${item.stock} in stock`}
                    </span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: color, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── PHONE MOCKUP TAB ── */}
      {activeTab === 'app' && <AlitaFlowPhoneShowcase />}

      <style>{`
        @media (max-width: 640px) {
          div[style*='gridTemplateColumns: repeat(4'] { grid-template-columns: repeat(2, 1fr) !important; }
          div[style*='gridTemplateColumns: 1fr 1.8fr'] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
