---
name: academy-module
description: Add or deepen a Nullprompt Academy module page. Use when adding a brand-new module to the curriculum, or expanding a thin/partial module into a full deep bilingual lesson with visualization, interactive lab, quiz and sources. Follows the existing deep-module template and the conventions in the project CLAUDE.md.
---

# academy-module

Build or complete a module page for **Nullprompt Academy**. Always read the project
`CLAUDE.md` first — it is the source of truth for the design system, i18n contract,
lab API, and file map. Mirror an existing **deep** module (`modules/module-01.html`,
`-02`, `-03`) rather than inventing structure.

## When to use
- Adding a brand-new module to the curriculum.
- Deepening a thin or partial module into a full deep lesson.
  (All current modules 01–08 are already complete deep lessons.)

## Steps
1. **Verify the content first (hard rule).** Before writing, confirm every factual claim
   against authoritative sources (OWASP GenAI Top 10 for LLM 2025, MITRE ATLAS, primary
   papers). No invented CVEs, numbers, or "always-works" payloads. Unverifiable → generalize or omit.
2. **Update `js/modules-data.js`.** For a new module, append an entry (id, file, `status`,
   `title/dur/desc/topics` each `{en,he}`). For an existing one, set `status:"deep"`.
   This array drives the landing grid, dashboard, and prev/next pager automatically — do not
   hardcode module lists anywhere else.
3. **Create/replace `modules/module-0N.html`** copying a deep module's skeleton:
   - `<header class="topbar" data-chrome data-base="../" data-active="modules">`
   - `.module-hero` with number/title/sub.
   - `.section.prose` body in the **standard order**: Intro → Theory → How the attack works →
     Visualization (inline SVG in `.viz`) → Real-world impact → Defense → Lab → Quiz → Sources.
   - Use `.callout.{theory,attack,defense,impact}` for framing boxes and `.term` for code.
   - `data-mark-complete="N"` and `data-pager data-current="N" data-base="../"`.
4. **Write bilingual content.** Put lesson prose in `I18N.register({...})` in an inline
   `<script>` **before** `../js/app.js`. Every key needs `en` and `he`. Keep payloads/code LTR.
5. **Add the interactive lab.** Reuse a scenario from `js/labs.js` or create one with the
   `academy-lab` skill, then `Lab.mount(el, "scenario-id")` after `app.js`.
6. **Add the end-of-module quiz** via `Quiz.mount(el, {id, questions:[...]})` with `{en,he}`
   question/options/why and a `correct` index. 3 questions is the norm.
7. **Add a Sources block** (`.sources`) listing the verified references.
8. **Update the build-status section of `CLAUDE.md`.**

## Verify
Serve the site (`python3 -m http.server`), open the module: EN/HE toggle flips text +
direction; visualization renders; lab exploit reveals a flag; quiz scores save; no console errors.
