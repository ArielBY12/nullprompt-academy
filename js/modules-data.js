/* ==========================================================================
   Nullprompt Academy — curriculum single source of truth.
   index.html, modules.html and every module's prev/next nav are generated
   from this array. To add a module: append an entry + create its page.
   status: "deep"  = full lesson written | "scaffold" = outline only.
   ========================================================================== */
window.MODULES = [
  {
    id: 1, file: "modules/module-01.html", status: "deep",
    title: { en: "AI Foundations", he: "יסודות ה-AI" },
    dur:   { en: "Foundations", he: "יסודות" },
    desc: {
      en: "How Large Language Models actually work — architecture, tokens, embeddings and training — so every later attack makes sense.",
      he: "איך מודלי שפה גדולים באמת עובדים — ארכיטקטורה, טוקנים, embeddings ואימון — כדי שכל תקיפה בהמשך תהיה מובנת."
    },
    topics: {
      en: ["Transformer architecture &amp; attention", "Tokenization &amp; embeddings", "Training: pretraining, fine-tuning, RLHF", "Limits: hallucination, context window"],
      he: ["ארכיטקטורת Transformer ו-attention", "טוקניזציה ו-embeddings", "אימון: pretraining, fine-tuning, RLHF", "מגבלות: הזיות, חלון הקשר"]
    }
  },
  {
    id: 2, file: "modules/module-02.html", status: "deep",
    title: { en: "Understanding Large Language Models", he: "היכרות עם מודלי שפה גדולים" },
    dur:   { en: "Model types", he: "סוגי מודלים" },
    desc: {
      en: "Base vs instruct vs chat models, open vs closed weights, the prompt-role hierarchy and the guardrails you'll be testing against.",
      he: "מודלי base מול instruct מול chat, משקולות פתוחות מול סגורות, היררכיית תפקידי ה-prompt וה-guardrails שנתקוף."
    },
    topics: {
      en: ["Base vs instruct vs chat", "Closed vs open-weight models", "System / developer / user hierarchy", "Safety &amp; alignment guardrails"],
      he: ["Base מול instruct מול chat", "מודלים סגורים מול open-weight", "היררכיית system / developer / user", "מנגנוני בטיחות ו-alignment"]
    }
  },
  {
    id: 3, file: "modules/module-03.html", status: "deep",
    title: { en: "LLM Interfaces &amp; APIs", he: "ממשקים ו-APIs של LLM" },
    dur:   { en: "Attack surface", he: "משטח תקיפה" },
    desc: {
      en: "Web UI, REST API, SDK and CLI as attack surface — parameters, auth, rate limits, hidden endpoints and system-prompt/telemetry leakage.",
      he: "Web UI, REST API, SDK ו-CLI כמשטח תקיפה — פרמטרים, אימות, הגבלות קצב, endpoints נסתרים ודליפת system-prompt/טלמטריה."
    },
    topics: {
      en: ["Web UI, REST, SDK &amp; CLI workflows", "Auth &amp; rate-limit exposure", "Hidden endpoints &amp; parameters", "System-prompt &amp; telemetry leakage"],
      he: ["זרימות Web UI, REST, SDK ו-CLI", "חשיפת אימות והגבלות קצב", "Endpoints ופרמטרים נסתרים", "דליפת system-prompt וטלמטריה"]
    }
  },
  {
    id: 4, file: "modules/module-04.html", status: "deep",
    title: { en: "Prompt Engineering &amp; Model Behavior", he: "הנדסת prompt והתנהגות מודל" },
    dur:   { en: "Behavior", he: "התנהגות" },
    desc: {
      en: "Prompt structure, few-shot patterns and chaining — and where legitimate prompt engineering becomes manipulation and injection.",
      he: "מבנה prompt, דפוסי few-shot ושרשור — והיכן הנדסת prompt לגיטימית הופכת למניפולציה והזרקה."
    },
    topics: {
      en: ["Prompt structure: instructions, context, roles", "Few-shot patterns &amp; chaining", "Context injection as attack vector", "Engineering vs. manipulation"],
      he: ["מבנה prompt: הוראות, הקשר, תפקידים", "דפוסי few-shot ושרשור", "הזרקת הקשר כווקטור תקיפה", "הנדסה מול מניפולציה"]
    }
  },
  {
    id: 5, file: "modules/module-05.html", status: "deep",
    title: { en: "AI &amp; LLM Attack Surface", he: "משטח התקיפה של AI ו-LLM" },
    dur:   { en: "Architecture", he: "ארכיטקטורה" },
    desc: {
      en: "Map components, data flows and trust boundaries across an AI system, and how orchestration and tool layers expand reach.",
      he: "מיפוי רכיבים, זרימות מידע וגבולות אמון במערכת AI, וכיצד שכבות אורקסטרציה וכלים מרחיבות את ההגעה."
    },
    topics: {
      en: ["Frontend, backend, vector DB &amp; orchestration", "Trust boundaries between components", "Attack-surface mapping exercise", "Attacking the model vs. the system"],
      he: ["Frontend, backend, vector DB ואורקסטרציה", "גבולות אמון בין רכיבים", "תרגיל מיפוי משטח תקיפה", "תקיפת המודל מול תקיפת המערכת"]
    }
  },
  {
    id: 6, file: "modules/module-06.html", status: "deep",
    title: { en: "AI Agents &amp; Organizational Risks", he: "סוכני AI וסיכונים ארגוניים" },
    dur:   { en: "Agents", he: "סוכנים" },
    desc: {
      en: "The risk of connecting models to tools, data and enterprise systems — excessive agency, indirect injection and multi-agent trust chains.",
      he: "הסיכון בחיבור מודלים לכלים, מידע ומערכות ארגוניות — excessive agency, הזרקה עקיפה ושרשראות אמון רב-סוכניות."
    },
    topics: {
      en: ["Agent architecture: planning, tools, memory", "Excessive agency &amp; privilege escalation", "Indirect injection &amp; tool poisoning", "Multi-agent trust chains"],
      he: ["ארכיטקטורת סוכן: תכנון, כלים, זיכרון", "Excessive agency והסלמת הרשאות", "הזרקה עקיפה והרעלת כלים", "שרשראות אמון רב-סוכניות"]
    }
  },
  {
    id: 7, file: "modules/module-07.html", status: "deep",
    title: { en: "OWASP Top 10 for LLM Applications", he: "OWASP Top 10 ליישומי LLM" },
    dur:   { en: "OWASP 2025", he: "OWASP 2025" },
    desc: {
      en: "A walkthrough of the ten OWASP LLM risk categories (2025): theory, attack vectors, impact and scenarios for each.",
      he: "סקירה של עשר קטגוריות הסיכון של OWASP ל-LLM (2025): תיאוריה, וקטורי תקיפה, השפעה ותרחישים לכל אחת."
    },
    topics: {
      en: ["Prompt injection &amp; sensitive info disclosure", "Supply chain &amp; data/model poisoning", "Improper output handling &amp; excessive agency", "System-prompt leakage, vector weaknesses, unbounded consumption"],
      he: ["הזרקת prompt וחשיפת מידע רגיש", "Supply chain והרעלת מידע/מודל", "טיפול פגום בפלט ו-excessive agency", "דליפת system-prompt, חולשות וקטור, צריכה בלתי מוגבלת"]
    }
  },
  {
    id: 8, file: "modules/module-08.html", status: "deep",
    title: { en: "LLM Pentesting Methodology", he: "מתודולוגיית בדיקות חדירה ל-LLM" },
    dur:   { en: "Methodology", he: "מתודולוגיה" },
    desc: {
      en: "A professional, repeatable process: recon, mapping, attack-vector identification, chained exploitation, reporting and remediation.",
      he: "תהליך מקצועי וחוזר: איסוף מודיעין, מיפוי, זיהוי וקטורי תקיפה, ניצול משורשר, דיווח ותיקון."
    },
    topics: {
      en: ["Recon &amp; system mapping", "Attack-vector identification &amp; test planning", "Chained exploitation &amp; payload crafting", "Reporting &amp; remediation guidance"],
      he: ["Recon ומיפוי מערכת", "זיהוי וקטורי תקיפה ותכנון בדיקה", "ניצול משורשר ובניית payloads", "דיווח והנחיות תיקון"]
    }
  }
];
