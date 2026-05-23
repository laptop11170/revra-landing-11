/* feature-cards.jsx — Animated demos for each card in the Agentic CRM feature grid.
 * Exported components: CallRecordingDemo, KanbanDemo, DialerDemo, AppointmentDemo,
 * BulkCampaignDemo, InboundOutboundDemo, ExecAssistantDemo, ActivityFeedDemo,
 * UnifiedChatDemo, CallHistoryDemo.
 * All run autonomously when on screen — they do NOT require user interaction.
 */

const { useState: fcState, useEffect: fcEffect, useRef: fcRef, useMemo: fcMemo } = React;

// Visibility hook (intersect → run animations only when in view)
function useFcVisible() {
  const ref = fcRef(null);
  const [v, setV] = fcState(false);
  fcEffect(() => {
    const obs = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* ───── 1. Call Recording — animated waveform tied to a "playing" cursor + live transcript ───── */
function CallRecordingDemo() {
  const [ref, on] = useFcVisible();
  const [cursor, setCursor] = fcState(0);
  const [tIndex, setTIndex] = fcState(0);
  const transcript = [
    { who: 'Mira',  text: '"What\'s onboarding look like for a 12-person team?"' },
    { who: 'Emma',  text: '"Median time to first ROI is 4.2 days."' },
    { who: 'Emma',  text: '"I\'ll send the playbook to mira@acme.io."' },
    { who: 'Mira',  text: '"Perfect — and tax-handling for multi-region?"' },
  ];
  fcEffect(() => {
    if (!on) return;
    const a = setInterval(() => setCursor(c => (c + 1.6) % 100), 120);
    const b = setInterval(() => setTIndex(i => (i + 1) % transcript.length), 2200);
    return () => { clearInterval(a); clearInterval(b); };
  }, [on]);

  // Pre-compute a stable bar height pattern so it doesn't re-randomize each frame
  const heights = fcMemo(() =>
    Array.from({ length: 48 }, (_, i) => 18 + Math.abs(Math.sin(i * 0.55)) * 70 + Math.sin(i * 1.3) * 12), []);

  return (
    <div className="fc-demo fc-rec" ref={ref}>
      <div className="fc-rec-top">
        <span className="fc-rec-rec"><span className="fc-rec-dot" /> REC · ACME-DISCO-04</span>
        <span className="fc-rec-time">00:14:22 / 00:32:08</span>
      </div>
      <div className="fc-wave">
        {heights.map((h, i) => {
          const past = (i / heights.length) * 100 < cursor;
          return (
            <span
              key={i}
              className={`fc-wave-bar ${past ? 'past' : ''}`}
              style={{ height: `${Math.min(100, h)}%`, animationDelay: `${i * 0.04}s` }}
            />
          );
        })}
        <span className="fc-wave-cursor" style={{ left: `${cursor}%` }} />
      </div>
      <div className="fc-rec-controls">
        <span className="fc-rec-btn">▶</span>
        <div className="fc-rec-progress"><span style={{ width: `${cursor}%` }} /></div>
        <span className="fc-rec-mini">1.0×</span>
      </div>
      <div className="fc-rec-line" key={tIndex}>
        <span className="who">{transcript[tIndex].who}:</span> {transcript[tIndex].text}
      </div>
    </div>
  );
}

/* ───── 2. Kanban — auto-shuffling cards drift between columns to feel "alive" ───── */
const KANBAN_COLS = [
  { title: 'Discovery', n: 14 },
  { title: 'Proposal',  n: 8  },
  { title: 'Closing',   n: 5  },
];
const KANBAN_DECK = [
  { co: 'Acme Corp', amt: '$48k', col: 0 },
  { co: 'Northwind', amt: '$22k', col: 0 },
  { co: 'Globex',    amt: '$71k', col: 0 },
  { co: 'Initech',   amt: '$18k', col: 1 },
  { co: 'Soylent',   amt: '$104k', col: 1 },
  { co: 'Vandelay',  amt: '$36k', col: 2 },
  { co: 'Hooli',     amt: '$220k', col: 2 },
];

function KanbanDemo() {
  const [ref, on] = useFcVisible();
  const [cards, setCards] = fcState(KANBAN_DECK);
  const [movingId, setMovingId] = fcState(-1);
  fcEffect(() => {
    if (!on) return;
    const intv = setInterval(() => {
      // Pick a card not in the last column; move it forward
      const candidates = cards.map((c, i) => ({ c, i })).filter(({ c }) => c.col < 2);
      if (!candidates.length) {
        // Reset
        setCards(KANBAN_DECK);
        return;
      }
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      setMovingId(pick.i);
      setTimeout(() => {
        setCards(prev => prev.map((c, idx) => idx === pick.i ? { ...c, col: c.col + 1 } : c));
        setMovingId(-1);
      }, 600);
    }, 2400);
    return () => clearInterval(intv);
  }, [on, cards]);

  return (
    <div className="fc-demo fc-kanban" ref={ref}>
      {KANBAN_COLS.map((col, ci) => (
        <div className="fc-kan-col" key={ci}>
          <div className="fc-kan-head"><span>{col.title}</span><span className="fc-kan-count">{cards.filter(c => c.col === ci).length}</span></div>
          <div className="fc-kan-cards">
            {cards.map((c, idx) => c.col === ci && (
              <div className={`fc-kan-card ${movingId === idx ? 'moving' : ''}`} key={`${c.co}-${idx}`}>
                <div className="fc-kan-co">{c.co}</div>
                <div className="fc-kan-amt">{c.amt}</div>
                <div className="fc-kan-bar"><span style={{ width: `${30 + (ci * 30)}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───── 3. Auto-Dialer — rows flip status; a counter ticks; live wave for connected ───── */
const DIALER_ROWS = [
  { num: '+1 (415) 555 0142', status: 'connected' },
  { num: '+1 (212) 555 0188', status: 'ringing' },
  { num: '+44 20 7946 0712',  status: 'ringing' },
  { num: '+1 (650) 555 0024', status: 'voicemail' },
  { num: '+1 (303) 555 0991', status: 'voicemail' },
  { num: '+1 (917) 555 8810', status: 'queued' },
];
const STATUS_CYCLE = ['queued', 'ringing', 'connected', 'voicemail', 'queued'];

function DialerDemo() {
  const [ref, on] = useFcVisible();
  const [rows, setRows] = fcState(DIALER_ROWS);
  const [tick, setTick] = fcState(0);
  fcEffect(() => {
    if (!on) return;
    const a = setInterval(() => setTick(t => t + 1), 200);
    const b = setInterval(() => {
      setRows(prev => prev.map((r, i) => {
        // Each tick, rotate one row's status
        if ((tick + i) % 4 === 0) {
          const ix = STATUS_CYCLE.indexOf(r.status);
          return { ...r, status: STATUS_CYCLE[(ix + 1) % STATUS_CYCLE.length] };
        }
        return r;
      }));
    }, 1500);
    return () => { clearInterval(a); clearInterval(b); };
  }, [on, tick]);

  const connectedCount = rows.filter(r => r.status === 'connected').length;
  const totalCalls = 248 + Math.floor(tick / 5);

  return (
    <div className="fc-demo fc-dialer" ref={ref}>
      <div className="fc-dialer-stats">
        <div className="fc-dialer-stat"><span className="k">{totalCalls}</span><span className="l">CALLS</span></div>
        <div className="fc-dialer-stat"><span className="k accent">{connectedCount}/6</span><span className="l">LIVE</span></div>
        <div className="fc-dialer-stat"><span className="k">{Math.round(28 + Math.sin(tick / 10) * 6)}<span style={{fontSize:11}}>%</span></span><span className="l">PICKUP</span></div>
      </div>
      <div className="fc-dialer-rows">
        {rows.map((r, i) => (
          <div className={`fc-dialer-row stat-${r.status}`} key={i}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span className="phone">{r.num}</span>
            <span className="stat-icon">
              {r.status === 'connected' && <span className="livebars"><i/><i/><i/><i/></span>}
              {r.status === 'ringing' && <span className="ringer">◐</span>}
              {r.status === 'voicemail' && <span>✕</span>}
              {r.status === 'queued' && <span>·</span>}
            </span>
            <span className="stat-chip">{r.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── 4. Appointment Setter — chat negotiation → calendar slot lights up ───── */
function AppointmentDemo() {
  const [ref, on] = useFcVisible();
  const [step, setStep] = fcState(0);
  fcEffect(() => {
    if (!on) return;
    const seq = [0, 1, 2, 3, 4, 5];
    let idx = 0;
    const intv = setInterval(() => {
      idx = (idx + 1) % seq.length;
      setStep(seq[idx]);
    }, 1300);
    return () => clearInterval(intv);
  }, [on]);

  // Generate 7-day mini calendar
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // Slots row for chosen day (Tue) — 9..12
  const slotIndex = 3; // 10:30 slot
  return (
    <div className="fc-demo fc-appt" ref={ref}>
      <div className="fc-appt-chat">
        <div className={`fc-appt-bubble out ${step >= 0 ? 'in' : ''}`}>"Could we do Tuesday 10:30 PT?"</div>
        <div className={`fc-appt-bubble in ${step >= 1 ? 'in' : ''}`}>
          <span className="ag">EMMA</span>"Checking your calendar…"
        </div>
        <div className={`fc-appt-bubble in ${step >= 3 ? 'in' : ''}`}>
          <span className="ag">EMMA</span>"Tue 10:30 PT works. Sending invite."
        </div>
      </div>
      <div className="fc-appt-cal">
        <div className="fc-appt-cal-head">
          <span>MAY · WEEK 19</span>
          <span className={`fc-appt-mini ${step >= 4 ? 'on' : ''}`}>● Zoom</span>
        </div>
        <div className="fc-appt-days">
          {days.map((d, i) => (
            <span key={i} className={`fc-appt-day ${i === 1 && step >= 2 ? 'sel' : ''}`}>{d}</span>
          ))}
        </div>
        <div className="fc-appt-slots">
          {['9:00','9:30','10:00','10:30','11:00'].map((s, i) => (
            <div key={i} className={`fc-appt-slot ${i === slotIndex && step >= 4 ? 'booked' : ''} ${i === slotIndex && step === 2 ? 'pulse' : ''}`}>
              {s}
              {i === slotIndex && step >= 4 && <span className="bk">✓</span>}
            </div>
          ))}
        </div>
        {step >= 5 && (
          <div className="fc-appt-confirm">
            <div className="bk-head">✓ Booked · Tue · May 12</div>
            <div className="bk-meta">10:30 – 11:00 PT · Zoom · 3 attendees</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── 5. Bulk Campaigns — continuously scrolling list of running campaigns ───── */
const CAMPAIGNS = [
  ['SMS', 'Q2 Reactivation',     '4,820', '+18%', '#34d399'],
  ['VOICE', 'Demo Followup',     '892',   '+34%', '#a855f7'],
  ['WA', 'LATAM Expansion',      '1,612', '+11%', '#22c55e'],
  ['RCS', 'Enterprise Round 4',  '328',   '+27%', '#a855f7'],
  ['IM', 'iMessage Reactivate',  '2,140', '+22%', '#0ea5e9'],
  ['SMS', 'Holiday Promo',       '6,108', '+19%', '#34d399'],
  ['VOICE', 'Renewal Q3',        '414',   '+12%', '#a855f7'],
  ['IG',  'DM Burst',            '722',   '+8%',  '#e1306c'],
  ['WA',  'EU GDPR Optin',       '1,008', '+15%', '#22c55e'],
  ['SMS', 'Black Friday Pre',    '5,332', '+41%', '#34d399'],
];

function BulkCampaignDemo() {
  const [ref, on] = useFcVisible();
  // Duplicate the list so the marquee loops seamlessly
  const list = [...CAMPAIGNS, ...CAMPAIGNS];
  return (
    <div className="fc-demo fc-bulk" ref={ref}>
      <div className="fc-bulk-head">
        <span>● {CAMPAIGNS.length} CAMPAIGNS LIVE</span>
        <span className="dim">Last 24h</span>
      </div>
      <div className="fc-bulk-scroll">
        <div className={`fc-bulk-track ${on ? 'go' : ''}`}>
          {list.map((c, i) => (
            <div className="fc-bulk-row" key={i}>
              <span className="fc-bulk-tag" style={{ background: c[4] + '33', color: c[4] }}>{c[0]}</span>
              <span className="fc-bulk-name">{c[1]}</span>
              <span className="fc-bulk-num">{c[2]}</span>
              <span className="fc-bulk-delta">{c[3]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───── 6. Inbound + Outbound — code-cmd console scrolling ───── */
const CODE_LINES = [
  ['$ revra inbound listen --ch=voice,sms,chat',          'cmd'],
  ['↪ listening · 10 channels · 3 active',                 'ok'],
  ['[INBOUND] +14155550142 · "what about pricing?"',       'log'],
  ['  emma.reply → "$24/seat. Sending breakdown…"',        'em'],
  ['  ✓ resolved · 4.2s',                                  'ok'],
  ['[INBOUND] +12125550188 · imessage',                    'log'],
  ['  emma.reply → "Yes — Tue 10:30 PT works."',           'em'],
  ['  ✓ booked · cal/123',                                 'ok'],
  ['$ revra outbound dial --list=Q2_renewals --rate=80/m', 'cmd'],
  ['↪ dialing 612 · concurrency=12',                       'ok'],
  ['  pickup 9% · agent_handoff=on',                       'dim'],
  ['[OUTBOUND] +14085551204 · pickup',                     'log'],
  ['  emma.opener → 12s · disposition=interested',         'em'],
  ['  → handoff(ae=avi) · meeting booked',                 'ok'],
  ['[OUTBOUND] +12029990418 · voicemail · drop',           'dim'],
  ['$ revra metrics --since=1h',                           'cmd'],
  ['  inbound:34c·118s·74ch · 95% resolved',               'ok'],
  ['  outbound:612·9% pickup · 48 demos booked',           'ok'],
];

function InboundOutboundDemo() {
  const [ref, on] = useFcVisible();
  const [cursor, setCursor] = fcState(0);
  fcEffect(() => {
    if (!on) return;
    const intv = setInterval(() => setCursor(c => c + 1), 750);
    return () => clearInterval(intv);
  }, [on]);
  // Show last ~9 lines
  const visible = [];
  for (let i = 0; i < 9; i++) {
    visible.push(CODE_LINES[(cursor + i) % CODE_LINES.length]);
  }
  return (
    <div className="fc-demo fc-code" ref={ref}>
      <div className="fc-code-bar">
        <span className="dots"><i/><i/><i/></span>
        <span>revra · agent shell</span>
        <span className="dim">v1.0</span>
      </div>
      <div className="fc-code-body">
        {visible.map(([txt, cls], i) => (
          <div className={`fc-code-line ln-${cls}`} key={`${cursor}-${i}`} style={{ animationDelay: `${i * 0.04}s` }}>
            <span className="ln-num">{String((cursor + i) % CODE_LINES.length + 1).padStart(2,'0')}</span>
            <span>{txt}</span>
          </div>
        ))}
        <div className="fc-code-prompt">$ <span className="caret"></span></div>
      </div>
    </div>
  );
}

/* ───── 7. Executive Assistant — high-tech orb with rotating "task" briefing ───── */
const EXEC_BRIEFS = [
  ['NEXT CALL · 0:14:22', 'Acme Corp · Mira Chen', 'Wants pricing for 30 seats. Mentioned multi-region SSO last week.', '3-yr customer · NPS 82'],
  ['NEXT CALL · 0:32:01', 'Northwind · Devon Ho',  'Re-engaging after Q1 pause. Budget unlocked yesterday.',           '2 demos booked · stage: closing'],
  ['NEXT CALL · 0:51:00', 'Globex · Priya Suresh', 'Decision today. Two questions: data residency, SOC2 timeline.',     'champion=CTO · score 94'],
];

function ExecAssistantDemo() {
  const [ref, on] = useFcVisible();
  const [i, setI] = fcState(0);
  fcEffect(() => {
    if (!on) return;
    const intv = setInterval(() => setI(prev => (prev + 1) % EXEC_BRIEFS.length), 3500);
    return () => clearInterval(intv);
  }, [on]);
  const b = EXEC_BRIEFS[i];
  return (
    <div className="fc-demo fc-exec" ref={ref}>
      <div className="fc-exec-orb">
        <div className="fc-exec-core" />
        <div className="fc-exec-ring r1" />
        <div className="fc-exec-ring r2" />
        <div className="fc-exec-ring r3" />
        <div className="fc-exec-grid">
          {Array.from({ length: 24 }).map((_, n) => <span key={n} style={{ animationDelay: `${n * 0.08}s` }} />)}
        </div>
      </div>
      <div className="fc-exec-brief" key={i}>
        <div className="fc-exec-time">{b[0]}</div>
        <div className="fc-exec-co">{b[1]}</div>
        <div className="fc-exec-body">{b[2]}</div>
        <div className="fc-exec-meta">{b[3]}</div>
      </div>
    </div>
  );
}

/* ───── 8. Activity Feed — live timeline of events fading in at top ───── */
const ACT_EVENTS = [
  { ic: '☎', who: 'Emma',  what: 'Outbound call · Acme Corp', meta: 'connected · 4m 12s', tone: 'voice' },
  { ic: '✦', who: 'Emma',  what: 'Booked demo · Globex',       meta: 'Tue 10:30 PT',        tone: 'book' },
  { ic: '✉', who: 'Emma',  what: 'iMessage reply · Mira Chen', meta: '"Send the playbook"', tone: 'msg' },
  { ic: '↑', who: 'System', what: 'Lead score updated · Hooli', meta: '72 → 91',             tone: 'sys' },
  { ic: '✓', who: 'Avi',   what: 'Closed deal · Vandelay',     meta: '$36k MRR',            tone: 'win' },
  { ic: '☎', who: 'Emma',  what: 'Inbound · +1 (212) 555 0188', meta: 'resolved · 1m 04s',  tone: 'voice' },
  { ic: '⌁', who: 'Emma',  what: 'Auto-dialer batch · Q2',     meta: '612 calls · 9% pickup', tone: 'sys' },
];

function ActivityFeedDemo() {
  const [ref, on] = useFcVisible();
  const [items, setItems] = fcState(ACT_EVENTS.slice(0, 5));
  fcEffect(() => {
    if (!on) return;
    let n = 5;
    const intv = setInterval(() => {
      const next = ACT_EVENTS[n % ACT_EVENTS.length]; n++;
      setItems(prev => [next, ...prev].slice(0, 5));
    }, 2000);
    return () => clearInterval(intv);
  }, [on]);
  return (
    <div className="fc-demo fc-act" ref={ref}>
      <div className="fc-act-head">
        <span><span className="livedot" /> LIVE FEED</span>
        <span className="dim">just now</span>
      </div>
      <div className="fc-act-list">
        {items.map((e, idx) => (
          <div className={`fc-act-row tone-${e.tone}`} key={`${e.what}-${idx}`}>
            <span className="ic">{e.ic}</span>
            <div>
              <div className="line"><b>{e.who}</b> · {e.what}</div>
              <div className="meta">{e.meta}</div>
            </div>
            {idx === 0 && <span className="now">NEW</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── 9. Unified Chat — multi-channel platform tabs feeding one thread ───── */
const PLATFORMS = [
  { id: 'imessage', name: 'iMessage',   color: '#0a84ff' },
  { id: 'whatsapp', name: 'WhatsApp',   color: '#25d366' },
  { id: 'instagram',name: 'Instagram',  color: '#e1306c' },
  { id: 'sms',      name: 'SMS',        color: '#34d399' },
  { id: 'rcs',      name: 'RCS',        color: '#a855f7' },
];
const CHAT_THREAD = [
  { p: 0, who: 'Mira',  txt: '"following up on the demo last week"' },
  { p: 0, who: 'Emma',  txt: '"of course — sending the deck now"' },
  { p: 1, who: 'Mira',  txt: '"actually can we move to whatsapp?"' },
  { p: 1, who: 'Emma',  txt: '"done. Same thread — picking up where we left off."' },
  { p: 2, who: 'Mira',  txt: '"DM\'d you on IG with the team\'s questions"' },
  { p: 2, who: 'Emma',  txt: '"got it — replying in the thread."' },
];

function UnifiedChatDemo() {
  const [ref, on] = useFcVisible();
  const [shown, setShown] = fcState(2);
  fcEffect(() => {
    if (!on) return;
    const intv = setInterval(() => {
      setShown(s => {
        if (s >= CHAT_THREAD.length) return 2; // reset
        return s + 1;
      });
    }, 1700);
    return () => clearInterval(intv);
  }, [on]);
  const activePlatform = CHAT_THREAD[shown - 1] ? CHAT_THREAD[shown - 1].p : 0;

  return (
    <div className="fc-demo fc-uchat" ref={ref}>
      <div className="fc-uchat-tabs">
        {PLATFORMS.map((p, i) => (
          <span key={p.id} className={`fc-uchat-tab ${activePlatform === i ? 'on' : ''}`}>
            <span className="ic" style={{ background: p.color }} />
            {p.name}
          </span>
        ))}
      </div>
      <div className="fc-uchat-thread">
        {CHAT_THREAD.slice(0, shown).map((m, i) => (
          <div key={i} className={`fc-uchat-msg ${m.who === 'Emma' ? 'out' : 'in'}`} style={{ borderColor: PLATFORMS[m.p].color + '55' }}>
            <span className="src" style={{ color: PLATFORMS[m.p].color }}>{PLATFORMS[m.p].name}</span>
            <span className="txt">{m.txt}</span>
          </div>
        ))}
      </div>
      <div className="fc-uchat-foot">
        <span className="dim">One thread · all channels</span>
        <span>↳ revra</span>
      </div>
    </div>
  );
}

/* ───── 10. Call History & Search — search bar with results highlighting matches ───── */
const CALL_HISTORY = [
  { date: 'Today · 09:42',  co: 'Acme Corp',   contact: 'Mira Chen',   dur: '14:22', snippet: 'pricing for 30 seats and the roadmap on multi-region SSO' },
  { date: 'Today · 08:11',  co: 'Globex',      contact: 'Priya Suresh', dur: '08:04', snippet: 'data residency in EU and SOC2 timeline by Q3' },
  { date: 'Yesterday',      co: 'Northwind',   contact: 'Devon Ho',    dur: '22:18', snippet: 'budget unlocked, want a written proposal by Friday' },
  { date: 'Yesterday',      co: 'Hooli',       contact: 'Karen Lin',   dur: '05:41', snippet: 'reschedule for next Tuesday at 10:30 PT' },
  { date: 'Wed',            co: 'Initech',     contact: 'Tom Park',    dur: '17:02', snippet: 'security review and SOC2 documentation' },
];
const QUERIES = ['SOC2', 'pricing', 'reschedule', 'multi-region'];

function CallHistoryDemo() {
  const [ref, on] = useFcVisible();
  const [q, setQ] = fcState('');
  const [qIdx, setQIdx] = fcState(0);
  fcEffect(() => {
    if (!on) return;
    let cancelled = false;
    let target = QUERIES[qIdx];
    let i = 0;
    const type = () => {
      if (cancelled) return;
      if (i <= target.length) {
        setQ(target.slice(0, i));
        i++;
        setTimeout(type, 90);
      } else {
        setTimeout(() => {
          if (cancelled) return;
          setQ('');
          setQIdx(p => (p + 1) % QUERIES.length);
        }, 2200);
      }
    };
    type();
    return () => { cancelled = true; };
  }, [on, qIdx]);

  const matches = q ? CALL_HISTORY.filter(c => c.snippet.toLowerCase().includes(q.toLowerCase())) : CALL_HISTORY;

  const highlight = (text) => {
    if (!q) return text;
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i === -1) return text;
    return (<>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>);
  };

  return (
    <div className="fc-demo fc-callh" ref={ref}>
      <div className="fc-callh-search">
        <span className="ic">⌕</span>
        <span className="q">{q}<span className="caret"></span></span>
        <span className="hint">⌘K</span>
      </div>
      <div className="fc-callh-list">
        {matches.slice(0, 4).map((c, i) => (
          <div className="fc-callh-row" key={`${c.contact}-${i}`}>
            <div className="fc-callh-meta">
              <span>{c.contact} · {c.co}</span>
              <span className="dim">{c.dur}</span>
            </div>
            <div className="fc-callh-snip">"…{highlight(c.snippet)}…"</div>
            <div className="fc-callh-time dim">{c.date}</div>
          </div>
        ))}
        {matches.length === 0 && <div className="fc-callh-row"><div className="dim">No matches.</div></div>}
      </div>
    </div>
  );
}

Object.assign(window, {
  CallRecordingDemo, KanbanDemo, DialerDemo, AppointmentDemo,
  BulkCampaignDemo, InboundOutboundDemo, ExecAssistantDemo,
  ActivityFeedDemo, UnifiedChatDemo, CallHistoryDemo,
});
