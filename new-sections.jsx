/* new-sections.jsx — Agentic CRM brand sections per spec
 * Exports: WhatIsACRM, ColdToCloseFunnel, DeathSection, BuyTimeBack, FounderStrip, Pricing, FAQSection
 */

const { useState: useS, useEffect: useE, useRef: useR } = React;

// Hook: visible-on-scroll
function useReveal(threshold = 0.15) {
  const ref = useR(null);
  const [v, setV] = useS(false);
  useE(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* ───── 1. What is an Agentic CRM? — manifesto + old/new comparison ───── */
function WhatIsACRM() {
  const [ref, visible] = useReveal();
  const rows = [
    ['Database with reminders', 'An agent that does the work'],
    ['You write every follow-up', 'Emma drafts them in your voice'],
    ['You score leads in your head', 'Lead scoring 0–100, the second a lead arrives'],
    ['You call cold leads on your time', 'Emma calls at 9 PM while you sleep'],
    ['You update the pipeline manually', 'Emma logs every call, every text, every stage'],
    ['You start your day catching up', 'You start your day with a Morning Briefing'],
    ['You pay per text. You register for A2P.', 'Unlimited messaging. Native iMessage. No A2P.'],
  ];
  return (
    <section className="band band-dark band-acrm" id="what-is-acrm" ref={ref}>
      <div className="band-inner">
        <div className={`acrm-manifesto reveal ${visible ? 'in' : ''}`}>
          <div className="eyebrow"><span className="dot"></span> Category definition</div>
          <h2 className="display">What is an <span className="accent">Agentic CRM</span>?</h2>
          <div className="manifesto-body">
            <p>
              <strong>Agentic CRM</strong> stands for <strong>Agentic CRM</strong>. It's a new category of
              software where the AI doesn't just <em>assist</em> your sales team — the AI <em>is</em> a
              member of your sales team.
            </p>
            <p>
              Traditional CRMs are databases with reminders. You log the lead. You set the follow-up.
              You write the text. You make the call. You update the stage. The CRM watches.
            </p>
            <p>
              An Agentic CRM works the lead <em>for</em> you. It scores the lead. It drafts the follow-up.
              It calls when you're sleeping. It books the appointment. It updates the stage. You walk
              in and close.
            </p>
            <p className="punch">RevRa is the first Agentic CRM.</p>
          </div>
        </div>

        <div className={`compare-grid reveal ${visible ? 'in' : ''}`} style={{transitionDelay: '0.2s'}}>
          <div className="compare-col compare-old">
            <div className="compare-head">
              <span className="strike">Old CRM</span>
              <span className="compare-tag">Previous era</span>
            </div>
            {rows.map((r, i) => (
              <div className="compare-row" key={i} style={{ transitionDelay: `${0.3 + i * 0.04}s` }}>
                <span className="bullet old-bullet"></span>{r[0]}
              </div>
            ))}
          </div>
          <div className="compare-col compare-new">
            <div className="compare-head">
              <span className="acrm-tag">Agentic CRM</span>
              <span className="compare-tag accent-tag">RevRa</span>
            </div>
            {rows.map((r, i) => (
              <div className="compare-row new-row" key={i} style={{ transitionDelay: `${0.3 + i * 0.04}s` }}>
                <span className="bullet new-bullet">→</span>{r[1]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── 2. Cold-to-Close Funnel — green→blue bubble morph ───── */
function ColdToCloseFunnel() {
  const [ref, visible] = useReveal();
  const [active, setActive] = useS(0);

  // Auto-advance through stages when visible
  useE(() => {
    if (!visible) return;
    const intv = setInterval(() => {
      setActive(a => (a + 1) % 4);
    }, 3200);
    return () => clearInterval(intv);
  }, [visible]);

  const stages = [
    { num: 1, title: 'Cold outreach', sub: 'SMS / Social DM',
      body: 'Cold campaigns go out under Revra LLC\'s compliance umbrella. We absorb the A2P registration. You skip the carrier paperwork.' },
    { num: 2, title: 'iMessage handoff', sub: 'Green → Blue',
      body: 'The second a lead replies, the conversation moves to iMessage. Up to 5× more replies than SMS. We auto-fall-back if the lead isn\'t on iMessage.' },
    { num: 3, title: 'Emma takes over', sub: 'Voice + Text',
      body: 'Emma qualifies, handles objections, and books appointments — across iMessage, voice, and chat. After hours. On weekends. In 47 timezones.' },
    { num: 4, title: 'You close', sub: 'Pre-briefed',
      body: 'Emma hands you a fully briefed appointment. You take the call. You close. She logs everything back to the pipeline.' },
  ];

  return (
    <section className="band band-light band-funnel" id="funnel" ref={ref}>
      <div className="band-inner">
        <div className={`funnel-head reveal ${visible ? 'in' : ''}`}>
          <div className="eyebrow eyebrow-light"><span className="dot"></span> Architecture</div>
          <h2 className="display dark">From cold lead to closed deal —<br/>the <span className="accent">Agentic CRM</span> way.</h2>
          <p className="subhead">Most CRMs throw your leads into a workflow and wish you luck. RevRa runs the whole funnel for you, channel by channel.</p>
        </div>

        <div className={`funnel-track reveal ${visible ? 'in' : ''}`} style={{transitionDelay: '0.2s'}}>
          {/* Connector line */}
          <div className="funnel-line">
            <div className="funnel-progress" style={{ width: `${(active / 3) * 100}%` }}></div>
          </div>

          <div className="funnel-stages">
            {stages.map((s, i) => (
              <button
                key={i}
                className={`funnel-stage ${active === i ? 'active' : ''} ${active > i ? 'done' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="stage-num">0{s.num}</div>
                <div className="stage-title">{s.title}</div>
                <div className="stage-sub">{s.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Visual area — bubble morph */}
        <div className={`funnel-visual reveal ${visible ? 'in' : ''}`} style={{transitionDelay: '0.3s'}}>
          <div className="phone-frame">
            <div className="phone-status">
              <span className="phone-time">9:41</span>
              <span className="phone-name">Mira Chen</span>
              <span className="phone-info">●●●</span>
            </div>
            <div className="phone-body">
              <BubbleStream active={active} />
            </div>
          </div>

          <div className="funnel-detail">
            <div className="detail-step">{stages[active].title}</div>
            <p>{stages[active].body}</p>
            {active === 1 && (
              <div className="five-x">
                <span className="five-x-num">5×</span>
                <span className="five-x-label">more replies on iMessage<br/>vs SMS</span>
              </div>
            )}
            {active === 2 && (
              <div className="emma-orb">
                <div className="orb-core"></div>
                <div className="orb-ring r1"></div>
                <div className="orb-ring r2"></div>
                <div className="orb-ring r3"></div>
                <div className="orb-label">Emma · listening</div>
              </div>
            )}
            {active === 3 && (
              <div className="cal-card">
                <div className="cal-day">TUE · MAY 12</div>
                <div className="cal-time">10:30 – 11:00 PT</div>
                <div className="cal-title">Acme Discovery</div>
                <div className="cal-attendees">3 attendees · briefed</div>
                <div className="cal-confirm">✓ Booked by Emma</div>
              </div>
            )}
            {active === 0 && (
              <div className="compliance-card">
                <div className="comp-tag">A2P · 10DLC · ABSORBED</div>
                <div className="comp-headline">Sending under Revra LLC.</div>
                <div className="comp-body">Skip the carrier paperwork. Skip the rejection queue. Send the day you sign up.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BubbleStream({ active }) {
  // Stage 0: green outgoing SMS only
  // Stage 1: green outgoing + first blue incoming (the morph)
  // Stage 2: blue iMessage thread continuing, Emma replies
  // Stage 3: confirmation message + calendar invite
  return (
    <div className="bubble-stream">
      <div className={`bubble out sms ${active >= 0 ? 'in' : ''}`}>
        Hi Mira — Avi from RevRa. Saw you looking at sales tools. Worth a 10-min chat?
      </div>
      <div className={`bubble in ${active >= 1 ? 'in' : ''} ${active >= 1 ? 'morph' : ''}`}>
        Yeah — what's the angle?
      </div>
      <div className={`bubble out imessage ${active >= 2 ? 'in' : ''}`}>
        We replace your CRM with an AI Sales Executive. She calls cold leads, books meetings, drafts your follow-ups. I'll let her run point.
      </div>
      <div className={`bubble in emma ${active >= 2 ? 'in' : ''}`}>
        <span className="emma-tag">Emma</span>
        Hey Mira — happy to send you a 60-second clip of how this works for a team your size. Want me to pencil in Tue 10:30 PT for a live walkthrough?
      </div>
      <div className={`bubble in ${active >= 3 ? 'in' : ''}`}>
        That works. Confirmed.
      </div>
      <div className={`bubble out imessage cal ${active >= 3 ? 'in' : ''}`}>
        ✓ Booked: Tue · 10:30 PT
      </div>
    </div>
  );
}

/* ───── 3. Death to... — coral accent cards ───── */
function DeathSection() {
  const [ref, visible] = useReveal();
  const items = [
    { title: 'Death to traditional CRM admin.', body: 'No more logging every call, updating every stage, writing every follow-up. The Agentic CRM does the CRM work for you. You sell.', big: true },
    { title: 'Death to A2P paperwork.', body: 'No 10DLC registration. No carrier rejections. Revra LLC absorbs A2P so you don\'t have to.' },
    { title: 'Death to text credits.', body: 'No "campaigns paused — out of SMS credits." One transparent currency: AI Tokens. iMessage is free.' },
    { title: 'Death to appointment setting.', body: 'Emma books your appointments. You take the meeting and close. That\'s the entire job.' },
    { title: 'Death to admin work.', body: 'No data entry. No manual follow-up. No "let me update the pipeline real quick." Emma does it.' },
    { title: 'Death to dead leads.', body: 'Emma works your pipeline at 9 PM, on Saturdays, on holidays. Cold leads get a call until they answer.' },
    { title: 'Death to five tabs.', body: 'One inbox. Every channel. Every lead. One screen. iMessage, SMS, WhatsApp, RCS, voice.' },
  ];
  return (
    <section className="band band-dark band-death" id="death" ref={ref}>
      <div className="band-inner">
        <div className={`death-head reveal ${visible ? 'in' : ''}`}>
          <div className="eyebrow"><span className="dot coral-dot"></span> Seven things you'll never do again</div>
          <h2 className="display">What dies when you switch to the <span className="coral">Agentic CRM</span>.</h2>
        </div>

        <div className={`death-terminal reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <div className="death-terminal-bar">
            <div className="dots"><span></span><span></span><span></span></div>
            <span>deploy: legacy-crm.workflow · status: failed</span>
            <span>exit&nbsp;1</span>
          </div>
          <div className="death-terminal-body">
            <span className="ln dim">$ ./run-sales-day --crm legacy</span>
            <span className="ln">&gt; Loading 14 saved searches…</span>
            <span className="ln warn">&gt; WARN: 312 leads went cold while CRM was idle.</span>
            <span className="ln warn">&gt; WARN: A2P 10DLC registration · pending · 14d</span>
            <span className="ln err">&gt; ERROR: human required to send follow-up</span>
            <span className="ln err">&gt; ERROR: campaign paused · out of SMS credits</span>
            <span className="ln err">&gt; ERROR: appointment.set() not implemented</span>
            <span className="ln err">&gt; FATAL: deployment failed · admin overhead 67%</span>
            <span className="ln dim">&nbsp;</span>
            <span className="ln ok">$ ./run-sales-day --crm revra</span>
            <span className="ln ok">&gt; emma online · 10 channels · 0 paperwork</span>
            <span className="ln ok">&gt; deploy: agentic-crm.workflow · status: ready<span className="cursor"></span></span>
          </div>
        </div>

        <div className="death-grid">
          {items.map((it, i) => (
            <div
              key={i}
              className={`death-card ${it.big ? 'big' : ''} reveal ${visible ? 'in' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.06}s` }}
            >
              <div className="death-skull">×</div>
              <h3 className="death-title">{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── 4. Buy Time Back ───── */
function BuyTimeBack() {
  const [ref, visible] = useReveal();
  const [count, setCount] = useS(0);
  useE(() => {
    if (!visible) return;
    let raf, start = 0;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 1400);
      setCount(2 + p * 1); // 2 → 3
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const wins = [
    { k: '2–3 hrs', l: 'extra selling time, per agent, per day' },
    { k: '< 5 sec', l: 'speed to first reply, day or night' },
    { k: '24 / 7', l: 'Emma is on. Even on Sundays.' },
    { k: '0', l: 'leads that ever go cold' },
  ];
  return (
    <section className="band band-light band-buyback" id="buyback" ref={ref}>
      <div className="band-inner">
        <div className={`buyback-grid reveal ${visible ? 'in' : ''}`}>
          <div className="buyback-copy">
            <div className="eyebrow eyebrow-light"><span className="dot"></span> The whole pitch in one line</div>
            <h2 className="display dark">Buy your time back.<br/><span className="accent">Close more deals.</span></h2>
            <p className="subhead">
              The average sales agent spends <strong>60–70%</strong> of their week on admin work — texting follow-ups,
              updating the CRM, chasing no-shows, leaving voicemails. RevRa flips the ratio.
            </p>
            <ul className="buyback-list">
              <li><span className="dot accent-dot"></span>Get 2–3 extra selling hours back per day.</li>
              <li><span className="dot accent-dot"></span>Stop losing leads to slow follow-up — Emma replies in seconds.</li>
              <li><span className="dot accent-dot"></span>Stop missing after-hours opportunities — Emma works while you sleep.</li>
              <li><span className="dot accent-dot"></span>Stop guessing which leads to call first — Emma scores them for you.</li>
            </ul>
            <a href="#" className="btn btn-primary">Start Free — No Credit Card</a>
          </div>
          <div className="buyback-vis">
            <div className="hero-stat">
              <div className="hero-stat-num">{count.toFixed(1)}<span className="hero-stat-unit">hrs</span></div>
              <div className="hero-stat-label">of selling time, back in your day.</div>
            </div>
            <div className="stat-grid">
              {wins.map((w, i) => (
                <div className="stat-cell" key={i} style={{ transitionDelay: `${0.2 + i * 0.08}s` }}>
                  <div className="stat-cell-k">{w.k}</div>
                  <div className="stat-cell-l">{w.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── 5. Founder strip ───── */
function FounderStrip() {
  const [ref, visible] = useReveal();
  return (
    <section className="band band-dark band-founder" id="founder" ref={ref}>
      <div className="band-inner founder-inner">
        <div className={`founder-grid reveal ${visible ? 'in' : ''}`}>
          <div className="founder-portrait">
            <div className="portrait-frame">
              <div className="portrait-placeholder">
                <span className="portrait-mono">AVI · FOUNDER</span>
              </div>
              <div className="portrait-glow"></div>
            </div>
          </div>
          <div className="founder-copy">
            <div className="eyebrow"><span className="dot"></span> Built by a salesperson, for salespeople</div>
            <h2 className="display">The first Agentic CRM was built by someone who actually sold for a living.</h2>
            <p>
              Avi Javeri sold for a living before building this — including a stretch as a licensed insurance
              agent in all 50 states. He built RevRa because no CRM on the market actually understood how a
              sales agent's day works. So he built a new category instead — the Agentic CRM.
            </p>
            <div className="founder-cta">
              <a href="#" className="btn btn-primary">Talk to Avi</a>
              <a href="#" className="btn">Read the launch note</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── 6. Pricing ───── */
function Pricing() {
  const [ref, visible] = useReveal();
  return (
    <section className="band band-light band-pricing" id="pricing" ref={ref}>
      <div className="band-inner">
        <div className={`pricing-head reveal ${visible ? 'in' : ''}`}>
          <div className="eyebrow eyebrow-light"><span className="dot"></span> Simple. Transparent. AI Tokens, not credits.</div>
          <h2 className="display dark">Two plans. <span className="accent">Both</span> include Emma.</h2>
          <p className="subhead">No per-message charges. No A2P paperwork. Native iMessage on every plan.</p>
        </div>

        <div className="pricing-grid">
          <div className={`pricing-card reveal ${visible ? 'in' : ''}`} style={{transitionDelay: '0.15s'}}>
            <div className="pricing-name">Solo Agent</div>
            <div className="pricing-amount">
              <span className="dollar">$</span><span className="num">129</span><span className="per">/mo</span>
            </div>
            <p className="pricing-tag">For the closer running their own book.</p>
            <ul className="pricing-list">
              <li><span className="check">✓</span> Native iMessage · always free</li>
              <li><span className="check">✓</span> Unlimited SMS · we absorb A2P</li>
              <li><span className="check">✓</span> Emma on text · drafts &amp; replies in your voice</li>
              <li><span className="check">✓</span> 11-stage pipeline + vertical playbooks</li>
              <li><span className="check">✓</span> Lead scoring 0–100</li>
              <li><span className="check">✓</span> 2,500 AI Tokens / month</li>
              <li className="muted-li">— Emma voice (text only on this tier)</li>
            </ul>
            <a href="#" className="btn">Start Free</a>
          </div>

          <div className={`pricing-card featured reveal ${visible ? 'in' : ''}`} style={{transitionDelay: '0.25s'}}>
            <div className="pricing-ribbon">RECOMMENDED</div>
            <div className="pricing-name">Complete Access</div>
            <div className="pricing-amount">
              <span className="dollar">$</span><span className="num">249</span><span className="per">/mo</span>
            </div>
            <p className="pricing-tag">Emma calling cold leads at 9 PM. The full Agentic CRM.</p>
            <ul className="pricing-list">
              <li><span className="check">✓</span> Everything in Solo Agent</li>
              <li><span className="check">✓</span> <strong>Emma voice agent</strong> · inbound + outbound</li>
              <li><span className="check">✓</span> Audio Morning Briefing</li>
              <li><span className="check">✓</span> Auto-dialer + bulk campaigns</li>
              <li><span className="check">✓</span> Multi-seat with admin oversight</li>
              <li><span className="check">✓</span> Workflow automation</li>
              <li><span className="check">✓</span> 12,500 AI Tokens / month</li>
            </ul>
            <a href="#" className="btn btn-primary">Start Free — No Credit Card</a>
          </div>
        </div>

        <div className="pricing-foot">
          <strong>What's an AI Token?</strong> One transparent unit (≈ $0.01) that covers SMS, voice minutes,
          lead enrichment, and AI booking. iMessage is always free. Top up at the same rate. No carrier markups.
        </div>
      </div>
    </section>
  );
}

/* ───── 7. FAQ ───── */
function FAQSection() {
  const [ref, visible] = useReveal();
  const [open, setOpen] = useS(0);
  const items = [
    { q: 'What is an Agentic CRM?', a: 'Agentic CRM stands for Agentic CRM — a new category. Traditional CRMs are databases with reminders. An Agentic CRM works the lead for you: Emma scores leads, drafts follow-ups, calls cold leads while you sleep, books appointments, and updates the pipeline. RevRa is the first Agentic CRM.' },
    { q: 'Do I need A2P 10DLC approval to send messages?', a: 'No — Revra LLC absorbs the A2P registration on your behalf. Your cold outreach goes out under our compliance umbrella, so you skip the carrier paperwork entirely. You send the day you sign up.' },
    { q: 'Are there text message credits or per-message charges?', a: 'No traditional text credits. RevRa runs on AI Tokens — one transparent usage currency that covers SMS, voice, lead enrichment, and AI booking. iMessage is always free.' },
    { q: 'How does cold outreach work — do you send iMessage cold?', a: 'No. Cold outreach goes out via SMS or social DM. Once a lead engages, the conversation hands off to iMessage automatically — that\'s where Emma takes over. iMessage is for conversations, not initial cold outreach.' },
    { q: 'What industries does RevRa work for?', a: 'Any high-velocity sales team that closes on the phone or by appointment. RevRa has pre-built playbooks for insurance, real estate, mortgage, solar, med spa, financial advisors, fitness studios, and high-ticket coaches.' },
    { q: 'How is RevRa different from GoHighLevel?', a: 'Different category. GHL is a traditional CRM — a database with reminders. RevRa is the first Agentic CRM. Emma\'s voice agent is built in (GHL: third-party add-on). iMessage is native (GHL: not possible). Every channel is unlimited with no A2P. The 11-stage pipeline and vertical playbooks ship pre-built.' },
  ];
  return (
    <section className="band band-light band-faq" id="faq" ref={ref}>
      <div className="band-inner">
        <div className={`faq-head reveal ${visible ? 'in' : ''}`}>
          <div className="eyebrow eyebrow-light"><span className="dot"></span> Questions, answered</div>
          <h2 className="display dark">Everything else.</h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? 'open' : ''} reveal ${visible ? 'in' : ''}`}
              style={{transitionDelay: `${0.1 + i * 0.05}s`}}
            >
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  WhatIsACRM, ColdToCloseFunnel, DeathSection, BuyTimeBack,
  FounderStrip, Pricing, FAQSection,
});
