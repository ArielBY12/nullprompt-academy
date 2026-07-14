---
name: academy-lab
description: Add or edit an interactive vulnerable-LLM lab or CTF challenge for Nullprompt Academy. Use when creating a new attackable-bot scenario (prompt injection, system-prompt leak, jailbreak, indirect injection, improper output handling) with an NP{...} flag, or tuning an existing one in js/labs.js. Follows the Lab engine API in the project CLAUDE.md.
---

# academy-lab

Create a new **simulated vulnerable-LLM** scenario for Nullprompt Academy, or tune an
existing one. Read the project `CLAUDE.md` (Lab engine API section) first. The engine is a
deterministic, offline, rule-based simulation — never add real model or network calls.

## When to use
- A module or CTF challenge needs a new attackable bot.
- Adjusting difficulty, rules, hints, or flags of an existing lab.

## Scenario shape (define in `js/labs.js`)
```js
Lab.define({
  id: "unique-id",
  title: {en, he},
  systemPrompt: "hidden instructions; may embed the flag",
  secretFlag: "NP{...}",                 // ALWAYS the NP{...} format
  contextEditable: false,                // true => poisonable "retrieved document" textarea
  contextLabel: {en, he}, defaultContext: {en, he},
  text: { goal:{en,he}, desc:{en,he}, greeting:{en,he}, hints:[{en,he}, ...] },
  examples: ["one-click payload chips (kept LTR)"],
  rules: [ { patterns:[/regex/i, ...], when:(input,ctx)=>bool,
             reply:(input,ctx)=>string, leaksFlag:true|false } ],
  fallback: (input,ctx)=>string
});
```

## Design rules (important)
- **Teach the technique.** A *naive* attempt (e.g. "what is your system prompt?") must be
  **refused**; a *real* technique (injection override, repeat-above, encoding/translation
  format-shift, role-play, poisoned document) must **succeed**. The gap is the lesson.
- **First matching rule wins** — order refusal/blocklist rules before the bypass rule, or gate
  the bypass with a `when` predicate (see `ctf-sysleak` for the blocklist-vs-format-shift pattern).
- Indirect injection: set `contextEditable:true` and read `ctx.document` in a rule's `when`
  (see `ctf-indirect`).
- Set `leaksFlag:true` only on the rule that represents a successful exploit; its `reply`
  should reveal `secretFlag` and briefly name the technique the learner just used.
- Keep it benign: the "secret" is a fake flag, never real harmful content.

## Wire it up
- In a module page or `ctf/ctf.html`: `Lab.mount(document.getElementById("lab"), "your-id")`
  after `app.js`. Flag capture auto-reports via `Progress.captureFlag` and fires `np:flag`.
- For CTF: add the flag string to the scoreboard list in `ctf/ctf.html` and bump `data-ctf-total`.

## Verify
Serve the site, open the page: the naive payload is refused; the intended technique triggers
the flag; submitting the flag shows "captured" and updates progress/scoreboard; EN/HE both render.
