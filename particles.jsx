/* particles.jsx — Emma's particle field
 * Dust-fine particles, two spheres (Emma indigo + Agentic cyan).
 * Color identity is PRESERVED through the merge — you can clearly see
 * Emma's indigo particles intermixed with cyan particles in the merged sphere.
 *
 * Phases passed in via setPhases({ explode, dispersed, secondVisible, secondApproach, merge, fade }).
 */

(function() {
  'use strict';

  const TAU = Math.PI * 2;
  const SPHERE_COUNT = 3200;   // more, finer
  const SECOND_COUNT = 1900;
  const DUST_BASE = 0.18;      // dust-fine particles
  const DUST_DEPTH = 0.55;

  function fibonacciSphere(n, seed = 0) {
    const pts = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i + seed;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      pts.push({ x, y, z });
    }
    return pts;
  }

  function smooth(a, b, t) {
    if (t <= a) return 0;
    if (t >= b) return 1;
    const x = (t - a) / (b - a);
    return x * x * (3 - 2 * x);
  }
  // ease-in-out cubic
  function easeInOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function hex(h) {
    const v = h.replace('#', '');
    return {
      r: parseInt(v.substring(0, 2), 16),
      g: parseInt(v.substring(2, 4), 16),
      b: parseInt(v.substring(4, 6), 16),
    };
  }
  function lerpRgb(a, b, t) {
    return {
      r: Math.round(lerp(a.r, b.r, t)),
      g: Math.round(lerp(a.g, b.g, t)),
      b: Math.round(lerp(a.b, b.b, t)),
    };
  }
  const rgbStr = (c, a) => `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;

  class ParticleField {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = 0; this.h = 0;
      this.theme = 'dark';
      this.time = 0;
      this.phases = {
        explode: 0, dispersed: 0, reformed: 0,
        secondVisible: 0, secondApproach: 0, merge: 0,
        fade: 1,
      };

      this.basePoints = fibonacciSphere(SPHERE_COUNT, 0);
      this.basePointsB = fibonacciSphere(SECOND_COUNT, 0.7);

      // Per-particle randomized explosion targets (in normalized -1..1 range).
      // Trails: each particle remembers its prev position for short-tailed motion blur.
      this.explodeTargets = this.basePoints.map((p, i) => {
        // Wide reach so the spread visibly fills the viewport (no tiny halo).
        const r = 1.4 + Math.random() * 2.0;
        const angle = Math.random() * TAU;
        const yJitter = (Math.random() - 0.5) * 2.4;
        return {
          x: Math.cos(angle) * r,
          y: yJitter,
          z: Math.sin(angle) * r,
          size: 0.6 + Math.random() * 1.6,
          wob: Math.random() * TAU,
          // Per-particle wave delay 0..0.45 — sphere unwraps in waves
          delay: (i / SPHERE_COUNT) * 0.45,
        };
      });

      this.colors = {
        // Brand Indigo per spec
        emma:     hex('5b2eff'),
        emmaSoft: hex('9578ff'),
        emmaCore: hex('e0d5ff'),
        // Cyan accent per spec
        agent:     hex('3dd9ff'),
        agentSoft: hex('7ee8ff'),
        agentCore: hex('d5f5ff'),
      };

      // Pre-computed color signatures so each particle has its own subtle color variation
      // (slightly randomized within the brand range — feels more alive).
      this.emmaTints = this.basePoints.map(() => Math.random());
      this.agentTints = this.basePointsB.map(() => Math.random());

      this.resize = this.resize.bind(this);
      this.tick = this.tick.bind(this);
      window.addEventListener('resize', this.resize);
      this.resize();
      requestAnimationFrame(this.tick);
    }

    setTheme(t) { this.theme = t; }
    setProgress() { /* legacy noop */ }
    setPhases(ph) { this.phases = { ...this.phases, ...ph }; }

    resize() {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.canvas.width = this.w * this.dpr;
      this.canvas.height = this.h * this.dpr;
      this.canvas.style.width = this.w + 'px';
      this.canvas.style.height = this.h + 'px';
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    project(point, scale, ox, oy, rotY, rotX) {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      let x = point.x * cosY - point.z * sinY;
      let z = point.x * sinY + point.z * cosY;
      let y = point.y * cosX - z * sinX;
      z = point.y * sinX + z * cosX;
      const persp = 1 / (1 - z * 0.32);
      const sx = ox + x * scale * persp;
      const sy = oy + y * scale * persp;
      const depth = (z + 1) * 0.5;
      return { x: sx, y: sy, depth, persp };
    }

    drawHaloGlow(ox, oy, radius, color, intensity) {
      const ctx = this.ctx;
      const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
      grad.addColorStop(0, rgbStr(color, 0.28 * intensity));
      grad.addColorStop(0.4, rgbStr(color, 0.10 * intensity));
      grad.addColorStop(1, rgbStr(color, 0));
      ctx.fillStyle = grad;
      ctx.fillRect(ox - radius, oy - radius, radius * 2, radius * 2);
    }

    /* Draw a particle set centered at (cx, cy), with controllable explosion factor.
     * dispersed: 0 = fully sphere, 1 = scattered to explodeTargets (full screen)
     * Each particle's color comes from getColor(i, depth) so we can keep
     * dual-color identity through the merge.
     */
    drawParticleSet(points, targets, tints, baseRadius, cx, cy, rotY, rotX, dispersed,
                    color1, color2, alphaMul, sizeMul, spreadW, spreadH) {
      const ctx = this.ctx;
      const useDispersed = dispersed > 0.001;
      const drawList = [];

      for (let i = 0; i < points.length; i++) {
        const sp = this.project(points[i], baseRadius, cx, cy, rotY, rotX);
        let x = sp.x, y = sp.y;

        if (useDispersed) {
          const t = targets[i];
          // Wave-based explosion: each particle has a per-id `delay` (0..0.45).
          // It only starts moving once `dispersed` exceeds its delay, then eases
          // over a 0.55 window. The viewer sees a clear wave outward — not a snap.
          const delay = t.delay || 0;
          const ef = easeInOut(Math.max(0, Math.min(1, (dispersed - delay) / 0.55)));
          const wob  = Math.sin(this.time * 0.0011 + t.wob) * (10 + ef * 24);
          const wob2 = Math.cos(this.time * 0.0009 + t.wob * 1.3) * (10 + ef * 24);
          const tx = cx + t.x * spreadW * 0.42 + wob;
          const ty = cy + t.y * spreadH * 0.40 + wob2;
          x = lerp(sp.x, tx, ef);
          y = lerp(sp.y, ty, ef);
        }

        drawList.push({ x, y, depth: sp.depth, idx: i });
      }

      // depth sort back-to-front so front particles paint over
      drawList.sort((a, b) => a.depth - b.depth);

      for (const p of drawList) {
        const d = p.depth;
        // tint variation (each particle subtly different along the color axis)
        const tintShift = (tints[p.idx] - 0.5) * 0.3;
        const t = Math.max(0, Math.min(1, d + tintShift));
        const c = lerpRgb(color1, color2, t);
        // Front particles brighter, back particles dim — but for dust look keep alpha modest
        // Brighter dust so spread reads clearly even when particles are far apart
        const a = (0.18 + d * 0.65) * alphaMul;
        const r = (DUST_BASE + d * DUST_DEPTH) * sizeMul;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, TAU);
        ctx.fillStyle = rgbStr(c, a);
        ctx.fill();
        if (d > 0.7 && r > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 0.55, 0, TAU);
          ctx.fillStyle = rgbStr({ r: 255, g: 255, b: 255 }, a * 0.45);
          ctx.fill();
        }
      }
    }

    tick(now) {
      this.time = now || 0;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);

      const state = this.phases;
      if (state.fade <= 0.001) {
        requestAnimationFrame(this.tick);
        return;
      }

      const cx = this.w / 2;
      const cy = this.h / 2;
      const baseRadius = Math.min(this.w, this.h) * 0.18;

      ctx.globalCompositeOperation = 'lighter';

      const rotY = this.time * 0.00018;
      const rotX = Math.sin(this.time * 0.00022) * 0.15;

      // ─── EMMA SPHERE ───
      const emmaAlpha = state.fade;
      // Sphere grows during merge (absorbing the second sphere's particles)
      const emmaRadius = baseRadius * (1 + state.merge * 0.35);

      // Halo
      if (emmaAlpha > 0.05 && state.dispersed < 0.95) {
        const haloIntensity = emmaAlpha * (1 - state.dispersed * 0.7);
        this.drawHaloGlow(cx, cy, emmaRadius * 2.4, this.colors.emmaSoft, haloIntensity * 0.8);
      }
      // Halo tint shifts during merge to include cyan
      if (state.merge > 0.05) {
        this.drawHaloGlow(cx, cy, emmaRadius * 2.0, this.colors.agentSoft, state.merge * 0.5);
      }

      // Emma's particles
      this.drawParticleSet(
        this.basePoints,
        this.explodeTargets,
        this.emmaTints,
        emmaRadius,
        cx, cy, rotY, rotX,
        state.dispersed,
        this.colors.emma, this.colors.emmaCore,
        emmaAlpha,
        1 + state.merge * 0.12,
        this.w, this.h
      );

      // ─── SECOND (AGENTIC CYAN) SPHERE ───
      // Two distinct visual lifecycles:
      //  (a) Approach (secondApproach 0→1): sphere flies in from offscreen right,
      //      orbits Emma, draws beam.
      //  (b) Merge (merge 0→1): second sphere center lerps to Emma's center,
      //      shrinks into Emma, BUT its particles persist inside Emma's sphere
      //      so the user sees both colors mixed. After merge=1, second-sphere
      //      particles permanently render inside Emma's sphere with cyan tint.
      const showSecond = state.secondVisible > 0.01 || state.merge > 0.01;
      if (showSecond) {
        // Position: starts off-right, orbits, then approaches center
        const ax = state.secondApproach;
        // Off-right path that swings down and into center
        const orbitAngle = ax * Math.PI * 1.2;
        const dist = (1 - ax) * Math.min(this.w, this.h) * 0.42;
        const offX = dist * Math.cos(orbitAngle - Math.PI * 0.15);
        const offY = dist * Math.sin(orbitAngle - Math.PI * 0.15) * 0.6;

        // During merge, lerp center toward Emma
        const mLerp = state.merge;
        const sx = cx + offX * (1 - mLerp);
        const sy = cy + offY * (1 - mLerp);

        // Radius: starts small during approach, then EXPANDS to match Emma's volume
        // during merge — so cyan particles redistribute throughout the merged sphere's
        // full volume instead of forming a smaller core inside it. This is what makes
        // the mixture visibly clear: ~3200 violet + ~1900 cyan particles sharing the
        // same volume, intermixed.
        const approachRadius = baseRadius * 0.55;
        const sRadius = lerp(approachRadius, emmaRadius * 1.02, state.merge);

        // Alpha: visible during approach. After merge, alpha STAYS so cyan particles
        // remain inside Emma's sphere — color identity preserved.
        const sAlpha = Math.max(state.secondVisible, state.merge * 0.95) * state.fade;

        // Halo for the second sphere — fades as it merges into Emma's halo
        if (state.merge < 0.85 && state.secondVisible > 0.1) {
          this.drawHaloGlow(sx, sy, sRadius * 2.4, this.colors.agentSoft, state.secondVisible * (1 - state.merge) * 0.7);
        }

        // Connection beam during orbit phase
        if (state.merge < 0.6 && state.secondVisible > 0.2) {
          const beamA = state.secondVisible * (1 - state.merge * 1.5) * state.fade;
          if (beamA > 0.02) {
            const grad = ctx.createLinearGradient(cx, cy, sx, sy);
            grad.addColorStop(0, rgbStr(this.colors.emmaSoft, beamA * 0.5));
            grad.addColorStop(0.5, rgbStr(lerpRgb(this.colors.emmaSoft, this.colors.agentSoft, 0.5), beamA * 0.4));
            grad.addColorStop(1, rgbStr(this.colors.agentSoft, beamA * 0.5));
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.2;
            ctx.setLineDash([2, 5]);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(sx, sy);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        // Draw the second sphere's particles. After full merge they keep their cyan tint
        // — this is the "visibly mixed" part the brief asked for.
        this.drawParticleSet(
          this.basePointsB,
          [],
          this.agentTints,
          sRadius,
          sx, sy,
          rotY * 1.4, -rotX * 1.6,
          0,  // never disperses with the explosion choreography
          this.colors.agent, this.colors.agentCore,
          sAlpha,
          0.95,
          this.w, this.h
        );
      }

      requestAnimationFrame(this.tick);
    }
  }

  window.RevraParticles = ParticleField;
})();
