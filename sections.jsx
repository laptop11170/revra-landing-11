/* sections.jsx — Page section components for Revra
 * Exports to window: Hero, OrbitSection, ActivatePhase, MergePhase, FeaturesSection, FinalCTA, Nav
 */

const { useState, useEffect, useRef, useMemo } = React;

/* ───────── NAV ───────── */
function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="brand">
        <span className="brand-mark"></span>
        <span>Revra</span>
      </div>
      <div className="nav-links">
        <a href="#emma">Emma</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#docs">Docs</a>
      </div>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>
        <a href="#" className="btn">Sign in</a>
        <a href="#" className="btn btn-primary">Get early access</a>
      </div>
    </nav>
  );
}

/* ───────── HERO (Phase 1) ───────── */
function Hero() {
  return (
    <section className="hero" id="emma">
      <div className="hero-content">
        <div className="eyebrow"><span className="dot"></span> A new category. Introducing the Agentic CRM.</div>
        <h1>
          The first <span className="accent">Agentic CRM</span>.<br/>
          Built for sales agents.
        </h1>
        <p className="lede">
          Old CRMs are databases with reminders. Agentic CRMs are agents that do the work for you.
          Meet <strong style={{color:'var(--fg)'}}>Emma — Your AI Sales Executive</strong>. She calls leads, drafts texts,
          and books appointments while you focus on closing.
        </p>
        <div className="hero-cta">
          <a href="#" className="btn btn-primary">Start Free — No Credit Card</a>
          <a href="#" className="btn">Hear Emma in Action</a>
        </div>
      </div>
      <div className="scroll-hint">
        <span>Scroll</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

/* ───────── ORBIT SECTION (Phases 2–3) — content arrives around the still sphere ───────── */
function OrbitSection({ id, anchor, copy, side = 'left', cards = [] }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting && e.intersectionRatio > 0.25),
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} className="phase" ref={ref}>
      <div className="orbit-frame">
        <div
          className={`orbit-copy reveal ${visible ? 'in' : ''}`}
          style={{
            [side === 'left' ? 'left' : 'right']: '6%',
            top: side === 'left' ? '22%' : '60%',
          }}
        >
          {copy.tag && <div className="tag">{copy.tag}</div>}
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
        {cards.map((c, i) => (
          <div
            key={i}
            className={`float-card ${c.kind || ''} reveal ${visible ? 'in' : ''}`}
            style={{
              ...c.style,
              transitionDelay: `${0.15 + i * 0.12}s`,
              animation: visible ? `floatY${i % 3} ${5 + i}s ease-in-out infinite` : 'none',
            }}
          >
            {c.kind === 'transcript' ? (
              <>
                <div className="label">Live call · 00:42</div>
                {c.lines.map((l, j) => (
                  <div key={j} style={{ marginTop: 6 }}>
                    <span className="speaker">{l.who}</span> {l.text}
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="label">{c.label}</div>
                <div className="value">
                  {c.value}
                  {c.delta && <span className="delta">{c.delta}</span>}
                </div>
                {c.foot && <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 6 }}>{c.foot}</div>}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────── PHASE 4 — ACTIVATE ─────────
 * The sphere has exploded. We render: (1) task processing card, (2) channel nodes
 * with connecting lines.
 */
const TASKS_INITIAL = [
  { label: 'Listening to inbound voice call · Acme Corp', status: 'done',     chip: 'COMPLETED' },
  { label: 'Transcribing & summarising conversation',     status: 'done',     chip: 'COMPLETED' },
  { label: 'Updating lead record · Mira Chen',            status: 'done',     chip: 'COMPLETED' },
  { label: 'Drafting follow-up SMS in 3 languages',       status: 'running',  chip: 'RUNNING' },
  { label: 'Booking demo · Tue 10:30 PT',                 status: 'running',  chip: 'RUNNING' },
  { label: 'Notifying AE · Slack DM',                     status: 'pending',  chip: 'QUEUED' },
];

const CHANNELS = [
  { name: 'Google Calendar', short: 'GC', color: '#4285F4', x: 0.10, y: 0.10 },
  { name: 'SMS',             short: 'SM', color: '#34d399', x: 0.85, y: 0.08 },
  { name: 'iMessage',        short: 'iM', color: '#0ea5e9', x: 0.06, y: 0.42 },
  { name: 'WhatsApp',        short: 'WA', color: '#22c55e', x: 0.92, y: 0.30 },
  { name: 'Instagram',       short: 'IG', color: '#e1306c', x: 0.16, y: 0.78 },
  { name: 'RCS',             short: 'RC', color: '#a855f7', x: 0.82, y: 0.82 },
  { name: 'Inbound Voice',   short: 'iV', color: '#9578ff', x: 0.02, y: 0.62 },
  { name: 'Outbound Voice',  short: 'oV', color: '#7a5cff', x: 0.96, y: 0.56 },
  { name: 'Inbound Text',    short: 'iT', color: '#56e8d8', x: 0.36, y: 0.04 },
  { name: 'Outbound Text',   short: 'oT', color: '#2bd9c8', x: 0.62, y: 0.96 },
];

function ActivatePhase() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const [tasks, setTasks] = useState(TASKS_INITIAL);
  const [visible, setVisible] = useState(false);
  const [stageRect, setStageRect] = useState({ w: 0, h: 0 });
  // workflowVisible: only true during the dispersed-hold middle of the section,
  // so the user sees the wave spread first on a clean canvas, then the workflow.
  const [workflowVisible, setWorkflowVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting && e.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.4, 0.7, 1] }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const ap = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
      setWorkflowVisible(ap >= 0.32 && ap <= 0.68);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!stageRef.current) return;
    const upd = () => {
      const r = stageRef.current.getBoundingClientRect();
      setStageRect({ w: r.width, h: r.height });
    };
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // Animate task list when visible — with 5s pause after all-done before restarting
  useEffect(() => {
    if (!workflowVisible) return;
    let timeoutId;
    let cancelled = false;
    const step = () => {
      if (cancelled) return;
      setTasks(prev => {
        const next = [...prev];
        const runningIdx = next.findIndex(t => t.status === 'running');
        const pendingIdx = next.findIndex(t => t.status === 'pending');
        if (runningIdx !== -1) next[runningIdx] = { ...next[runningIdx], status: 'done', chip: 'COMPLETED' };
        if (pendingIdx !== -1) next[pendingIdx] = { ...next[pendingIdx], status: 'running', chip: 'RUNNING' };

        const allDone = next.every(t => t.status === 'done');
        if (allDone) {
          // Pause 5s, then reset
          timeoutId = setTimeout(() => {
            if (cancelled) return;
            setTasks(TASKS_INITIAL);
            timeoutId = setTimeout(step, 1400);
          }, 5000);
          return next;
        }
        timeoutId = setTimeout(step, 1400);
        return next;
      });
    };
    timeoutId = setTimeout(step, 1400);
    return () => { cancelled = true; clearTimeout(timeoutId); };
  }, [workflowVisible]);

  // Channel positions in pixels
  const W = stageRect.w, H = stageRect.h;
  const cx = W / 2, cy = H / 2;

  return (
    <section className="activate-phase" id="capabilities" ref={ref}>
      <div className="activate-stage">
        <div className="activate-content" ref={stageRef}>
          {/* Connection lines */}
          {W > 0 && (
            <svg className="connection-svg" viewBox={`0 0 ${W} ${H}`}>
              <defs>
                <linearGradient id="wireGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(149, 120, 255, 0.6)"/>
                  <stop offset="100%" stopColor="rgba(43, 217, 200, 0.4)"/>
                </linearGradient>
              </defs>
              {CHANNELS.map((c, i) => {
                const x = c.x * W, y = c.y * H;
                const mx = (cx + x) / 2 + (Math.sin(i) * 30);
                const my = (cy + y) / 2 + (Math.cos(i) * 30);
                return (
                  <path
                    key={i}
                    d={`M ${cx} ${cy} Q ${mx} ${my} ${x} ${y}`}
                    style={{
                      animation: `dashflow 2.5s linear ${i * 0.15}s infinite`,
                      opacity: visible ? 0.5 : 0,
                      transition: 'opacity 0.6s',
                    }}
                  />
                );
              })}
            </svg>
          )}

          {/* Task runner card */}
          <div className={`task-runner reveal ${workflowVisible ? 'in' : ''}`}>
            <div className="task-runner-head">
              <div className="task-runner-title">
                <span className="live-dot"></span>
                Emma · Live Workflow
              </div>
              <div className="task-runner-meta">RUN-04F · 00:01:42</div>
            </div>
            <div className="task-list">
              {tasks.map((t, i) => (
                <div className="task-row" data-status={t.status} key={i}>
                  <span className="dot-icon"></span>
                  <span className="label">{t.label}</span>
                  <span className="status-chip">{t.chip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Channel nodes */}
          {CHANNELS.map((c, i) => (
            <div
              key={c.name}
              className={`channel-node reveal ${workflowVisible ? 'in' : ''}`}
              style={{
                left: `${c.x * 100}%`,
                top: `${c.y * 100}%`,
                transitionDelay: `${0.1 + i * 0.04}s`,
              }}
            >
              <span className="pulse-ring"></span>
              <span className="icon" style={{ background: c.color }}>{c.short}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reform headline — separate full-height section, NOT inside activate-phase
          so it doesn't overlap the sticky live-workflow card. */}
    </section>
  );
}

/* ───────── PHASE 5 — MERGE ───────── */
function ActivateTail() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section className="activate-tail" ref={ref}>
      <div className={`merge-text reveal ${visible ? 'in' : ''}`} style={{ textAlign: 'center', maxWidth: 980, margin: '0 auto', padding: '0 32px' }}>
        <p className="small">Ten channels. One operator.</p>
        <h2 className="big">Emma <span className="word">orchestrates</span> all of it.</h2>
      </div>
    </section>
  );
}

function MergePhase() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting && e.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.5, 1] }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="merge-phase" ref={ref}>
      <div className="merge-stage">
        <div className={`merge-text reveal ${visible ? 'in' : ''}`}>
          <p className="small">Welcome to the Agentic CRM era.</p>
          <h2 className="big">
            The first <span className="word">Agentic CRM</span>.<br/>
            Built for sales agents.
          </h2>
        </div>
      </div>
    </section>
  );
}

/* ───────── PHASE 6 — FEATURES ───────── */
function FeaturesSection() {
  return (
    <section className="features" id="features">
      <div className="features-head reveal-on-scroll">
        <div className="eyebrow" style={{ marginBottom: 0 }}>The full Agentic CRM surface</div>
        <h2>Everything a sales agent runs on.<br/>One coherent system.</h2>
        <p>No bolted-on AI. No forty integrations to glue. RevRa ships every primitive a sales team needs — and Emma operates them all.</p>
      </div>

      <div className="feature-grid">
        {/* Call recording — span 6 */}
        <div className="feature-card span-6">
          <div>
            <div className="icon-box">⏺</div>
            <h3>Call Recording, Transcription &amp; Summary</h3>
            <p>Every call captured, transcribed in 50+ languages, and summarized into structured action items — automatically pinned to the right deal.</p>
          </div>
          <CallRecordingDemo />
        </div>

        {/* Pipeline — span 6 */}
        <div className="feature-card span-6">
          <div>
            <div className="icon-box">▦</div>
            <h3>Kanban Pipeline &amp; Lead Profiles</h3>
            <p>A pipeline that updates itself. Activity, sentiment, and next-best-action live on every card.</p>
          </div>
          <KanbanDemo />
        </div>

        {/* Auto-dialer — span 4 */}
        <div className="feature-card span-4">
          <div>
            <div className="icon-box">☎</div>
            <h3>Auto-Dialer</h3>
            <p>Parallel power dialing with AI handover the moment a human picks up.</p>
          </div>
          <DialerDemo />
        </div>

        {/* Appointment setter — span 4 */}
        <div className="feature-card span-4">
          <div>
            <div className="icon-box">◷</div>
            <h3>AI Appointment Setter</h3>
            <p>Two-way calendar negotiation across channels. Emma books, reschedules, and confirms — even at 3am.</p>
          </div>
          <AppointmentDemo />
        </div>

        {/* Bulk campaigns — span 4 */}
        <div className="feature-card span-4">
          <div>
            <div className="icon-box">◇</div>
            <h3>Bulk Campaigns</h3>
            <p>SMS, iMessage, WhatsApp, RCS, voice — fire one campaign, Emma personalizes every touch.</p>
          </div>
          <BulkCampaignDemo />
        </div>

        {/* Inbound/outbound — span 6 */}
        <div className="feature-card span-6">
          <div>
            <div className="icon-box">⇄</div>
            <h3>Inbound &amp; Outbound AI Agents</h3>
            <p>Pick up at 2am. Outbound at scale. Voice, SMS, chat — one agent, every channel, never out of context.</p>
          </div>
          <InboundOutboundDemo />
        </div>

        {/* Executive assistant — span 3 */}
        <div className="feature-card span-3">
          <div>
            <div className="icon-box">✦</div>
            <h3>AI Executive Assistant</h3>
            <p>Emma briefs the AE before every call: who, what, why, and the ask.</p>
          </div>
          <ExecAssistantDemo />
        </div>

        {/* Activity feed — span 3 */}
        <div className="feature-card span-3">
          <div>
            <div className="icon-box">⌁</div>
            <h3>Activity Feed</h3>
            <p>Every touch, on every channel, on every lead — in one timeline.</p>
          </div>
          <ActivityFeedDemo />
        </div>

        {/* Chat history — span 3 */}
        <div className="feature-card span-3">
          <div>
            <div className="icon-box">◌</div>
            <h3>Unified Chat History</h3>
            <p>SMS, WhatsApp, iMessage, IG, RCS — one continuous thread per lead.</p>
          </div>
          <UnifiedChatDemo />
        </div>

        {/* Call history — span 3 */}
        <div className="feature-card span-3">
          <div>
            <div className="icon-box">◐</div>
            <h3>Call History &amp; Search</h3>
            <p>Search any phrase across every call. Jump to the timestamp.</p>
          </div>
          <CallHistoryDemo />
        </div>
      </div>
    </section>
  );
}

/* ───────── FINAL CTA + FOOTER ───────── */
function FinalCTA() {
  return (
    <>
      <section className="cta-final" id="deploy">
        <div className="eyebrow"><span className="dot"></span> The first Agentic CRM · onboarding sales agents now</div>
        <h2>Stop running a CRM.<br/>Start closing with one.</h2>
        <p>Plug in your number. Emma takes the wheel. You close more deals — in fewer hours.</p>
        <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#" className="btn btn-primary">Start Free — No Credit Card</a>
          <a href="#" className="btn">Talk to Avi</a>
        </div>
      </section>
      <footer>
        <div>© 2026 Revra Inc. · Built in San Francisco.</div>
        <div className="mono">v1.0 · agentic-crm</div>
      </footer>
    </>
  );
}

Object.assign(window, { Nav, Hero, OrbitSection, ActivatePhase, ActivateTail, MergePhase, FeaturesSection, FinalCTA });
