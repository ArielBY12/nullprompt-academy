---
name: academy-i18n
description: Add, translate, or audit the bilingual (EN/HE) strings for Nullprompt Academy and check RTL correctness. Use when adding new UI/lesson text, when Hebrew and English fall out of sync, or to verify every data-i18n key has both languages and Hebrew renders correctly right-to-left.
---

# academy-i18n

Keep Nullprompt Academy correctly bilingual (English + Hebrew, with RTL). Read the project
`CLAUDE.md` (i18n contract section) first.

## When to use
- Adding new learner-facing text (must ship EN + HE together).
- Auditing that every `data-i18n*` key resolves in both languages.
- Fixing RTL layout or mixed-direction (code/payload) issues.

## The contract
- Global strings live in `STRINGS` in `js/i18n.js`; page-specific strings are registered with
  `I18N.register({ key:{en,he} })` **before** `js/app.js` loads.
- Markup hooks: `data-i18n`, `data-i18n-html` (rich), `data-i18n-ph` (placeholder),
  `data-i18n-aria` (aria-label).
- **Every key must have both `en` and `he`.** Missing `he` silently falls back to `en`.
- Technical terms — payloads, code, product names, flags (`NP{...}`) — stay **English/LTR**
  in Hebrew mode. Wrap such inline runs so they don't reverse; block code uses `.term` / `dir="ltr"`.

## Audit steps
1. Collect all keys referenced in markup: search for `data-i18n`, `data-i18n-html`,
   `data-i18n-ph`, `data-i18n-aria` across `index.html`, `modules.html`, `modules/*.html`,
   `ctf/ctf.html`.
2. Collect all defined keys: `STRINGS` in `js/i18n.js` plus every inline `I18N.register({...})`.
3. Report: keys used but undefined; keys defined but unused; entries missing `en` or `he`;
   Hebrew values that accidentally contain untranslated English (or vice-versa).
4. For new text, write natural Hebrew (not literal MT); keep technical terms in English.

## RTL check
- Toggle to Hebrew and confirm: layout mirrors (nav, cards, callout borders use logical
  properties), lists indent on the correct side, and code/console/flag inputs stay LTR.
- Fix layout by switching physical CSS props to logical ones (`margin-inline`, `inset-inline-*`,
  `text-align:start`) rather than adding `[dir=rtl]` overrides where avoidable.

## Verify
Serve the site, flip EN⇄HE on several pages: no raw keys visible, no empty strings, Hebrew reads
right-to-left, payloads/code remain left-to-right, and the choice persists across reload.
