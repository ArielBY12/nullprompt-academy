# Nullprompt Academy — project guide

A **free, self-teaching, bilingual (EN/HE) academy for AI &amp; LLM penetration testing.**
Audience: people who can't afford paid courses. It teaches a full 8-module core
syllabus plus a 3-module advanced track (11 modules total), with interactive in-browser exploit
labs, per-module challenges, and a CTF arena.

## Hard constraints
- **Static site, no build step.** Plain HTML/CSS/JS only, hostable free on GitHub Pages.
  No frameworks, no bundler, no server. A learner needs only a browser.
- **Everything runs offline in the browser.** The "vulnerable LLM" in labs is a deterministic
  JS simulation (`js/labs.js`). No real model, no network calls, no API keys.
- **Accuracy over volume.** Verify factual claims against authoritative sources before writing
  (OWASP GenAI Top 10 for LLM 2025, MITRE ATLAS, primary papers). No invented CVEs, numbers,
  or "always-works" payloads. If unverifiable → phrase as general principle or omit.
- **No fake-finished content.** Label any incomplete work honestly ("outline / coming soon")
  rather than presenting it as done. (All 8 modules are currently complete deep lessons.)
- **Educational/defensive framing only.** Every attack is presented for authorized testing.

## File map
```
index.html            Landing (rebranded, bilingual). Generated module grid.
modules.html          Curriculum dashboard + progress bar (localStorage).
modules/module-NN.html  01–11. All deep bilingual lessons (09–11 = advanced track).
ctf/ctf.html          CTF arena: 4 working challenges + scoreboard + locked upcoming.
css/styles.css        Design system (see below). Uses logical props for RTL.
js/i18n.js            STRINGS dict + EN/HE toggle + dir/RTL. Global: I18N.
js/modules-data.js    SINGLE SOURCE OF TRUTH for the curriculum. Global: MODULES.
js/labs.js            Vulnerable-LLM engine + lab scenarios. Global: Lab.
js/app.js             Progress, Quiz engine, nav/chrome generators. Globals: Progress, NP, Quiz.
.claude/skills/       Maintenance skills: academy-module, academy-lab, academy-i18n.
```
Design derives from the original syllabus (`../AI_Pentesting_Syllabus.html`, read-only reference).

## Design system (css/styles.css)
- Palette tokens: `--red-900..--red-600`, `--gold`, `--paper`, `--ink`, `--muted`, `--line`;
  semantic callouts `--theory/--attack/--defense/--impact` (+ `-bg`); terminal `--term-*`.
- Components: `.topbar`, `.hero`, `.module-hero`, `.section`/`.prose`, `.pillar`, `.mod-card`,
  `.callout.{theory,attack,defense,impact}`, `.term` (terminal code), `.lab` + `.lab-console`,
  `.quiz`/`.q`/`.opt`, `.flag-input`, `.progress-*`, `.pager`, `.sources`, `.ctf-*`, `.viz`.
  Deep-v2 components: `.cheatsheet` (payload table), `.case`/`.case-grid` (case-study cards),
  `.mapping`/`.mapping-wrap` (technique→OWASP→ATLAS table), `.toolbox` (tooling notes).
- **RTL:** use logical properties (`margin-inline`, `padding-inline`, `inset-inline-*`,
  `text-align:start`). Code / payloads / flags stay `dir="ltr"` even in Hebrew.

## i18n contract (js/i18n.js)
- Every learner-facing string is a key in `STRINGS` → `{ en, he }`.
- Markup hooks: `data-i18n` (textContent/innerHTML), `data-i18n-html` (rich HTML),
  `data-i18n-ph` (placeholder), `data-i18n-aria` (aria-label).
- Page-specific strings: call `I18N.register({ key:{en,he}, ... })` **before** `app.js` loads
  (app.js boots on load and applies immediately).
- Technical terms (payloads, code, product names, flags) stay English in both languages.
- `I18N.set(lang)` flips `<html lang>` + `dir`, persists `np_lang`, fires `np:lang` event.
  Re-render dynamic content on `document.addEventListener("np:lang", ...)`.

## Lab engine API (js/labs.js)
Scenario object:
```js
Lab.define({
  id: "m3-sysprompt",
  title: {en,he},
  systemPrompt: "hidden text (may embed the flag)",
  secretFlag: "NP{...}",                 // flag format is NP{...}
  contextEditable: false,                // true => renders a poisonable "retrieved document"
  contextLabel: {en,he}, defaultContext: {en,he},
  text: { goal:{en,he}, desc:{en,he}, greeting:{en,he}, hints:[{en,he}...] },
  examples: ["one-click payload chips (LTR)"],
  rules: [ { patterns:[/regex/i], when:(input,ctx)=>bool,
             reply:(input,ctx)=>string, leaksFlag:true } ],  // first matching rule wins
  fallback: (input,ctx)=>string
});
```
Mount: `Lab.mount(document.getElementById("lab"), "scenario-id")`.
On a correct flag submit, the console calls `Progress.captureFlag(flag)` and fires `np:flag`.
Design labs so a **naive** attempt is refused and a **real technique** succeeds — teach the method.

## Progress / localStorage (js/app.js)
Keys: `np_lang`, `np_done` (module ids), `np_flags` (captured flags), `np_quiz` (scores).
API: `Progress.setComplete(id,on)`, `.isComplete`, `.captureFlag`, `.isFlagCaptured`,
`.setQuizScore`, `.completionPct()`, `.resetAll()`.

