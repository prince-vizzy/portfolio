import React, { useState, useEffect, useRef } from 'react';

/*
 * Phone mockup of the M-Pesa Budget Tracker Flutter app.
 * Colours and layout mirror lib/theme/app_colors.dart and the real screens
 * (dashboard_page.dart, history_page.dart, main_shell.dart) so this reads as
 * the actual app rather than a generic mockup.
 */
const C = {
  bg:        '#0F172A', // AppColors.mainBackground
  card:      '#1E293B', // AppColors.componentBase
  shadow:    '#334155', // AppColors.lightShadow
  accent:    '#EAB308', // AppColors.accent
  text:      '#FFFFFF', // AppColors.primaryText
  muted:     '#94A3B8', // AppColors.secondaryText
  dim:       '#64748B', // AppColors.textSecondary
};

const BUDGETS = [
  { name: 'Food & Dining', spent: 5420, budget: 8000,  period: 'This Month' },
  { name: 'Transport',     spent: 2100, budget: 3000,  period: 'This Month' },
  { name: 'Utilities',     spent: 3800, budget: 4000,  period: 'This Month' },
  { name: 'Shopping',      spent: 4200, budget: 5000,  period: 'This Month' },
];

const RECENT = [
  { name: 'Naivas Supermarket', when: 'Apr 25, 15:14', amount: 1200 },
  { name: 'Java House',         when: 'Apr 24, 12:02', amount: 850 },
  { name: 'Kenya Power',        when: 'Apr 23, 09:48', amount: 4500 },
  { name: 'Bolt',               when: 'Apr 22, 19:31', amount: 200 },
];

const CATEGORIES = ['Food & Dining', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Savings'];

const TREND = [420, 650, 4700, 1400, 6200, 550, 900, 1950, 300, 1100, 800, 450, 1200, 600];

const SCREENS = [
  { id: 'locked',     label: 'Notification', caption: 'App fully closed. A native NotificationListenerService captures the M-Pesa message, persists it, and boots a headless Flutter engine to parse and alert — no UI required.' },
  { id: 'categorize', label: 'Categorize',   caption: 'Tapping the alert cold-starts the app straight into the categorize prompt, with the parsed amount and merchant already filled in.' },
  { id: 'home',       label: 'Dashboard',    caption: 'Budgets per category with live usage, and every transaction the parser has captured this month.' },
  { id: 'history',    label: 'History',      caption: 'Spending trends over daily, weekly, monthly and annual windows, or broken down by category.' },
];

/* ── shared bits ───────────────────────────────────────────── */

function StatusBar({ light = true }) {
  const col = light ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.9)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 18px 2px', fontSize: 10, color: col, fontWeight: 500, letterSpacing: '0.02em' }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 9 }}>
        <span>▮▮▮</span><span>◗</span><span style={{ fontSize: 10 }}>86%</span>
      </span>
    </div>
  );
}

