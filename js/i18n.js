/* ==========================================================================
   Nullprompt Academy — i18n engine
   Bilingual EN/HE with RTL. Every learner-facing string is a data-i18n key.
   Technical terms (payloads, code, flags) stay English/LTR by design.

   Usage in markup:
     <span data-i18n="nav.home"></span>          -> textContent
     <div  data-i18n-html="lesson.intro"></div>  -> innerHTML (rich text)
   Page-specific strings can be registered before init via:
     I18N.register({ key: {en:"...", he:"..."} , ... })
   ========================================================================== */
(function (global) {
  const STRINGS = {
    /* ---- brand + nav ---- */
    "brand": { en: "Nullprompt Academy", he: "Nullprompt Academy" },
    "nav.home": { en: "Home", he: "בית" },
    "nav.curriculum": { en: "Curriculum", he: "תוכנית לימודים" },
    "nav.modules": { en: "Modules", he: "מודולים" },
    "nav.ctf": { en: "CTF Arena", he: "זירת CTF" },
    "nav.progress": { en: "My Progress", he: "ההתקדמות שלי" },

    /* ---- generic UI ---- */
    "ui.free": { en: "100% free · no signup", he: "חינם לחלוטין · ללא הרשמה" },
    "ui.start": { en: "Start learning", he: "התחל ללמוד" },
    "ui.open": { en: "Open module", he: "פתח מודול" },
    "ui.continue": { en: "Continue", he: "המשך" },
    "ui.deep": { en: "In-depth", he: "מעמיק" },
    "ui.scaffold": { en: "Outline", he: "בקרוב" },
    "ui.done": { en: "Completed", he: "הושלם" },
    "ui.markComplete": { en: "Mark module complete", he: "סמן מודול כהושלם" },
    "ui.completed": { en: "✓ Completed", he: "✓ הושלם" },
    "ui.reset": { en: "Reset", he: "אפס" },
    "ui.send": { en: "Send", he: "שלח" },
    "ui.submitFlag": { en: "Submit flag", he: "שלח דגל" },
    "ui.flagPlaceholder": { en: "NP{...}", he: "NP{...}" },
    "ui.checkAnswers": { en: "Check answers", he: "בדוק תשובות" },
    "ui.tryAgain": { en: "Try again", he: "נסה שוב" },
    "ui.hint": { en: "Need a hint?", he: "צריך רמז?" },
    "ui.goal": { en: "Goal", he: "מטרה" },
    "ui.yourTurn": { en: "Your turn", he: "תורך" },
    "ui.sources": { en: "Sources & further reading", he: "מקורות וקריאה נוספת" },
    "ui.prev": { en: "Previous", he: "הקודם" },
    "ui.next": { en: "Next", he: "הבא" },
    "ui.flagCorrect": { en: "Correct — flag captured!", he: "נכון — הדגל נלכד!" },
    "ui.flagWrong": { en: "Not quite. Keep attacking.", he: "לא מדויק. המשך לתקוף." },
    "ui.solved": { en: "Solved", he: "נפתר" },
    "ui.locked": { en: "Locked", he: "נעול" },
    "ui.points": { en: "pts", he: "נק'" },
    "ui.simNote": {
      en: "Teaching simulation — this bot runs entirely in your browser. No real model or network calls.",
      he: "סימולציה לימודית — הבוט רץ כולו בדפדפן שלך. ללא מודל אמיתי או קריאות רשת."
    },
    "ui.scaffoldNote": {
      en: "This module's in-depth content is being written. The outline below is accurate; deep lessons, labs and a challenge land in the next update.",
      he: "התוכן המעמיק של מודול זה בכתיבה. ראשי הפרקים מטה מדויקים; שיעורים מעמיקים, מעבדות ואתגר יתווספו בעדכון הבא."
    },

    /* ---- landing ---- */
    "home.title": { en: "AI &amp; LLM Penetration Testing", he: "בדיקות חדירה ל-AI ולמודלי שפה" },
    "home.sub": {
      en: "A free, hands-on academy that takes you from model internals to full-scope offensive testing of real AI and LLM systems — no course fees, no gatekeeping.",
      he: "אקדמיה חינמית ומעשית שלוקחת אותך ממבנה המודל ועד בדיקות התקפיות מלאות על מערכות AI ו-LLM אמיתיות — בלי שכר לימוד ובלי חסמים."
    },
    "home.overviewEyebrow": { en: "Course overview", he: "סקירת הקורס" },
    "home.overviewTitle": { en: "From model internals to full-scope engagements", he: "ממבנה המודל ועד בדיקות מקצה לקצה" },
    "home.overviewLead": {
      en: "This academy takes you from the architecture of Large Language Models to a complete, professional penetration-testing methodology for AI-powered applications and agents. Every module pairs theory with attack vectors, real-world impact, and an interactive lab you can actually exploit in the browser.",
      he: "האקדמיה לוקחת אותך ממבנה מודלי השפה הגדולים ועד מתודולוגיית בדיקות חדירה מקצועית ומלאה ליישומים וסוכנים מבוססי-AI. כל מודול משלב תיאוריה עם וקטורי תקיפה, השפעה בעולם האמיתי, ומעבדה אינטראקטיבית שניתן ממש לתקוף בדפדפן."
    },
    "home.curriculumEyebrow": { en: "Curriculum", he: "תוכנית הלימודים" },
    "home.curriculumTitle": { en: "11 modules, start to finish", he: "11 מודולים, מהתחלה ועד הסוף" },
    "home.audienceEyebrow": { en: "Who it's for", he: "למי זה מיועד" },
    "home.audienceTitle": { en: "Built for anyone who wants in", he: "בנוי לכל מי שרוצה להיכנס לתחום" },
    "home.aud1": { en: "Self-taught learners with no budget for paid courses", he: "לומדים עצמאיים ללא תקציב לקורסים בתשלום" },
    "home.aud2": { en: "Penetration testers &amp; red teamers moving into AI", he: "בודקי חדירה ו-red teamers שנכנסים ל-AI" },
    "home.aud3": { en: "AppSec engineers &amp; security researchers", he: "מהנדסי AppSec וחוקרי אבטחה" },
    "home.aud4": { en: "Bug bounty hunters targeting AI features", he: "ציידי באגים שמכוונים לפיצ'רים מבוססי-AI" },
    "home.outcomeEyebrow": { en: "What you'll be able to do", he: "מה תוכל לעשות" },
    "home.outcomeTitle": { en: "By the end of the academy", he: "בסוף האקדמיה" },
    "home.out1": { en: "Map the attack surface of any AI/LLM system", he: "למפות את משטח התקיפה של כל מערכת AI/LLM" },
    "home.out2": { en: "Execute the OWASP Top 10 for LLM in practice", he: "לבצע את OWASP Top 10 ל-LLM בפועל" },
    "home.out3": { en: "Run a full LLM penetration test, start to finish", he: "לבצע בדיקת חדירה מלאה ל-LLM מקצה לקצה" },
    "home.out4": { en: "Deliver a professional findings report", he: "להפיק דוח ממצאים מקצועי" },
    "home.ctaTitle": { en: "Start with Module 01 — right now, for free", he: "התחל ממודול 01 — עכשיו, בחינם" },
    "home.ctaText": { en: "No account, no payment. Every lab runs in your browser.", he: "ללא חשבון, ללא תשלום. כל מעבדה רצה בדפדפן שלך." },

    /* ---- stats ---- */
    "stat.modules": { en: "Modules", he: "מודולים" },
    "stat.labs": { en: "Interactive labs", he: "מעבדות אינטראקטיביות" },
    "stat.owasp": { en: "OWASP LLM risks", he: "סיכוני OWASP LLM" },
    "stat.price": { en: "Cost, forever", he: "עלות, לתמיד" },

    /* ---- modules dashboard ---- */
    "modules.title": { en: "Curriculum &amp; progress", he: "תוכנית לימודים והתקדמות" },
    "modules.lead": { en: "Eleven modules take you from foundations through a full engagement to advanced attacks. Your progress is saved locally in this browser.", he: "אחד-עשר מודולים לוקחים אותך מהיסודות, דרך בדיקה מלאה, עד תקיפות מתקדמות. ההתקדמות נשמרת מקומית בדפדפן." },
    "modules.progressLabel": { en: "Overall progress", he: "התקדמות כללית" },

    /* ---- disclaimer / footer ---- */
    "disclaimer": {
      en: "For authorized security testing and education only. All labs are self-contained browser simulations. Never test systems you don't have explicit permission to assess.",
      he: "לבדיקות אבטחה מורשות ולמידה בלבד. כל המעבדות הן סימולציות עצמאיות בדפדפן. לעולם אל תבדוק מערכות ללא הרשאה מפורשת."
    },
    "footer.tag": { en: "Free AI/LLM offensive-security education for everyone.", he: "לימודי אבטחה התקפית ל-AI/LLM, חינם, לכולם." }
  };

  const I18N = {
    strings: STRINGS,
    lang: "en",
    register(obj) { Object.assign(STRINGS, obj); return this; },
    t(key) {
      const s = STRINGS[key];
      if (!s) return key;
      return s[this.lang] != null ? s[this.lang] : (s.en || key);
    },
    apply(root) {
      root = root || document;
      root.querySelectorAll("[data-i18n]").forEach(el => {
        el.innerHTML = this.t(el.getAttribute("data-i18n"));
      });
      root.querySelectorAll("[data-i18n-html]").forEach(el => {
        el.innerHTML = this.t(el.getAttribute("data-i18n-html"));
      });
      root.querySelectorAll("[data-i18n-ph]").forEach(el => {
        el.setAttribute("placeholder", this.t(el.getAttribute("data-i18n-ph")));
      });
      root.querySelectorAll("[data-i18n-aria]").forEach(el => {
        el.setAttribute("aria-label", this.t(el.getAttribute("data-i18n-aria")));
      });
    },
    set(lang) {
      this.lang = (lang === "he") ? "he" : "en";
      try { localStorage.setItem("np_lang", this.lang); } catch (e) {}
      document.documentElement.lang = this.lang;
      document.documentElement.dir = (this.lang === "he") ? "rtl" : "ltr";
      this.apply(document);
      document.querySelectorAll(".lang-toggle button").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-lang") === this.lang);
      });
      document.dispatchEvent(new CustomEvent("np:lang", { detail: { lang: this.lang } }));
    },
    init() {
      let saved = "en";
      try { saved = localStorage.getItem("np_lang") || "en"; } catch (e) {}
      this.set(saved);
      document.querySelectorAll(".lang-toggle button").forEach(b => {
        b.addEventListener("click", () => this.set(b.getAttribute("data-lang")));
      });
    }
  };

  global.I18N = I18N;
})(window);
