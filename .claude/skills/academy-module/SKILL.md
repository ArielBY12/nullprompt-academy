---
name: academy-module
description: Add or deepen a Nullprompt Academy module page. Use when adding a brand-new module to the curriculum, or expanding a thin/partial module into a full deep bilingual lesson with visualization, interactive lab, quiz and sources. Follows the existing deep-module template and the conventions in the project CLAUDE.md.
---

# academy-module

Build or complete a module page for **Nullprompt Academy**. Always read the project
`CLAUDE.md` first — it is the source of truth for the design system, i18n contract,
lab API, and file map. Mirror an existing **deep** module — use `modules/module-04.html` as the
**deep-v2** reference (the fullest standard), or `-01`/`-02`/`-03` for the baseline — rather than
inventing structure.

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
   - **Deep-v2 depth layers** (see `modules/module-04.html`): a full technique **taxonomy**; a
     **payload cheat-sheet** (`.cheatsheet`, payloads `dir="ltr"` + `data-i18n-html` annotations);
     **real-world case studies** (`.case` cards, each with a source line); **defense-in-depth with
     code** (`.term` snippets, not just principles); **tooling & measurement** (`.toolbox`); a
     **technique→OWASP→ATLAS** table (`.mapping`); **graded labs** (L1→L3, one family each); a
     5-question quiz. Verify every payload/case/tool/ATLAS-id against a source cited in `.sources`.
   - `data-mark-complete="N"` and `data-pager data-current="N" data-base="../"`.
4. **Write bilingual content.** Put lesson prose in `I18N.register({...})` in an inline
   `<script>` **before** `../js/app.js`. Every key needs `en` and `he`. Keep payloads/code LTR.
5. **Add the interactive lab.** Reuse a scenario from `js/labs.js` or create one with the
   `academy-lab` skill, then `Lab.mount(el, "scenario-id")` after `app.js`.
6. **Add the end-of-module quiz** via `Quiz.mount(el, {id, questions:[...]})` with `{en,he}`
   question/options/why and a `correct` index. 3 questions is the norm.
7. **Add a Sources block** (`.sources`) listing the verified references.
8. **Update the build-status section of `CLAUDE.md`.**

## Accuracy pass (hard gate — do before publishing)
Re-check **every datum you added**, not a spot-check. For each item, confirm it against an
authoritative source (prefer primary: OWASP GenAI, MITRE ATLAS, arXiv, vendor security blogs)
and make sure that source is cited in `.sources`:
- **Payloads / techniques** — the technique does what the text claims, and the lab actually
  refuses the naive form and only yields the flag to the real technique.
- **Case studies** — real incident: correct name, date, what happened, and a verifiable public
  source (check with WebSearch/WebFetch). No invented or embellished incidents.
- **Tools** — the capability / flag / command is real and current (garak, promptfoo, PyRIT, …).
- **OWASP-LLM ids** and **MITRE ATLAS ids** — exact (e.g. `AML.T0051.001` = Indirect Prompt
  Injection; `AML.T0054` = LLM Jailbreak). Don't guess sub-technique numbers.
- **Cited papers** — exist with the right title / author / venue / arXiv id.
- **Numbers, dates, statistics, product names** — verified verbatim, or removed.
Anything you cannot trace to a source → generalize it to a principle or cut it. **When unsure, cut.**

## Verify
Serve the site (`python3 -m http.server`), open the module: EN/HE toggle flips text +
direction; visualization renders; lab exploit reveals a flag; quiz scores save; no console errors.