## Page generators (data-* hooks, handled in app.js boot)
- `data-chrome data-base="../" data-active="modules"` → builds the top nav.
- `data-module-grid data-base=""` → renders module cards from MODULES.
- `data-pager data-current="N" data-base="../"` → prev/next from MODULES.
- `data-mark-complete="N"` → mark-complete button.
- `data-progress-bar` / `data-progress-label` / `data-reset` → dashboard controls.
- `Quiz.mount(el, {id, questions:[{q:{en,he},opts:[{en,he}],correct,why:{en,he}}]})`.

## How to extend (use the skills)
- **Add / flesh out a module** → skill `academy-module`. Set `status:"deep"` in modules-data.js.
- **Add a lab or CTF challenge** → skill `academy-lab`.
- **Add / audit bilingual strings** → skill `academy-i18n`.
Deep-lesson section order: Intro → Theory → How the attack works → Visualization →
Real-world impact → Defense → Lab → Challenge (quiz) → Sources.
**Deep-v2** (reference: `modules/module-04.html`) layers on: technique taxonomy · payload
cheat-sheet (`.cheatsheet`) · real-world case studies (`.case`) · defense-in-depth *with code* ·
tooling & measurement (`.toolbox`) · technique→OWASP→ATLAS map (`.mapping`) · graded labs
(L1→L3) · 5-question quiz. Every payload/case/tool/ATLAS-id must trace to a cited source.

## Build status (update this as modules are completed)
- Deep &amp; done: **ALL modules 01–08 complete.** Labs `m1`(tokenizer), `m2-jailbreak`,
  `m3-sysprompt`, `m4-injection`, `m5` (attack-surface mapper, NP{trust_b0undary_map}),
  `m6-agent` (indirect→excessive-agency tool hijack, NP{3xc3ssive_ag3ncy_pwn}),
  `m7` (OWASP board + scenario-matching challenge, NP{0wasp_t0p10_mast3r}) +
  `m7-output` (LLM05 improper-output-handling / XSS lab, NP{0utput_h4ndling_xss});
  Module 07 also carries full deep-dive sections for LLM03/04/05 (the risks without their own module),
  `m8-chain` (capstone: recon→leak→weaponize→exfiltrate, gated 2-step, NP{chain3d_expl0it_c0mplete});
  CTF arena **complete — 4 working challenges**: ctf-sysleak (NP{d3limiter_1nj3ction_win}),
  ctf-indirect (NP{indir3ct_inj3ction_rag}), ctf-agency (role-confusion→privileged tool,
  NP{3xc3ss_ag3ncy_t00l_ab7se}), ctf-fullchain (3-step recon→code-extract→weaponize,
  NP{full_ch4in_3ngag3ment}). Scoreboard totals 4.
- Deploy: **live** at https://arielby12.github.io/nullprompt-academy/ via GitHub Pages, configured
  to **deploy from the `main` branch root**. Pushes to `main` auto-publish — no build step, the
  learner-facing "browser-only" constraint is preserved. (Pages source is "legacy/branch", not
  "GitHub Actions", so no custom deploy workflow is needed.)
- Generators HTML-escape interpolated data (`esc()` in `js/app.js`) and validate configs
  (`Lab.define`, `Quiz.mount`); `boot()` warns on script-load-order mistakes.
- **Deep-v2 done: ALL modules 01–11** (8 core + advanced track 09–11). Each carries the deep-v2 layers: technique taxonomy ·
  payload cheat-sheet (`.cheatsheet`) · real-world case studies (`.case`, source-cited) ·
  defense-in-depth with code · tooling (`.toolbox`) · technique→OWASP→ATLAS map (`.mapping`) ·
  5-question quiz. Each reuses its existing lab/interactive; **02 & 04 add graded L1–L3 labs**
  (`m4-obfuscation`, `m4-multiturn`, `m2-refusal`, `m2-skeleton`). Advanced modules 09–11 add labs
  `m9-multimodal` (image/OCR injection), `m10-extract` (training-data extraction), `m11-mcp` (MCP
  tool poisoning).
- Every case/tool/ATLAS-id was web-verified; `academy-module` now has an **Accuracy pass (hard gate)**.
  ATLAS ids used are standardized (e.g. `AML.T0051` Prompt Injection, `AML.T0054` Jailbreak,
  `AML.T0053` LLM Plugin Compromise). ATLAS's newer LLM/agent techniques are version-fluid — re-verify
  ids against the current atlas.mitre.org / atlas-data before citing new ones.
- Remaining next passes: reference/tooling layer; more CTF.
- Reference for OWASP content: OWASP Top 10 for LLM 2025 = LLM01 Prompt Injection,
  LLM02 Sensitive Info Disclosure, LLM03 Supply Chain, LLM04 Data/Model Poisoning,
  LLM05 Improper Output Handling, LLM06 Excessive Agency, LLM07 System Prompt Leakage,
  LLM08 Vector &amp; Embedding Weaknesses, LLM09 Misinformation, LLM10 Unbounded Consumption.

## Verify after changes
Open `index.html` via a static server (e.g. `python3 -m http.server`). Check: EN/HE toggle flips
text + direction and persists; module grid + pager render; a lab exploit reveals a flag and
submitting it marks solved; quiz scores save; no console errors.
