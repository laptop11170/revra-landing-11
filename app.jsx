/* app.jsx — Revra landing entry */

const { useState, useEffect, useRef } = React;

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('revra-theme') || 'dark';
  });
  const fieldRef = useRef(null);
  const canvasRef = useRef(null);

  // init particle field once
  useEffect(() => {
    if (!canvasRef.current) return;
    const field = new window.RevraParticles(canvasRef.current);
    fieldRef.current = field;
    field.setTheme(theme);

    // Per-section progress: drive sphere choreography off the actual sections,
    // not global scroll. Robust to layout / height changes.
    const smooth = (a, b, t) => {
      if (t <= a) return 0;
      if (t >= b) return 1;
      const x = (t - a) / (b - a);
      return x * x * (3 - 2 * x);
    };
    const sectionProgress = (el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      if (total <= 0) return r.top < 0 ? 1 : 0;
      const scrolled = -r.top;
      return Math.max(0, Math.min(1, scrolled / total));
    };
    const onScroll = () => {
      const orbit2 = document.querySelector('#orbit-2');
      const activate = document.querySelector('.activate-phase');
      const merge = document.querySelector('.merge-phase');
      const features = document.querySelector('.features');

      const op = sectionProgress(orbit2);
      const ap = sectionProgress(activate);
      const mp = sectionProgress(merge);
      const fp = sectionProgress(features);

      // CHOREOGRAPHY (per-section scroll, gradual wave-based spread):
      //   ap 0.00–0.32 — sphere visibly EXPLODES outward as a wave (no UI yet)
      //   ap 0.32–0.65 — fully dispersed; live-workflow + channel nodes shown
      //   ap 0.65–0.92 — particles visibly RECOMBINE into the sphere (UI fades out first)
      const dispersed = smooth(0.02, 0.32, ap) * (1 - smooth(0.65, 0.92, ap));
      const explode = dispersed;
      const reformed = smooth(0.85, 0.98, ap);

      // Merge section:
      //   mp 0.00-0.10 hold · 0.10-0.45 second sphere approaches
      //   0.40-0.62 collide & blend · 0.62-1.00 merged hold
      let secondVisible = smooth(0.05, 0.25, mp) * (1 - smooth(0.78, 0.95, mp));
      let secondApproach = smooth(0.05, 0.50, mp);
      let mergeAmt = smooth(0.40, 0.62, mp);
      if (mp >= 1) { mergeAmt = 1; secondVisible = 0; }

      // Sphere fades as features section enters
      const fade = 1 - smooth(0.0, 0.15, fp);

      field.setPhases({
        explode, dispersed, reformed,
        secondVisible, secondApproach, merge: mergeAmt,
        fade,
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // theme propagation
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('revra-theme', theme);
    if (fieldRef.current) fieldRef.current.setTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Global lightweight parallax for elements with data-parallax="<factor>"
  useEffect(() => {
    let ticking = false;
    const apply = () => {
      const y = window.scrollY;
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const f = parseFloat(el.dataset.parallax) || 0;
        el.style.transform = `translate3d(0, ${(-y * f).toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(apply); ticking = true; }
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="bg-grid" data-parallax="0.15"></div>
      <canvas ref={canvasRef} className="particle-canvas" id="particle-canvas"></canvas>

      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <main className="page">
        <Hero />

        <OrbitSection
          id="orbit-1"
          copy={{
            tag: "Always on",
            title: "Always at the center.",
            body: "Emma sits at the heart of your revenue stack — listening, learning, and moving deals forward across every surface your team touches.",
          }}
          side="left"
          cards={[
            { kind: 'metric', label: 'Pipeline velocity', value: '+47%', delta: 'vs last quarter', style: { top: '14%', right: '6%' } },
            { kind: 'metric', label: 'Calls handled · 24h', value: '1,284', foot: '92% resolved without human', style: { top: '46%', right: '8%' } },
            { kind: 'transcript', lines: [
              { who: 'Lead:', text: '"What\'s the pricing for 30 seats?"' },
              { who: 'Emma:', text: '"$24/seat. I\'ll send the breakdown — and pencil in a Tue 10:30 demo if it helps."' },
            ], style: { bottom: '8%', right: '14%' } },
          ]}
        />

        <OrbitSection
          id="orbit-2"
          copy={{
            tag: "Context, not ticket",
            title: "She holds every thread.",
            body: "Memory is per-lead, not per-channel. A SMS from yesterday, a voice call last week, a comment on Instagram last month — Emma weaves them into one coherent relationship.",
          }}
          side="right"
          cards={[
            { kind: 'metric', label: 'Avg. context window', value: '3.2 yrs', foot: 'across every touch', style: { top: '14%', left: '6%' } },
            { kind: 'transcript', lines: [
              { who: 'Lead:', text: '"Following up from last quarter."' },
              { who: 'Emma:', text: '"Of course — you wanted multi-region SSO. We shipped it in March. Want a walkthrough?"' },
            ], style: { top: '46%', left: '8%' } },
            { kind: 'metric', label: 'Channels unified', value: '10+', foot: 'per lead, no glue code', style: { bottom: '8%', left: '14%' } },
          ]}
        />

        <ActivatePhase />

        <ActivateTail />

        <MergePhase />

        <WhatIsACRM />

        <ColdToCloseFunnel />

        <DeathSection />

        <BuyTimeBack />

        <FeaturesSection />

        <FounderStrip />

        <Pricing />

        <FAQSection />

        <FinalCTA />
      </main>

      <style>{`
        @keyframes floatY0 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes floatY1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes floatY2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes dashflow {
          to { stroke-dashoffset: -16; }
        }
      `}</style>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
