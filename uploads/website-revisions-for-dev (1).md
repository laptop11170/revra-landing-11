# RevRa Website Revisions — Developer Spec

**Audience:** Web dev (and any AI tooling assisting them) **Goal:** Sharpen positioning, kill weak copy, add new homepage sections, build a /vs-gohighlevel page, and align the site visually with the brand kit. Pricing recommendations are at the bottom of this doc. **Source:** Audit of [www.letsrevra.com](http://www.letsrevra.com) (homepage), April 2026\.

This document is structured as **OLD COPY → NEW COPY** so a developer (or AI dev tool) can drop replacements in directly. Where a section is new, it's marked **NEW SECTION** with full content provided.

---

## 0a. Brand & visual direction — read first

The brand kit (uploaded by Avi) consists of the **REVRA** wordmark in two finishes: electric indigo on white, and white on black. The wordmark itself has a custom-cut, geometric, slightly futuristic character — the R/V/A letterforms have arch and circuit motifs that should inspire the rest of the visual system.

### Color system

| Token | Hex (verify with designer) | Usage |
| :---- | :---- | :---- |
| **Brand Indigo** | `#5B2EFF` (approx — confirm with brand source files) | Logo color. Use for primary CTAs, key headlines (sparingly), accent links, and the A-CRM eyebrow tag. |
| **Brand Indigo Soft** | `#7B5BFF` (10–20% lighter) | Hover states, secondary accents. |
| **Brand Indigo Glow** | `#5B2EFF` at 12–20% opacity | Background gradients, soft glows behind hero text, ambient color in the dark hero section. |
| **Ink** | `#0A0A14` | Primary dark background (hero, "What is an A-CRM?", "What Dies When You Switch"). Near-black with a slight indigo undertone — pairs cleanly with the brand purple. |
| **Surface Dark** | `#15151F` | Card backgrounds on dark sections. |
| **Surface Light** | `#FFFFFF` | Light-mode sections (Pricing, How It Works, FAQ). |
| **Text Primary (dark mode)** | `#F5F5FA` | Body text on dark backgrounds. |
| **Text Primary (light mode)** | `#0A0A14` | Body text on light backgrounds. |
| **Text Muted** | `#8A8A9A` | Subheads, captions, table rows. |
| **Coral / "Death" accent** | `#FF4D5E` or `#FF5447` | Use **only** for the "Death to..." card titles in section 5\. Creates a punch against brand indigo without competing with it. |
| **Cyan / "Live" accent** | `#3DD9FF` | Use **only** for status pills like "System Online," "Live," lead-score "hot" indicators. |

**Critical color rules:**

- **Do NOT use the brand indigo as a section background.** Saturated purple backgrounds make the site read as Twitch/Discord/web-3 — the wrong category. The brand indigo lives on text, CTAs, accent strokes, and soft glows. Backgrounds stay **Ink** (dark) or **white** (light).  
- **Two accent colors maximum** beyond brand indigo: coral and cyan. No more. Restraint signals premium.  
- **Lead-score gradient** (used in lead scoring visuals): **Brand Indigo → Cyan → Coral** as score rises 0 → 50 → 100\. This makes the score visualization feel like a product detail, not a generic dashboard chart.

### Theme strategy — alternating dark/light bands

The website should alternate dark and light section bands for visual rhythm. Recommended order:

1. **Hero** — Ink (dark) with subtle Brand Indigo Glow behind the H1. This is where the site lives or dies; lean premium-tech-dark.  
2. **What is an A-CRM?** (new section 1.5) — Ink (dark). Reinforces the "this is a different category" feeling.  
3. **Why RevRa** (3 pillars) — Surface Light (white). Breathing room after two dark sections.  
4. **How It Works** — Ink (dark). The 3-step flow looks more cinematic on dark.  
5. **AI Core Features** — Surface Light (white).  
6. **What Dies When You Switch** — Ink (dark) with coral accent typography on each card. The contrast carries the "death" wordplay visually.  
7. **Buy Your Time Back** — Surface Light (white).  
8. **Eight Things Only an A-CRM Can Do** — Ink (dark).  
9. **Testimonials** — Surface Light (white).  
10. **Pricing** — Surface Light (white).  
11. **FAQ** — Surface Light (white).  
12. **Founder strip \+ final CTA** — Ink (dark).  
13. **Footer** — Ink (dark).

This pattern gives the site a sense of pacing — the dark sections feel like statements, the light sections feel like documentation. It also means the brand indigo always pops, because it lives against contrasting backgrounds throughout.

### Typography

The wordmark is custom; you can't (and shouldn't) replicate its exact letterforms in body text. Pair it with a clean modern geometric sans:

- **Recommended primary:** **Geist** (by Vercel) or **Inter** — both are free, open-source, and feel like the right era for an "agentic, next-gen" brand.  
- **Alternative if you want more personality:** **General Sans** or **Manrope** — slightly warmer, slightly more character.  
- **Avoid:** Roboto, Open Sans, Lato — they read as generic SaaS and will fight the premium signal the wordmark is sending.  
- **For accent / numerical displays** (lead score, pricing, big numbers): use the same primary at heavy weight (700–900). No secondary display font needed.

Type scale:

- H1 (hero): 60–72px desktop, 40px mobile, weight 700  
- H2 (section headers): 40–48px desktop, 32px mobile, weight 700  
- H3 (card titles): 22–24px, weight 600  
- Body: 16–18px, weight 400  
- Captions / muted: 14px, weight 400

### Visual motifs (from the wordmark)

The R, V, and A in the logo all have an arch / circuit-trace character. The site can borrow this vocabulary in:

- **Section dividers** — instead of flat horizontal lines between sections, use a thin Brand Indigo arc or curved divider that echoes the letterform character.  
- **Card corners** — keep cards slightly rounded (8–12px radius), not hard-cornered, not pill-rounded. Matches the wordmark's geometry.  
- **Hero background** — a very subtle, low-opacity wave or arc pattern in Brand Indigo, behind the headline. Don't overdo it; aim for an ambient suggestion of "circuit/agent flow," not a busy graphic.  
- **Icons** — use a thin-line icon set (Lucide, Phosphor, or Heroicons outlined). Stroke weight 1.5–2px. Color them in Brand Indigo on light backgrounds, Text Primary on dark backgrounds. **Drop the emoji icons** currently used on the homepage for "Dialer / SMS / Email / Pipeline / Calendar" — emoji icons make the site read as low-effort. Replace with proper line icons.

