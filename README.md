# Nullprompt Academy

**A free, hands-on academy for AI & LLM penetration testing.** Deep bilingual (English / Hebrew)
lessons, interactive in-browser exploit labs, and CTF challenges — built for people who can't
afford paid courses.

> 🌐 **Live site:** https://arielby12.github.io/nullprompt-academy/

Everything runs as a static site in the browser — no signup, no backend, no cost. The
"vulnerable LLM" in every lab is a self-contained JavaScript simulation, so you can safely
practice real attack techniques offline.

## What's inside

- **8 in-depth modules** covering the full AI/LLM pentesting syllabus, from model internals to a
  full engagement methodology.
- **10 interactive labs** — attackable simulated bots where you actually perform prompt injection,
  system-prompt leakage, jailbreaks, indirect injection, tool hijacking (excessive agency),
  improper output handling (XSS), and attack-surface mapping. Capture the `NP{...}` flags.
- **4-challenge CTF arena** — unguided, cross-module challenges up to a full three-step chained exploit.
- **Full OWASP Top 10 for LLM (2025)** coverage, mapped to every technique.
- **Bilingual EN/HE** with proper right-to-left support, and local progress tracking.

## Curriculum

| # | Module | Interactive |
|---|--------|-------------|
| 01 | AI Foundations | Tokenizer playground |
| 02 | Understanding LLMs | Jailbreak a guardrail |
| 03 | LLM Interfaces & APIs | Leak the system prompt |
| 04 | Prompt Engineering & Model Behavior | Task-hijack injection |
| 05 | AI & LLM Attack Surface | Attack-surface mapper |
| 06 | AI Agents & Organizational Risks | Hijack an agent's tools |
| 07 | OWASP Top 10 for LLM | Risk board + XSS lab + classifier |
| 08 | LLM Pentesting Methodology | Capstone: full chained exploit |

## Run locally

No build step. Any static server works:

```bash
python3 -m http.server 8099
# then open http://localhost:8099
```

## Deploy

Served from **GitHub Pages**, configured to **deploy from the `main` branch root**, so every push
to `main` auto-publishes the live site. There's no build step — the static files are served as-is.
To host your own copy, fork the repo and enable Pages (Settings → Pages → Source: **Deploy from a
branch → `main` / `/root`**).

## Ethics & scope

For **authorized security testing and education only**. Every lab is a self-contained browser
simulation with no real model or network calls. Never test systems you don't have explicit
permission to assess.

## Tech

Plain HTML / CSS / JavaScript — no framework, no bundler. Content and conventions are documented
in `CLAUDE.md`; the `.claude/skills/` folder holds tooling to extend the academy.

---

### עברית

**אקדמיה חינמית ומעשית ללימוד בדיקות חדירה ל-AI ולמודלי שפה (LLM).** שיעורים מעמיקים בעברית
ובאנגלית, מעבדות ניצול אינטראקטיביות בדפדפן, ואתגרי CTF — מיועד למי שאין לו תקציב לקורסים בתשלום.
כל האתר רץ בדפדפן ללא הרשמה, ללא שרת וללא עלות; הבוט ה"פגיע" בכל מעבדה הוא סימולציה בטוחה ב-JavaScript.

*Licensed for educational use. Contributions and issues welcome.*
