import React, { useEffect, useRef, useState } from 'react';

/*
 * Phone mockup of Alita Flow — a real screenshot-accurate recreation of the
 * two screens (catalog, item detail) plus the offline-queue behaviour that's
 * the actual standout feature of the app: sell something with no signal, it
 * queues locally with the real timestamp, then auto-syncs the moment the
 * device reconnects.
 */
const C = {
  bg: '#0a0c0e',
  panel: '#0d0f12',
  green: '#00ff88',
  greenDark: '#00cc66',
  border: 'rgba(0,255,136,0.3)',
  muted: '#9ca3af',
};

const ITEMS = [
  { name: 'Angle Valve Double', stock: 27 },
  { name: 'Basin Tap Star', stock: 10 },
  { name: 'Bottle Trap Viega (1½")', stock: 9 },
  { name: 'Magic Connector (1¼")', stock: 24 },
  { name: 'Silicon Haluken', stock: 20 },
  { name: 'Thread Tube Small', stock: 20 },
];

const SCREENS = [
  { id: 'catalog', label: 'Catalog', caption: 'The full inventory with live stock counts, an install-to-home-screen prompt, and a scroll-aware search bar.' },
  { id: 'detail', label: 'Item Detail', caption: 'Pick a quantity and unit, then record a sale — stock updates immediately, synced live to the Google Sheet.' },
  { id: 'offline', label: 'Goes Offline', caption: 'No signal? The sale still goes through — recorded locally with the exact moment it happened, and queued for later.' },
  { id: 'synced', label: 'Auto-Synced', caption: 'The instant the device reconnects, queued actions replay in order and hit the real spreadsheet — no action needed.' },
];

function StatusBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 18px 2px', fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 9 }}>
        <span>▮▮▮</span><span>◗</span><span style={{ fontSize: 10 }}>86%</span>
      </span>
    </div>
  );
}

function CatalogScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '10px 14px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'cursive', fontSize: 20, fontWeight: 800, color: C.green, textShadow: `0 0 8px ${C.green}` }}>
          Alita Flow<span style={{ color: '#c084fc' }}>.</span>
        </span>
        <span style={{ fontSize: 8, color: C.green, border: `1px solid ${C.border}`, borderRadius: 20, padding: '3px 8px' }}>+ Stock</span>
      </div>

      <div style={{ padding: '10px 14px' }}>
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 20, padding: '8px 12px', fontSize: 10, color: C.muted }}>
          🔍 Angle Valve Double
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '0 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {ITEMS.map(item => (
            <div key={item.name}>
              <div style={{ background: '#fff', borderRadius: 18, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                🔧
              </div>
              <div style={{ fontSize: 8, color: '#e5e7eb', marginTop: 5, textAlign: 'center', lineHeight: 1.2 }}>{item.name}</div>
              <div style={{ fontSize: 8, color: C.green, textAlign: 'center' }}>{item.stock} in stock</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailScreen({ qty }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, padding: '0 16px' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
        <span style={{ fontSize: 14, color: C.muted }}>←</span>
        <span style={{ fontFamily: 'cursive', fontSize: 17, fontWeight: 800, color: C.green }}>Alita Flow<span style={{ color: '#c084fc' }}>.</span></span>
      </div>

      <div style={{ background: '#fff', borderRadius: 24, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginTop: 16 }}>
        🔧
      </div>
      <div style={{ fontSize: 13, color: '#f3f4f6', textAlign: 'center', marginTop: 14 }}>Angle Valve Double</div>
      <div style={{ fontSize: 10, color: C.green, textAlign: 'center', marginTop: 3 }}>27 in stock</div>

      <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'center' }}>
        <div style={{ width: 46, background: '#d9d9d9', color: '#000', borderRadius: 20, textAlign: 'center', fontSize: 11, padding: '7px 0', fontWeight: 600 }}>{qty}</div>
        <div style={{ width: 66, background: '#d9d9d9', color: '#000', borderRadius: 20, textAlign: 'center', fontSize: 10, padding: '7px 0' }}>Pieces</div>
      </div>

      <div style={{ marginTop: 18, background: C.greenDark, color: '#fff', borderRadius: 24, textAlign: 'center', padding: '10px 0', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em' }}>
        SOLD
      </div>
    </div>
  );
}

function OfflineScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, padding: '0 16px' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
        <span style={{ fontSize: 14, color: C.muted }}>←</span>
        <span style={{ fontFamily: 'cursive', fontSize: 17, fontWeight: 800, color: C.green }}>Alita Flow<span style={{ color: '#c084fc' }}>.</span></span>
      </div>

      <div style={{
        marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, width: 'fit-content',
        background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)',
        color: '#fbbf24', borderRadius: 20, padding: '5px 10px', fontSize: 9, fontWeight: 600,
      }}>
        📡 Offline · 1 change pending
      </div>

      <div style={{ background: '#fff', borderRadius: 24, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginTop: 14 }}>
        🔧
      </div>
      <div style={{ fontSize: 13, color: '#f3f4f6', textAlign: 'center', marginTop: 14 }}>Angle Valve Double</div>
      <div style={{ fontSize: 10, color: C.green, textAlign: 'center', marginTop: 3 }}>25 in stock</div>

      <div style={{ marginTop: 16, fontSize: 9, color: '#f3f4f6', textAlign: 'center', background: 'rgba(0,255,136,0.06)', border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 12px', lineHeight: 1.5 }}>
        Sold 2 Pieces — offline, will sync when back online.
      </div>
    </div>
  );
}

function SyncedScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, padding: '0 16px' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
        <span style={{ fontSize: 14, color: C.muted }}>←</span>
        <span style={{ fontFamily: 'cursive', fontSize: 17, fontWeight: 800, color: C.green }}>Alita Flow<span style={{ color: '#c084fc' }}>.</span></span>
      </div>

      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 30 }}>✅</div>
        <div style={{ fontSize: 12, color: '#f3f4f6', marginTop: 10, fontWeight: 600 }}>Synced to the sheet</div>
        <div style={{ fontSize: 9, color: C.muted, marginTop: 6, lineHeight: 1.5, padding: '0 14px' }}>
          2 Pieces of Angle Valve Double recorded, timestamped to the exact
          moment the sale happened — not when it reconnected.
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 24, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginTop: 22 }}>
        🔧
      </div>
      <div style={{ fontSize: 10, color: C.green, textAlign: 'center', marginTop: 10 }}>25 in stock</div>
    </div>
  );
}

export default function AlitaFlowPhoneShowcase() {
  const [screen, setScreen] = useState('catalog');
  const [auto, setAuto] = useState(true);
  const [qty, setQty] = useState(1);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (screen === 'detail') {
      setQty(1);
      timers.current.push(setTimeout(() => setQty(2), 1200));
    }
    return () => timers.current.forEach(clearTimeout);
  }, [screen]);

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => {
      const i = SCREENS.findIndex(s => s.id === screen);
      setScreen(SCREENS[(i + 1) % SCREENS.length].id);
    }, 4200);
    return () => clearTimeout(t);
  }, [screen, auto]);

  const active = SCREENS.find(s => s.id === screen);
  const pick = id => { setAuto(false); setScreen(id); };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 26 }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>On Device</div>
        <div style={{ fontSize: 22, fontWeight: 600 }}>The App Itself</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>Installable PWA · Service worker · Offline action queue</div>
      </div>

      <div className="alita-phone-layout" style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 272, padding: 9, borderRadius: 40,
            background: 'linear-gradient(155deg,#3a3a40 0%,#17171b 40%,#0d0d10 100%)',
            boxShadow: '0 36px 70px -18px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07) inset',
          }}>
            <div style={{ position: 'relative', height: 552, borderRadius: 32, overflow: 'hidden', background: C.bg }}>
              <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, borderRadius: '50%', background: '#000', zIndex: 5 }} />
              <div key={screen} style={{ height: '100%', animation: 'alitaScreenIn 0.4s ease' }}>
                {screen === 'catalog' && <CatalogScreen />}
                {screen === 'detail' && <DetailScreen qty={qty} />}
                {screen === 'offline' && <OfflineScreen />}
                {screen === 'synced' && <SyncedScreen />}
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 240, maxWidth: 360 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {SCREENS.map((s, i) => {
              const on = s.id === screen;
              return (
                <button
                  key={s.id}
                  onClick={() => pick(s.id)}
                  style={{
                    textAlign: 'left', cursor: 'pointer', borderRadius: 12, padding: '11px 14px',
                    background: on ? 'rgba(0,255,136,0.09)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${on ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    color: 'white', transition: 'all 0.25s',
                    display: 'flex', alignItems: 'center', gap: 11,
                  }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0, fontSize: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: on ? C.green : 'rgba(255,255,255,0.07)',
                    color: on ? '#000' : 'rgba(255,255,255,0.45)',
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 12, fontWeight: on ? 600 : 400 }}>{s.label}</span>
                  {on && <span style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: C.green, animation: 'alitaPulse 1.2s infinite' }} />}
                </button>
              );
            })}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 14, minHeight: 96 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 }}>{active.label}</div>
            <div style={{ fontSize: 12, lineHeight: 1.65, color: 'rgba(255,255,255,0.8)' }}>{active.caption}</div>
          </div>

          {!auto && (
            <button
              onClick={() => { setAuto(true); setScreen('catalog'); }}
              style={{ marginTop: 14, padding: '7px 20px', borderRadius: 20, background: C.greenDark, border: 'none', color: 'white', fontSize: 11, cursor: 'pointer', fontWeight: 500 }}
            >
              ↺ Play walkthrough
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes alitaScreenIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes alitaPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (max-width: 720px) {
          .alita-phone-layout { flex-direction: column !important; gap: 26px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .alita-phone-layout *, .alita-phone-layout *::before { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