### Aesthetic comparables (for the dev to reference)

If your dev wants to see what "right" looks like for this brand direction:

- **linear.app** — dark theme, electric purple accents, cinematic hero — closest aesthetic cousin to where RevRa should land.  
- **vercel.com** — pure black/white restraint, premium type. Use for typography and spacing inspiration.  
- **stripe.com** — light-mode product sections with soft purple gradients. Use for the light-mode sections.  
- **clerk.com** — purple brand \+ dark hero done well, with good information density.

Avoid as references: HubSpot (too corporate), GoHighLevel (intentionally — RevRa is positioning itself as the next category), Salesforce (dated).

### Logo placement

- Top-left of the nav bar — use the **white-on-black** version on dark sections, **indigo-on-white** on light sections. Switch dynamically as the user scrolls between bands.  
- Footer — bottom-left, **white-on-black** at \~50% opacity (since footer is dark).  
- Favicon and app icon — pull just the "R" character from the wordmark, on Ink background, in Brand Indigo.

### What to ask the brand designer for (deliverables not in the current kit)

Avi: when you have time, ask whoever made the logo to send back:

- **Exact hex / Pantone / CMYK** values for the brand indigo (the kit shipped only the .ai, .eps, .pdf — verify the swatch instead of guessing).  
- **Logo "R" mark** as a standalone (favicon \+ social avatar use).  
- **Type system spec** if they have one — otherwise the dev can use the recommendation above.  
- **Logo clear-space and minimum-size rules** so the dev doesn't accidentally crowd or shrink it past readability.

---

## 0\. Brand voice rules — read first

These rules apply to every word on the site. If anything below is unclear, default to these:

**Words to use:**

- **"A-CRM" / "Agentic CRM" / "a new category"** — this is the most important phrase on the site. RevRa is not "an AI CRM" or "an AI-native CRM." RevRa is an **A-CRM (Agentic CRM)** — a new category of software. Always introduce it as `A-CRM (Agentic CRM)` on first mention on any given page so the term reads as a defined category, not a tagline. Then use "A-CRM" alone after that. Examples: *"The first A-CRM."* *"Welcome to the A-CRM era."* *"Old CRMs are databases with reminders. A-CRMs are agents that do the work for you."*  
- **"Emma — Your AI Sales Executive"** — locked title. Always "AI Sales Executive," never "AI Agent," "AI Assistant," "AI EA," "AI SDR," or "AI Voice Agent" as her title. (Inside body copy you can describe what she does — "your AI sales executive who calls leads" — but the title itself is fixed.)  
- **"AI Tokens"** — RevRa's branded usage currency. Used for SMS, voice, lead enrichment, and AI booking. iMessage is free. Always say "AI Tokens" with capitals; never "credits," never "minutes," never "message packs."  
- "Agentic" — Emma is an agent, not a chatbot, not a script, not "automation."  
- "Native iMessage" — this is the wedge. Use it constantly. Pair it with "Up to 5× reply rate vs SMS."  
- "Buy your time back," "time back," "more selling time" — every section should ladder back to this.  
- "Sales agents," "sales teams," "agencies," "closers" — RevRa is for any team that sells on the phone, books appointments, and follows up at scale. Keep the language vertical-agnostic.

**Statistical claim that should appear in the hero or a trust strip (locked, third-party validated):**

**Up to 5× more replies on iMessage than SMS** (30–45% iMessage vs 5–10% SMS) Cleared via Sendblue's industry data. Whenever this stat appears, **always pair it with the SMS-fallback line** so it's clear we send via SMS when iMessage isn't available. Example: *"Up to 5× more replies on iMessage than SMS — and we fall back to SMS automatically when a lead isn't on iMessage."*

**Emma visual representation rule (do not violate):** Emma is **voice-only**. Do **not** render Emma with a portrait, avatar, character illustration, or human likeness anywhere on the site. Visualize Emma as: an **indigo orb**, a **soft glow**, or **particle effects** in Brand Indigo. The hero "Hear Emma in Action" play button can sit on an animated orb. Voice waveforms are fine. A face is not.

**Category creation rule (read this carefully):** The strategic move with "A-CRM" is **category creation**, not product description. We're not saying "RevRa is a better CRM." We're saying "RevRa is the first product in a new category called A-CRM." This means:

- Always position RevRa as **the first A-CRM**, not "an AI-powered CRM."  
- Frame competitors (GoHighLevel, HubSpot, Salesforce, Close, etc.) as **traditional CRMs** — a previous-generation category. Not bad products, just a previous era.  
- The implicit claim is: *"Choosing a traditional CRM in 2026 is like choosing on-prem when SaaS exists."* Don't say it that bluntly, but every comparison should ladder up to that feeling.  
- "A-CRM" should be repeated frequently enough that buyers start using the term unprompted. That's how categories get created.