function NavBar({ active }) {
  const items = [
    { id: 'home',    label: 'Home',    d: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
    { id: 'history', label: 'History', d: 'M3 17h2v4H3v-4zm4-6h2v10H7V11zm4-6h2v16h-2V5zm4 9h2v7h-2v-7zm4-4h2v11h-2V10z' },
    { id: 'profile', label: 'Profile', d: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z' },
  ];
  return (
    <div style={{ margin: '0 12px 12px', background: 'rgba(30,41,59,0.95)', borderRadius: 22, boxShadow: '0 8px 14px rgba(15,23,42,0.9)', display: 'flex', padding: '7px 0' }}>
      {items.map(it => {
        const on = it.id === active;
        return (
          <div key={it.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: on ? C.accent : C.muted }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={it.d} /></svg>
            <span style={{ fontSize: 8, fontWeight: on ? 600 : 400 }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function PillHeader({ title }) {
  return (
    <div style={{ padding: '6px 14px 0' }}>
      <div style={{ height: 40, borderRadius: 20, background: C.bg, boxShadow: '0 6px 12px rgba(15,23,42,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{title}</span>
      </div>
    </div>
  );
}

/* ── screens ───────────────────────────────────────────────── */

function LockScreen({ showAlert }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(165deg,#111c33 0%,#0F172A 45%,#0a1020 100%)' }}>
      <StatusBar />
      <div style={{ textAlign: 'center', marginTop: 34, marginBottom: 26 }}>
        <div style={{ fontSize: 52, fontWeight: 200, color: 'rgba(255,255,255,0.95)', lineHeight: 1, letterSpacing: '-0.02em' }}>9:41</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>Tuesday, 25 April</div>
      </div>

      <div style={{ padding: '0 12px', flex: 1 }}>
        <div style={{
          background: 'rgba(30,41,59,0.92)',
          border: '1px solid rgba(234,179,8,0.28)',
          borderRadius: 16, padding: '11px 13px',
          backdropFilter: 'blur(8px)',
          opacity: showAlert ? 1 : 0,
          transform: showAlert ? 'none' : 'translateY(-14px) scale(0.96)',
          transition: 'all 0.55s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
            <div style={{ width: 15, height: 15, borderRadius: 4, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>💳</div>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>BUDGET</span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>now</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Naivas Supermarket</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>Ksh 1200 — tap to categorize</div>
        </div>

        <div style={{
          marginTop: 12, textAlign: 'center', fontSize: 9, color: 'rgba(255,255,255,0.4)',
          opacity: showAlert ? 1 : 0, transition: 'opacity 0.6s 0.3s',
        }}>
          captured while the app was closed
        </div>
      </div>

      <div style={{ height: 3, width: 90, background: 'rgba(255,255,255,0.3)', borderRadius: 2, margin: '0 auto 9px' }} />
    </div>
  );
}

function HomeScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg }}>
      <StatusBar />
      <PillHeader title="Spending Dashboard" />

      <div style={{ flex: 1, overflow: 'hidden', padding: '14px 14px 0' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 9 }}>Current Category Budgets</div>

          <div style={{ display: 'flex', gap: 9, marginBottom: 18, marginRight: -14 }}>
            {BUDGETS.map(b => {
              const pct = Math.round((b.spent / b.budget) * 100);
              const col = pct > 90 ? C.shadow : C.accent;
              return (
                <div key={b.name} style={{ width: 126, flexShrink: 0, background: C.card, borderRadius: 14, padding: 11 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name}</span>
                    <span style={{ marginLeft: 'auto', padding: '1px 6px', borderRadius: 8, background: `${col}1a`, fontSize: 8, fontWeight: 700, color: col }}>{pct}%</span>
                  </div>
                  <div style={{ fontSize: 10, color: C.muted }}>Ksh {b.spent} / {b.budget}</div>
                  <div style={{ height: 6, borderRadius: 5, background: C.shadow, marginTop: 9, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: col, borderRadius: 5 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: col }}>{b.period}</span>
                    <span style={{ fontSize: 8, color: C.muted }}>Ksh {b.budget}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 9 }}>Recent Transactions</div>
          {RECENT.map(t => (
            <div key={t.name} style={{ background: C.card, borderRadius: 11, padding: '11px 13px', marginBottom: 7, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{t.when}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#FFEB3B' }}>Ksh {t.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <NavBar active="home" />
    </div>
  );
}

function CategorizeScreen({ picked }) {
  return (
    <div style={{ height: '100%', position: 'relative', background: C.bg, overflow: 'hidden' }}>
      <div style={{ height: '100%', filter: 'blur(1.5px)', opacity: 0.4 }}>
        <HomeScreen />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ width: '100%', background: C.bg, borderRadius: 16, padding: 16, boxShadow: '0 24px 48px rgba(0,0,0,0.6)', animation: 'phoneDialogIn 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 13 }}>Categorize Transaction</div>

          <div style={{ background: C.card, borderRadius: 11, padding: 11, marginBottom: 13 }}>
            <div style={{ fontSize: 11, color: C.text }}>Paid to Naivas Supermarket</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.accent, marginTop: 3 }}>Ksh 1200.00</div>
          </div>

          <div>
            {CATEGORIES.map(cat => {
              const on = picked === cat;
              return (
                <div key={cat} style={{
                  background: on ? 'rgba(234,179,8,0.16)' : C.card,
                  border: `1px solid ${on ? 'rgba(234,179,8,0.5)' : 'transparent'}`,
                  borderRadius: 9, padding: '9px 12px', marginBottom: 6,
                  fontSize: 11, color: on ? C.accent : C.text, fontWeight: on ? 600 : 400,
                  transition: 'all 0.3s',
                }}>
                  {cat}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'right', marginTop: 10 }}>
            <span style={{ fontSize: 11, color: C.muted }}>Cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryScreen() {
  const max = Math.max(...TREND);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg }}>
      <StatusBar />
      <PillHeader title="Spending History" />

      <div style={{ flex: 1, padding: '14px 14px 0', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 5, display: 'flex', marginBottom: 12 }}>
          {['Daily', 'Weekly', 'Monthly', 'Annual'].map(r => (
            <div key={r} style={{
              flex: 1, textAlign: 'center', padding: '5px 0', borderRadius: 9, fontSize: 9,
              background: r === 'Daily' ? C.accent : 'transparent',
              color: r === 'Daily' ? C.bg : C.muted,
              fontWeight: r === 'Daily' ? 600 : 400,
            }}>{r}</div>
          ))}
        </div>

        <div style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 5, display: 'flex', marginBottom: 16 }}>
          {['Trend', 'By Category'].map(m => (
            <div key={m} style={{
              flex: 1, textAlign: 'center', padding: '5px 0', borderRadius: 9, fontSize: 9,
              background: m === 'Trend' ? C.accent : 'transparent',
              color: m === 'Trend' ? C.bg : C.muted,
              fontWeight: m === 'Trend' ? 600 : 400,
            }}>{m}</div>
          ))}
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 12 }}>Spending Trend (Last 30 Days)</div>

        <div style={{ background: C.card, borderRadius: 12, padding: '14px 11px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 96 }}>
            {TREND.map((v, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${(v / max) * 100}%`,
                background: v > 3000 ? '#D85A30' : C.accent,
                borderRadius: '3px 3px 0 0',
                opacity: 0.9,
                animation: `phoneBarGrow 0.6s ${i * 0.035}s both`,
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, fontSize: 8, color: C.dim }}>
            <span>15 Apr</span><span>21 Apr</span><span>28 Apr</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {[['Total', 'Ksh 22.3K'], ['Daily avg', 'Ksh 1,594'], ['Peak', 'Ksh 6,200']].map(([k, v]) => (
            <div key={k} style={{ flex: 1, background: C.card, borderRadius: 10, padding: '9px 8px' }}>
              <div style={{ fontSize: 8, color: C.muted }}>{k}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <NavBar active="history" />
    </div>
  );
}

/* ── showcase ──────────────────────────────────────────────── */

export default function MpesaPhoneShowcase() {
  const [screen, setScreen] = useState('locked');
  const [auto, setAuto] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [picked, setPicked] = useState(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Per-screen entrance choreography.
  useEffect(() => {
    clearTimers();
    setShowAlert(false);
    setPicked(null);

    if (screen === 'locked') {
      timers.current.push(setTimeout(() => setShowAlert(true), 700));
    }
    if (screen === 'categorize') {
      timers.current.push(setTimeout(() => setPicked('Shopping'), 1600));
    }
    return clearTimers;
  }, [screen]);

  // Auto-advance through the story until the visitor takes over.
  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => {
      const i = SCREENS.findIndex(s => s.id === screen);
      setScreen(SCREENS[(i + 1) % SCREENS.length].id);
    }, 4800);
    return () => clearTimeout(t);
  }, [screen, auto]);

  const active = SCREENS.find(s => s.id === screen);

  const pick = id => {
    setAuto(false);
    setScreen(id);
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 26 }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>On Device</div>
        <div style={{ fontSize: 22, fontWeight: 600 }}>The App Itself</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>Flutter · Android notification listener · SQLite</div>
      </div>

      <div className="mpesa-phone-layout" style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center' }}>

        {/* Phone */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 272, padding: 9, borderRadius: 40,
            background: 'linear-gradient(155deg,#3a3a40 0%,#17171b 40%,#0d0d10 100%)',
            boxShadow: '0 36px 70px -18px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07) inset',
          }}>
            <div style={{ position: 'relative', height: 552, borderRadius: 32, overflow: 'hidden', background: C.bg }}>
              {/* punch-hole camera */}
              <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, borderRadius: '50%', background: '#000', zIndex: 5, boxShadow: '0 0 0 1.5px rgba(255,255,255,0.05)' }} />

              <div key={screen} style={{ height: '100%', animation: 'phoneScreenIn 0.4s ease' }}>
                {screen === 'locked'     && <LockScreen showAlert={showAlert} />}
                {screen === 'categorize' && <CategorizeScreen picked={picked} />}
                {screen === 'home'       && <HomeScreen />}
                {screen === 'history'    && <HistoryScreen />}
              </div>
            </div>
          </div>
        </div>

        {/* Narration */}
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
                    background: on ? 'rgba(29,158,117,0.09)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${on ? 'rgba(29,158,117,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    color: 'white', transition: 'all 0.25s',
                    display: 'flex', alignItems: 'center', gap: 11,
                  }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0, fontSize: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: on ? '#1D9E75' : 'rgba(255,255,255,0.07)',
                    color: on ? 'white' : 'rgba(255,255,255,0.45)',
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 12, fontWeight: on ? 600 : 400 }}>{s.label}</span>
                  {on && <span style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#1D9E75', animation: 'phonePulse 1.2s infinite' }} />}
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
              onClick={() => { setAuto(true); setScreen('locked'); }}
              style={{ marginTop: 14, padding: '7px 20px', borderRadius: 20, background: '#1D9E75', border: 'none', color: 'white', fontSize: 11, cursor: 'pointer', fontWeight: 500 }}
            >
              ↺ Play walkthrough
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes phoneScreenIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes phoneDialogIn { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes phoneBarGrow  { from { height: 0; opacity: 0; } }
        @keyframes phonePulse    { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (max-width: 720px) {
          .mpesa-phone-layout { flex-direction: column !important; gap: 26px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mpesa-phone-layout *, .mpesa-phone-layout *::before { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