**Vertical positioning note (important):** RevRa is a multi-vertical CRM. It works for insurance, real estate, mortgage, solar, medical/med spa, financial advisors, fitness, high-ticket coaches, and any consultative B2C/B2B sales team that closes on the phone. Insurance is one supported vertical (and is the founder's domain expertise), but **insurance is not the brand**. Do not position the company as "insurance-only" anywhere in the primary nav, hero, or feature copy. Insurance can appear as: (a) one example vertical in lists, (b) one of several testimonial verticals, (c) one of several pre-built playbooks. That's it.

**Words and phrases to remove from the site entirely:**

- "Appointment setting" as a service the agent does. Reframe: appointments are **set for you** by Emma. The agent does not do appointment setting; Emma does.  
- "A2P," "10DLC registration," "carrier approval" — only mention these to call out that RevRa **doesn't need them**. We bypass A2P because iMessage is primary, SMS is fallback, WhatsApp is native.  
- "Text credits," "message credits," "per-message pricing," "usage-based SMS" — these don't exist on RevRa. Every messaging channel is unlimited. Make this loud.  
- "High-velocity" — meaningless filler.  
- "3-Second Operating System" — kill this phrase. It's never explained.  
- "Zero overhead" — vague.  
- "Automate" / "automates" — replace with "agentic" or specific verbs (calls, drafts, books, briefs).

**The core message in one sentence (use this wherever you can):**

RevRa is the first A-CRM (Agentic CRM) — a new category of CRM where the AI doesn't just assist your sales team, it *is* a member of your sales team. Emma calls your leads, drafts your texts, and books your appointments while you focus on closing.

**The differentiation rule (apply on every page):** Every feature description should answer the silent buyer question: *"Can I do this in GoHighLevel?"* Whenever the answer is **no**, surface it. Examples:

- iMessage → "GoHighLevel cannot send iMessage. We can."  
- AI voice agent → "Built in. Not a third-party add-on."  
- Unlimited messaging → "No text credits. No A2P. Ever."  
- Pre-built sales pipeline → "Day-one usable. Not a blank board."  
- Talk to founder → "One click. Not a support ticket queue."

Never name GoHighLevel in copy on the homepage (it's a free brand mention for them) — but every line should be engineered so a buyer comparing the two sees the gap. The /vs-gohighlevel page is where you name them directly.

---

## 1\. Hero section

### OLD COPY

System Online The 3-Second Operating System for Your Sales Team AI-native CRM that automates lead management, unified communications, and daily briefings so you can close more deals with zero overhead.

\[Experience RevRa: Free Trial\] \[See How It Works\]

### NEW COPY

A new category. Introducing the A-CRM.

**RevRa is the first A-CRM (Agentic CRM) — built for sales agents.**

Old CRMs are databases with reminders. A-CRMs are agents that do the work for you. Meet **Emma — Your AI Sales Executive**. She calls leads, drafts texts, and books appointments for you. So you can spend your day selling, not setting appointments or chasing admin.

Cold outreach starts on SMS. Conversations live on iMessage — where reply rates are **up to 5× higher**. Emma takes over from there.

\[Start Free — No Credit Card\] \[Hear Emma in Action\]

**Dev note on the headline:**

- **Eyebrow line ("A new category. Introducing the A-CRM.")** should be a small, all-caps or accent-colored line *above* the H1, like a category tag. This is the framing that signals to the buyer "you're looking at something new."  
- The H1 itself is "RevRa is the first A-CRM (Agentic CRM) — built for sales agents." The double meaning on "agents" is intentional: RevRa is *for* sales agents, and includes Emma, an *AI Sales Executive*. Don't replace "Sales Agents" with "Sales Teams" or "Sales Reps" — keep the word "Agents."  
- Replace the "System Online" badge with the eyebrow line above. The category framing is more valuable than the system-status flavor.  
- **Below the CTAs**, render a thin trust strip with these four pills: *"Up to 5× reply rate on iMessage"* · *"Emma calls 24/7"* · *"We handle A2P registration"* · *"Compliance under Revra LLC"*. This communicates the funnel architecture in one glance — and replaces the "no A2P, no credits" line that was in the previous draft, which was technically inaccurate (we DO use A2P, we just absorb it on Revra LLC's registration).

**Dev notes:**

- Replace "Experience RevRa: Free Trial" CTA with **"Start Free — No Credit Card"** (clearer \+ removes friction).  
- Replace "See How It Works" CTA with **"Hear Emma in Action"** that opens an inline modal with a 30–60 second audio clip of Emma qualifying a lead. If the audio clip isn't ready yet, link to a 60–90s product video instead, but the audio version is the eventual goal — Emma is a voice agent, the site needs to *let users hear her*.  
- The "System Online" badge is fine, keep it.  
- Below the CTAs, add a thin trust strip: **"Native iMessage · Unlimited SMS · Unlimited WhatsApp · No A2P approval needed"** as small text/icons. This single line communicates 4 differentiators in one glance.

---

## 1.5 NEW SECTION — "What is an A-CRM?"

Insert this section **directly below the hero** and **above** the "Why RevRa" pillars. This is the section that establishes the new category. It should be the most visually distinct band on the page — different background color, larger type — so it reads as a manifesto, not a feature.

### Full section content

**What is an A-CRM?**

A-CRM stands for **Agentic CRM**. It's a new category of CRM where the AI doesn't just *assist* your sales team — the AI *is* a member of your sales team.

Traditional CRMs are databases with reminders. You log the lead. You set the follow-up. You write the text. You make the call. You update the stage. The CRM watches.

An A-CRM works the lead for you. It scores the lead. It drafts the follow-up. It calls when you're sleeping. It books the appointment. It updates the stage. You walk in and close.

RevRa is the first A-CRM.

### Side-by-side band beneath that copy

Render this as a two-column "Old CRM vs A-CRM" visual block:

| Old CRM | A-CRM |
| :---- | :---- |
| Database with reminders | An agent that does the work |
| You write every follow-up | Emma drafts them in your voice |
| You score leads in your head | Lead scoring 0–100 the second a lead arrives |
| You call cold leads on your time | Emma calls them at 9 PM, while you sleep |
| You update the pipeline manually | Emma logs every call, every text, every stage |
| You start your day catching up | You start your day with a Morning Briefing — already caught up |
| You pay per text. You register for A2P. | Unlimited messaging. Native iMessage. No A2P. |

**Dev notes:**

- This section is the **single most important new addition to the homepage**. It establishes the category. Without it, "A-CRM" is just a clever tagline. With it, "A-CRM" is a thing buyers can repeat back to other people.  
- The two-column visual should be the dominant element. Title in oversized type ("Old CRM" struck through, "A-CRM" in accent color).  
- Add a soft CTA at the bottom of the section: *"Curious how an A-CRM actually runs your day? See how it works →"* (anchor-link to the How It Works section).

---

## 2\. "Why RevRa" section (the three principles)

### OLD HEADER

Built for how teams actually work Three foundational principles that drive every feature we build.

### NEW HEADER

**Three principles behind every A-CRM we ship.** Built to give sales agents their time back.

---

### Pillar 1

**OLD:**

AI Everywhere AI drafts your SMS, briefs you before calls, summarizes after, and generates your morning briefing, woven into every workflow.

**NEW:**

**Agentic by Default** Emma drafts your texts, briefs you before every call, summarizes after, and writes your morning report. You approve. She executes. You sell.

---

### Pillar 2

**OLD:**

All-in-One Workspace Dialer, SMS, email, pipeline, calendar, and AI unified in a single platform. No more juggling five different tools.

**NEW:**

**One Inbox. Every Channel.** Dialer, iMessage, SMS, WhatsApp, RCS, email, pipeline, and calendar in one place. No more flipping between five tabs to send one follow-up.

---

### Pillar 3

**OLD:**

Emma AI Voice Agent Let AI autonomously call your leads after hours, have natural conversations, and book appointments, all logged back into RevRa.

**NEW:**

**Emma — Your AI Sales Executive. 24/7.** Emma calls your leads after hours, has real conversations, and books appointments straight into your calendar. You wake up to a full day of qualified meetings.

---

### Pillar 4

**OLD:**

Collaborative Independence Agents work solo but can instantly share lead context with teammates. Admins get full oversight without being intrusive.

**NEW:**

**Agents Sell. Admins See Everything.** Each agent works their own pipeline. Managers get full visibility without micromanaging. Nobody loses time to status meetings or "just checking in" pings.

---

## 3\. "How It Works" section

### OLD HEADER

How It Works From lead to close in three steps AI-native CRM handles the entire sales lifecycle from the moment a lead enters to the deal closed.

### NEW HEADER

**From lead to closed policy — without the admin tax.** RevRa runs the lifecycle for you. You run the conversation that closes.

---

### Step 1

**OLD:**

Leads Arrive Automatically Leads pour in from Facebook Ads, manual entry, or CSV import. Our AI scores every lead instantly and routes it to the right agent via round-robin distribution.

**NEW:**

**1\. Leads arrive. Emma scores and routes them.** Leads pour in from Meta Ads, manual entry, or CSV import. Emma scores every lead 0–100 instantly and routes it to the right agent. No spreadsheets. No "who's got this one?"

---

### Step 2

**OLD:**

AI Arms You Before Every Call Before dialing, get an AI pre-call brief: talking points, anticipated objections, key questions, and coverage recommendations — all generated in seconds.

**NEW:**

**2\. Emma briefs you before you dial.** Open the lead. Emma's already written your pre-call brief: talking points, likely objections, budget range, and coverage recommendations. You walk into every call ready to close.

---

### Step 3

**OLD:**

Close More Policies Move leads through the 11-stage pipeline with AI-assisted follow-ups, auto-SMS sequences, and Emma AI voice agent for after-hours outreach.

**NEW:**

**3\. Emma follows up. You write more business.** Emma runs your follow-up sequences across iMessage, SMS, and WhatsApp. She calls cold leads after hours and books them straight into your calendar. The 11-stage pipeline keeps every deal moving — without you babysitting it.

---

## 4\. AI Core Features section

### OLD HEADER

AI Core Features Intelligence at every layer. AI-native CRM built for high-velocity sales teams. From lead scoring to autonomous voice agents.

### NEW HEADER

**Agentic at every layer. That's what makes it an A-CRM.** Built for the sales agent who wants to sell, not babysit a CRM.

---

### Lead Intelligence card

**OLD:**

0-100 Scoring Lead Intelligence Instantly process hundreds of data points to score leads with precision. Understand exact factor breakdowns before you ever make contact.

**NEW:**

**Agentic Lead Scoring (0–100)** Emma scores every lead the second it arrives — income, health, engagement, intent — so you call the hottest 20% first and stop wasting hours on tire-kickers.

---

### Morning Briefing card

**OLD:**

Morning Briefing Your automated daily briefing that reads itself to you while you commute.

**NEW:**

**Morning Briefing — Audio** Hit play in the car. Emma reads you your day: hot leads, scheduled calls, follow-ups due, and what closed overnight. You walk into the office already caught up.

---

### Emma central card

**OLD:**

Core AI Engine Emma AI Voice \+ Text The central intelligence powering your entire CRM. Emma processes natural language, generates responses, calls leads autonomously, and orchestrates all communication channels. This is the brain that makes everything work.

**NEW:**

**Meet Emma. The agent inside the CRM.** Emma is the agentic core of RevRa. She talks to leads on the phone, replies to texts in your voice, qualifies prospects, books appointments, and orchestrates every channel. You're not running automations. You're running an AI agent that runs your funnel.

---

### Unified Comms card

**OLD:**

Unified Communication Hub All your channels in one place. iMessages, SMS, RCS, WhatsApp, and Emma AI voice agent working together seamlessly. iMessages | SMS | RCS | WhatsApp | Emma AI

**NEW:**

**Cold on SMS. Conversations on iMessage. Emma in the middle.** Cold outreach goes out via SMS or social DM under Revra's compliance umbrella — you skip the A2P paperwork entirely. Once a lead engages, the conversation hands off to iMessage, where reply rates are up to 5× higher. Emma works the whole funnel — voice, text, and follow-up — on a unified AI Tokens currency. iMessage is free, always.

**Dev note:** This card needs visual emphasis. Add four pill-style badges underneath:

- "Free iMessage"  
- "Up to 5× reply rate"  
- "We handle A2P"  
- "AI Tokens — one usage currency"

---

## 5\. NEW SECTION — "What Dies When You Switch to RevRa"

Insert this new section directly **after** the "AI Core Features" section and **before** Testimonials. This crystallizes the differentiation in a way no competitor can match.

### Full section content

**What dies when you switch to the A-CRM.** Seven things you'll never do again.

**Death to traditional CRM admin.** No more logging every call, updating every stage, writing every follow-up. The A-CRM does the CRM work for you. You sell.

**Death to A2P paperwork.** No 10DLC registration. No carrier paperwork. No "your campaign was rejected." Revra LLC absorbs the A2P registration so you don't have to. You skip the queue. We send under our compliance umbrella.

**Death to per-message text credits.** No more "campaigns paused — out of SMS credits." Revra runs on **AI Tokens** — one transparent currency that covers SMS, voice, lead enrichment, and AI booking. iMessage is always free. One meter, no surprise carrier markups.

**Death to appointment setting.** Emma books your appointments. You don't "do appointment setting" anymore. You take the meeting, run the close, and move on.

**Death to admin work.** No CRM data entry. No manual follow-up. No "let me update the pipeline real quick." Emma drafts the texts, logs the calls, moves the stages. You sell.

**Death to dead leads.** Emma works your pipeline at 9 PM, on Saturdays, and on holidays. Cold leads don't go cold — they get a call from Emma until they answer.

**Death to five tabs.** One inbox. Every channel. Every lead. One screen.

**Dev notes:**

- Render the seven "Death to..." items as cards in a 4-3 or 3-4 grid (or 2x4 with one full-width hero card for "Death to traditional CRM admin," which is the category-defining one).  
- Keep the tone punchy. Do not soften the word "death" — it's the hook.  
- Each card title in bold red or accent color so it scans fast.  
- "Death to traditional CRM admin" should be visually weighted as the headline card — it's the one that lands the A-CRM vs traditional-CRM frame.

---

## 6\. NEW SECTION — "Buy your time back"

Insert this section directly **after** "What Dies When You Switch" and **before** Testimonials.

### Full section content

**Buy your time back. Close more deals.**

The average sales agent spends 60–70% of their week on admin work — texting follow-ups, updating the CRM, chasing no-shows, leaving voicemails. RevRa flips that ratio.

With Emma running your follow-up, your dialer, your texts, and your calendar:

- You get 2–3 extra selling hours back per day.  
- You stop losing leads to slow follow-up — Emma replies in seconds.  
- You stop missing after-hours opportunities — Emma works while you sleep.  
- You stop guessing which leads to call first — Emma scores them for you.

More selling time \= more closed deals. That's the whole pitch.

\[Start Free — No Credit Card\]

**Dev notes:**

- This is the strongest emotional pitch on the page. It connects every feature back to the agent's \#1 pain: "I don't have enough time to actually sell."  
- Add a stat-style visual: large number "2–3 hours" with caption "of selling time, back in your day."

---

## 6.25 NEW SECTION — "How RevRa runs your cold-to-close funnel"

Insert this section directly **after** "Buy Your Time Back" (section 6\) and **before** "Eight Things Only an A-CRM Can Do" (section 6.5). This is the section that makes the cold→iMessage→Emma→close architecture concrete. Without it, the product feels abstract.

### Full section content

**From cold lead to closed deal — the A-CRM way.**

Most CRMs throw your leads into a workflow and wish you luck. RevRa runs the whole funnel for you, channel by channel.

**Stage 1 — Cold outreach (SMS \+ social DM)** Your campaigns go out under Revra LLC's compliance umbrella. We handle the A2P registration. You skip the carrier paperwork. Cold copy is setter-safe by default — Emma never quotes pricing or recommends a specific plan in cold contact.

**Stage 2 — iMessage handoff (the magic moment)** The second a lead replies, the conversation moves from green bubble to blue. iMessage gets up to **5× more replies than SMS** because that's where your leads actually read. We fall back to SMS automatically if the lead isn't on iMessage.

**Stage 3 — Emma takes the conversation** Emma — Your AI Sales Executive — engages on iMessage. She qualifies, handles objections, and books the meeting straight into your calendar. She also calls. After hours, on weekends, in 47 timezones.

**Stage 4 — You close** Emma hands you a fully briefed appointment. You take the call. You close. She logs everything back into the pipeline.

### Visual recommendation (this is the most important visual on the site)

Build this as a **horizontal four-step flow** with channel icons and **a green-bubble-to-blue-bubble transition between Stage 1 and Stage 2**. The handoff moment is the single best visual story RevRa has. Render it like:

- **Stage 1:** Green SMS bubble (the universal "cold outreach" signal). Small label: "SMS / Social DM."  
- **Stage 2:** **Animated transition** — green bubble morphs/fades into a blue iMessage bubble. The 5× stat appears as a number ("5×") that grows as the bubble changes color.  
- **Stage 3:** Blue iMessage thread with Emma's indigo-orb avatar at the side. Small voice-call icon to indicate she's calling too.  
- **Stage 4:** A calendar invite card. Done.

Keep all four stages on the same horizontal track on desktop, stack vertically on mobile. The bubble color change is the hero animation — it should be the most memorable thing on the page.

**Dev notes:**

- The bubble morph from green → blue should be subtle but unmistakable. Lean into iOS-style bubble shapes for instant recognition.  
- Emma's orb at Stage 3 is the only Emma "visual" anywhere on the page. Indigo glow with subtle pulse animation (matched to the audio waveform if "Hear Emma in Action" is open). **Do not** put a face/portrait/character render on Emma anywhere on the site — she is voice-only.  
- This section answers the silent buyer question: *"Wait, how does this actually work?"* It needs to be unambiguous about the architecture.

---

## 6.5 NEW SECTION — "Eight things RevRa does that no other CRM does"

Insert this section directly **after** "Buy Your Time Back" (section 6\) and **before** Testimonials. This is the homepage version of the GHL comparison — surfaces the wedge to visitors who never click into /vs-gohighlevel. Frame it as RevRa-vs-the-world, not just GHL, but the list is engineered around capabilities GHL specifically lacks.

### Full section content

**Eight things only an A-CRM can do.**

Traditional CRMs were built ten years ago and bolted AI on later. RevRa is the first A-CRM — built around an agent (Emma) from day one. Here's what that gets you.

**1\. Native iMessage — blue bubble, no A2P.** RevRa sends from real iMessage on your dedicated number. No carrier registration. No 10DLC paperwork. Your texts land in the inbox where your leads actually read.

**2\. Unlimited messaging on every channel.** iMessage, SMS, WhatsApp, RCS — all unlimited. No per-message credits. No usage charges. No surprise bills.

**3\. Emma calls your cold leads at 9 PM.** Your AI Sales Executive doesn't sleep. She qualifies leads, handles objections, and books appointments while you're off the clock.

**4\. Emma writes your pre-call brief before you dial.** Talking points, likely objections, budget range, coverage recommendations — already on your screen the moment you open the lead.

**5\. Audio morning briefing.** Emma reads your day to you in the car. Hot leads, follow-ups due, what closed overnight. You walk in already caught up.

**6\. Lead scoring 0–100 the second a lead lands.** Emma scores every lead instantly so you stop wasting hours on tire-kickers and spend your time on the 20% that close.

**7\. An 11-stage sales pipeline — pre-built.** Day-one usable for high-velocity sales: New, Contact, Qualify, Demo, Proposal, Negotiation, and the rest. Not a blank board. Not a workflow you design from scratch. Pre-built playbooks for insurance, real estate, mortgage, solar, med spa, and high-ticket coaching.

**8\. The founder is one click away.** RevRa was built by a founder who actually sold for a living. "Talk to the Founder" is a button on the site, not a corporate ticket queue.

**Dev notes:**

- Render as a 2x4 or 4x2 grid of cards.  
- Numbers should be large and bold for scannability.  
- At the bottom of this section, add a soft CTA: *"See the full RevRa vs GoHighLevel comparison →"* linking to /vs-gohighlevel.

---

## 7\. Testimonials section

The current testimonials read as fabricated (no last names with companies, no headshots, names cycle 4x in the carousel) AND every single one is an insurance agent — which contradicts the multi-vertical positioning. Skeptical buyers will spot both problems immediately. Three options, in order of preference:

**Option A (best):** Replace with 3–5 real customer testimonials **across multiple verticals** to reinforce that RevRa is not insurance-only. Include:

- Real first \+ last name  
- Real company / agency  
- Headshot  
- Specific outcome ("Closed 6 more deals in October" — not "30% more")  
- A LinkedIn link if possible  
- A spread of verticals: 1 insurance agent, 1 real estate agent, 1 solar/mortgage/med spa rep, 1 agency operations manager. This visually communicates "this is for any high-velocity sales team."

**Option B:** Replace section with a **"Built with sales agents across every industry"** strip showing 1 real founder testimonial \+ 2–3 real beta user quotes from different verticals \+ a count ("Built with input from N sales agents across insurance, real estate, and high-ticket coaching").

**Option C (worst, but better than current):** Keep testimonials but **add company name \+ city \+ vertical** to each (e.g., "Marcus Chen, Senior Agent, Atlas Health Group, Phoenix AZ"), and rotate in 1–2 non-insurance verticals so the section doesn't read as insurance-only. Without these, the section actively damages credibility on both fronts.

**Do not** keep the carousel duplicating the same six testimonials four times — that's currently happening in the rendered HTML. One pass is enough.

---

## 8\. FAQ section — add and rewrite

Current questions are fine but generic. Add these four high-intent questions, with answers:

---

**Q: What is an A-CRM?**

A-CRM stands for **Agentic CRM** — a new category of CRM. Traditional CRMs are databases with reminders: you log every lead, set every follow-up, write every text, and update every stage. An A-CRM works the lead for you. Emma — RevRa's AI agent — scores the lead, drafts your follow-ups, calls cold leads while you sleep, books appointments, and updates the pipeline. RevRa is the first A-CRM.

---

**Q: How is RevRa different from GoHighLevel?**

Different category. GoHighLevel is a traditional CRM — a database with reminders, sold to marketing agencies who then mark it up to resell. RevRa is the first A-CRM (Agentic CRM) — a new category where Emma, the built-in AI agent, calls your leads, drafts your texts, and books your appointments for you. Concretely: Emma's voice agent is built in (GHL: third-party add-on), iMessage is native (GHL: not possible), every channel is unlimited with no A2P (GHL: per-message \+ carrier registration), the 11-stage pipeline plus vertical playbooks for insurance, real estate, mortgage, solar, med spa, financial advisors, and high-ticket coaches are pre-built (GHL: blank board you build yourself).

---

**Q: Do I need A2P 10DLC approval to send messages?**

No — Revra LLC absorbs the A2P registration on your behalf. Your cold outreach goes out under our compliance umbrella, so you skip the carrier paperwork entirely. You send the day you sign up.

---

**Q: Are there text message credits or per-message charges?**

No traditional text credits. RevRa runs on **AI Tokens** — one transparent usage currency that covers SMS, voice, lead enrichment, and AI booking. iMessage is always free. Your monthly subscription includes a generous AI Tokens allowance, and you can top up if you ever need more. One meter, no carrier markups, no surprise bills.

---

**Q: What are AI Tokens?**

AI Tokens are RevRa's universal usage currency. One token \= $0.01 retail, and tokens burn whenever Emma takes a metered action: sending an SMS, making a voice call, enriching a lead, or booking an appointment via AI. iMessage is always free (zero tokens). Every plan includes a monthly AI Tokens allowance; if you exceed it, you can top up at the same transparent rate. No carrier black boxes, no per-segment SMS games, no "minutes" packages — one currency for everything Emma does.

---

**Q: How does cold outreach work — do you send iMessage cold?**

No. Cold outreach goes out via SMS or social DM (under Revra's compliance umbrella). Once a lead engages, the conversation hands off to iMessage automatically — that's where Emma takes over. iMessage is for *conversations*, not initial cold outreach. We see up to 5× higher reply rates on iMessage than SMS, which is why we move there as soon as a lead engages.

---

**Add this question too:**

**Q: What industries does RevRa work for?**

Any high-velocity sales team that closes on the phone or by appointment. RevRa has pre-built playbooks for insurance (Medicare, ACA, health, life), real estate, mortgage, solar, med spa, financial advisors, fitness studios, and high-ticket coaches. If you take inbound leads and follow up at scale, RevRa works.

The other existing FAQ questions ("What insurance products does RevRa support?", "How does AI Lead Scoring work?", etc.) can stay, but **rename "What insurance products does RevRa support?" to "What industries does RevRa support?"** and broaden the answer accordingly. Use "Emma" and "agentic" wherever applicable.

---

## 9\. Footer cleanup

The current footer links some pages that may be stubs. Audit and either build or remove:

- **Documentation** — if not real, remove or replace with "Coming soon."  
- **API Reference** — same.  
- **Help Center** — same.  
- **Status Page** — same.

Empty links destroy trust faster than missing links. Either build them or remove them. Recommendation: keep "Help Center" only and build a single FAQ-style help page; remove the others until they exist.

Also add to footer:

- **/vs-gohighlevel** link under "Resources" or "Compare"  
- **"Talk to the Founder"** as a top-nav link, not just a footer link. (See section 11.)

### Legal entity & contact (per current memory)

The footer must include the correct legal entity, single point of contact, and links to legal pages. Use this exact block at the bottom of the footer (above copyright):

**Revra LLC** · Wyoming, USA Support: [support@letsrevra.com](mailto:support@letsrevra.com) [Privacy Policy](http:///privacy) · [Terms of Service](http:///terms) · [Refund Policy](http:///refund-policy) © 2026 Revra LLC. All rights reserved.

**Dev notes:**

- Use **Revra LLC** as the legal name everywhere on the site (legal pages, contracts, footer, checkout). The product name in headlines and marketing remains "RevRa" / "Revra."  
- **Single contact email is `support@letsrevra.com`.** Do not invent additional emails (no `sales@`, `hello@`, `founders@`, etc.). All routes through one inbox.  
- The Refund Policy page must reflect the "all sales final" stance — non-refundable subscriptions, activation, AI Tokens, lead lists. Allowed remedies: pause, AI Token credit, downgrade. Match GoHighLevel/Salesforce posture.  
- Privacy Policy and Terms of Service should be drafted by counsel; placeholder text is fine for now but flag to Avi to get them reviewed before launch.

---

## 10\. CTA copy throughout the page — standardize

Use these exact two CTAs everywhere on the site (replace any variation):

- Primary: **"Start Free — No Credit Card"**  
- Secondary: **"Hear Emma in Action"** (or "See a 90-Second Demo" if audio isn't ready)

Avoid: "Get Started," "Experience RevRa," "Try Now," "Book a Demo" (use only on /vs-gohighlevel and Enterprise pages).

---

## 11\. NEW PAGE — /vs-gohighlevel

Create a dedicated page at `letsrevra.com/vs-gohighlevel`. This captures bottom-funnel buyers searching for a GHL alternative. **This page is the most important SEO asset on the entire site** — it has to be exhaustive about every advantage RevRa has that GHL doesn't.

### Page structure

**H1:** RevRa vs GoHighLevel: A-CRM vs Traditional CRM

**Eyebrow:** A new category. The A-CRM (Agentic CRM).

**Subhead:** GoHighLevel is a traditional CRM built for marketing agencies to resell. RevRa is the first A-CRM (Agentic CRM) — built for the sales agents and teams who actually close the deals. Here's everything an A-CRM does that a traditional CRM can't.

### Side-by-side comparison table (build as a real HTML table, not an image)

| Capability | RevRa (A-CRM) | GoHighLevel (Traditional CRM) |
| :---- | :---- | :---- |
| **Category** | A-CRM (Agentic CRM) — agents do the work | Traditional CRM — database with reminders |
| **Built for** | Sales agents and teams that close on the phone | Marketing agencies (generic, resold) |
| **Native iMessage delivery (free)** | Yes — handoff channel for conversations | No — not possible |
| **iMessage reply rate vs SMS** | Up to 5× higher (cleared via Sendblue data) | N/A (no iMessage) |
| **A2P 10DLC registration burden** | Revra LLC absorbs it — customer skips paperwork | Customer must register, can be rejected |
| **Usage currency** | AI Tokens — one transparent unit ($0.01 each), covers SMS, voice, leads, booking | Per-segment SMS credits \+ per-minute voice \+ carrier markups |
| **iMessage cost** | Free (zero tokens) | Not available |
| **WhatsApp** | Native, runs on AI Tokens | Twilio add-on, separate billing |
| **RCS** | Native, runs on AI Tokens | Limited |
| **AI voice agent included** | Yes — Emma calls \+ books leads | No — third-party add-on, separate cost |
| **AI agent that books appointments for you** | Yes — Emma | No — you build the workflow yourself |
| **AI lead scoring (0–100)** | Yes — Emma scores every lead | No — basic tagging only |
| **AI pre-call briefing** | Yes — talking points, objections, budget | No |
| **AI post-call summary** | Yes — auto-logged to CRM | No |
| **Audio morning briefing** | Yes — Emma reads your day to you | No |
| **AI-drafted SMS in your voice** | Yes | Templates only |
| **Pre-built sales pipeline (11 stages)** | Yes — usable day one | Generic, build it yourself |
| **Pre-built playbooks for verticals** | Yes — insurance, real estate, mortgage, solar, med spa, coaching | No — you build every workflow |
| **AI CSV column mapping on import** | Yes | Manual mapping |
| **After-hours autonomous outreach** | Yes — Emma calls cold leads at 9 PM | No |
| **Speed-to-lead in seconds** | Yes — Emma replies the moment a lead arrives | Depends on the workflow you build |
| **Setup time** | Same day | Weeks — or hire a "GHL agency" |
| **Workflow builder complexity** | None — agentic by default | High — drag-and-drop maze |
| **Sold by** | Direct from RevRa | Resold by agencies (commonly marked up 2–5x) |
| **Founder-accessible support** | Yes — Talk to the founder, on the site | No |
| **Pricing transparency** | One plan, $249/mo, no add-ons | Three tiers \+ agency upcharge \+ per-message |
| **Founder with real sales experience** | Yes — built by someone who sold for a living | No — corporate platform |

### Below the table — "What you can do in RevRa that you literally cannot do in GoHighLevel"

This section goes below the comparison table on /vs-gohighlevel. Each item is a card or a bolded line item. The point is to make the gap *concrete* — not feature parity, but capability gaps.

**Things an A-CRM does that a traditional CRM literally cannot:**

- Send your leads a real iMessage — blue bubble, native — for free, with up to 5× higher reply rates than SMS.  
- Have Emma, your AI Sales Executive, call a cold lead at 9 PM, qualify them, and book a calendar meeting before you wake up.  
- Run cold outreach (SMS \+ social DM) under Revra LLC's A2P registration, so you skip the carrier paperwork entirely.  
- Hand off the conversation from green bubble to blue automatically — the moment a lead replies to a cold SMS, Emma moves them to iMessage.  
- Run all metered actions (SMS, voice, lead enrichment, AI booking) on a single transparent currency — AI Tokens — instead of juggling SMS credits, voice minutes, and per-channel surprise bills.  
- Open a lead and have Emma's pre-call brief, talking points, budget, and likely objections already written for you.  
- Hit play in the car and listen to Emma read your day to you — hot leads, follow-ups due, what closed overnight.  
- Drop in a CSV from a list provider and have Emma score and route every lead 0–100 within seconds.  
- Walk in on day one with an 11-stage sales pipeline already built — plus pre-built playbooks for insurance, real estate, mortgage, solar, med spa, and coaching. Not a blank board.  
- Get a real conversation with the founder of the platform within 48 hours of asking for one.

Every item on this list requires custom workflows, third-party integrations, or paid agency setup in a traditional CRM like GoHighLevel — if it's possible there at all. That's the difference between a CRM and an A-CRM.

### Closing CTA on the page

**Switching from GoHighLevel?** We'll import your contacts, rebuild your pipeline, and have Emma running your follow-ups in 48 hours. No setup fee for switchers.

\[Start Free — No Credit Card\] \[Talk to Founder\]

**Dev notes:**

- Add Schema.org structured data (`Product` markup, `FAQPage` markup with the 3 FAQ questions in section 8). This drives Google rich results for "GoHighLevel alternative" queries.  
- Title tag: "RevRa vs GoHighLevel — A-CRM vs Traditional CRM (2026)"  
- Meta description: "RevRa is the first A-CRM (Agentic CRM) — a new category. Native iMessage, unlimited messaging, no A2P, AI voice agent included. See how an A-CRM compares to traditional CRMs like GoHighLevel."  
- Internal-link this page from the homepage footer \+ a thin "Switching from GHL? See the comparison →" banner at the bottom of the homepage.

---

## 12\. "Talk to the Founder" — promote out of the footer

Currently buried in the footer. Move it to the **top nav bar** as the rightmost item, styled subtly (not as a primary CTA, but always visible). Sales agents buy from people. This is your single biggest small-vendor advantage. Make it visible.

Suggested label: **"Talk to the Founder"**, links to a Calendly with Avi.

---

## 13\. Headshots / Founder presence

Add a single hero strip section just above the footer:

**Built by a salesperson, for salespeople. The first A-CRM.**

Avi Javeri, founder of RevRa, sold for a living before building this — including a stretch as a licensed insurance agent in all 50 states. He built RevRa because no CRM on the market actually understood how a sales agent's day works. So he built a new category instead — the A-CRM. Same as the day a SaaS founder decided their app didn't belong on a server in the closet.

\[Talk to Avi\]

Add Avi's headshot. This single section will outperform half the testimonial section.

---

## Pricing — recommendations (per request, at the bottom of this doc)

The current site sells one plan: **Complete Access at $249/month**. Two recommendations.

### Recommendation 1: Add a lower-tier "Solo Agent" plan

Right now the floor is $249. That cedes the entire price-sensitive segment of the market to GoHighLevel's $97 starter plan. A Solo Agent tier closes that hole and gives Complete Access a clear "trade-up" reason.

**Suggested Solo Agent plan: $129/month**

What's included:

- Free iMessage (zero AI Tokens)  
- Monthly AI Tokens allowance for SMS, lead enrichment, and AI text booking (Avi: confirm exact amount with your dev — recommend something like 2,500–5,000 tokens)  
- Lead scoring (0–100)  
- 11-stage sales pipeline with vertical playbooks  
- Single dedicated number  
- 1 user seat  
- CSV import \+ Meta Ads integration

What's **not** included (these become the upgrade trigger):

- Emma's voice channel (Solo gets Emma on text only; voice unlocks at Complete Access)  
- Morning Briefing audio  
- Workflow Automation  
- Multi-seat / team features  
- A larger monthly AI Tokens allowance

This way, Solo gets you in the door for $129, and the moment they want Emma calling leads at 9 PM (which burns voice tokens), they upgrade to Complete Access at $249. The price ladder does the selling.

### Recommendation 2: Show GHL price comparison on /vs-gohighlevel

Add this comparison block on the /vs-gohighlevel page (and optionally on the main pricing section as a small footnote):

| Plan | RevRa | GoHighLevel |
| :---- | :---- | :---- |
| Entry tier | $129/mo (Solo Agent) — includes AI Tokens allowance | $97/mo (Starter) — text credits \+ A2P required \+ no AI voice |
| Pro tier | $249/mo (Complete Access) — Emma voice \+ larger AI Tokens allowance | $297/mo (Unlimited) — still no AI voice, still per-message credits, still A2P |
| Enterprise | Custom | $497/mo (SaaS Pro) |

### What to add to the actual pricing section on the homepage

The current pricing card just says "Unlimited everything." That's not accurate (only iMessage is unlimited; metered actions burn AI Tokens). Replace with this transparent breakdown:

**Complete Access — $249/month**

Everything you need to run an A-CRM.

- **Free iMessage** (zero AI Tokens, always)  
- **Monthly AI Tokens allowance** — covers SMS, voice, lead enrichment, and AI booking  
- Emma — Your AI Sales Executive (voice \+ text)  
- Lead scoring 0–100  
- Morning Briefing (audio \+ text)  
- 11-stage sales pipeline \+ vertical playbooks  
- Meta Ads integration  
- Workflow automation  
- Priority support \+ onboarding

*Need more tokens? Top up anytime at $0.01 per token. Transparent, no carrier markups.*

\[Start Free — No Credit Card\]

### Refund stance (add to pricing section as a small notice)

Below the pricing cards, add a line:

**All sales final.** Subscriptions, activation fees, AI Tokens, and lead lists are non-refundable. We pause, downgrade, or credit AI Tokens — but we don't refund. *(This matches the industry standard set by GoHighLevel and Salesforce. Same posture, fewer surprises.)*

**Dev note:** Don't bury this. Make it visible so it never surprises a customer post-purchase. Place directly below pricing cards, in muted text but legible.

The framing: "On feature parity, RevRa is cheaper *and* includes Emma. On entry price, we're $32 more — but you get unlimited messaging with no A2P, which the GHL Starter plan doesn't."

### Yearly toggle

Keep the yearly 11% discount. Consider bumping this to 15–20% on Solo only — it's a cheap acquisition tool and the LTV math still works because most Solo users will upgrade to Complete Access within 60–90 days once they meet Emma.

---

## Execution priority for the dev

If the dev can't do everything at once, here's the order:

0. **Brand & visual direction** (section 0a) — read this first. Color tokens, theme alternation pattern, type system, and visual motifs need to be in place *before* any new sections get built, otherwise everything will need reskinning later.  
1. **Hero rewrite** (section 1\) — biggest conversion lift, lowest effort. Establishes the A-CRM category from the first second.  
2. **"What is an A-CRM?" new section** (section 1.5) — the most important new section on the entire site. It defines the category. Without it, the whole "A-CRM" framing is just a tagline.  
3. **"How RevRa runs your cold-to-close funnel" new section** (section 6.25) — the green-bubble-to-blue-bubble handoff visual. This is the second most important new section on the site because it answers "how does this actually work?"  
4. **"What Dies When You Switch"** new section (section 5\) — seven cards including the new "Death to traditional CRM admin" headline card.  
5. **"Buy your time back"** new section (section 6\) — emotional close.  
6. **"Eight things only an A-CRM can do"** new section (section 6.5) — homepage-level GHL gap copy, framed as A-CRM vs traditional CRM.  
7. **Footer cleanup \+ legal entity block** (section 9\) — kill stubs, add Revra LLC \+ [support@letsrevra.com](mailto:support@letsrevra.com).  
8. **FAQ additions** (section 8\) — five new questions including "What is an A-CRM?", "What are AI Tokens?", and the cold-outreach architecture question.  
9. **Pricing section rewrite** (Pricing section) — replace "Unlimited everything" with the AI Tokens transparent breakdown \+ add "All sales final" notice.  
10. **All other section copy rewrites** (sections 2, 3, 4\) — straightforward find-and-replace work; weave "A-CRM" into the headers as specified.  
11. **Testimonials fix** (section 7\) — depends on real testimonials being available; spread across verticals.  
12. **/vs-gohighlevel page** (section 11\) — biggest SEO investment, build after homepage is sharpened. Now framed as A-CRM vs Traditional CRM.  
13. **Solo Agent pricing tier** (Pricing section) — needs product gating work, not just copy.

---

*End of spec.*  
