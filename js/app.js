/* ==========================================================================
   Nullprompt Academy — app logic
   Progress tracking (localStorage), quiz engine, shared nav/chrome, and the
   generators that build page content from js/modules-data.js.
   localStorage keys:
     np_lang              -> "en" | "he"      (managed by i18n.js)
     np_done              -> JSON array of completed module ids
     np_flags             -> JSON array of captured flag strings
     np_quiz              -> JSON map quizId -> {score,total}
   ========================================================================== */
(function (global) {

  /* HTML-escape a value before it is interpolated into an innerHTML string.
     The data (MODULES, quiz configs) is static today, but a site that teaches
     Improper Output Handling (LLM05) should model the fix: encode at the sink. */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ------------------------------ Progress ------------------------------ */
  const Progress = {
    _read(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch (e) { return def; } },
    _write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },

    doneModules() { return this._read("np_done", []); },
    isComplete(id) { return this.doneModules().includes(id); },
    setComplete(id, on) {
      let d = this.doneModules().filter(x => x !== id);
      if (on) d.push(id);
      this._write("np_done", d);
    },

    flags() { return this._read("np_flags", []); },
    isFlagCaptured(f) { return this.flags().includes(f); },
    captureFlag(f) {
      const arr = this.flags();
      if (!arr.includes(f)) { arr.push(f); this._write("np_flags", arr); }
    },

    quizScores() { return this._read("np_quiz", {}); },
    setQuizScore(id, score, total) {
      const q = this.quizScores(); q[id] = { score, total }; this._write("np_quiz", q);
    },

    completionPct() {
      const total = (global.MODULES || []).length || 8;
      return Math.round((this.doneModules().length / total) * 100);
    },
    resetAll() {
      ["np_done", "np_flags", "np_quiz"].forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    }
  };

  /* ------------------------------ Chrome -------------------------------- */
  const NP = {
    /* base = relative prefix to site root ("" for root, "../" for /modules) */
    buildTopbar(base, active) {
      const link = (href, key, id) =>
        `<a href="${esc(base)}${esc(href)}" data-i18n="${esc(key)}" ${active === id ? 'class="active"' : ''}></a>`;
      return `
        <div class="brand"><span class="dot"></span><span data-i18n="brand"></span></div>
        <nav aria-label="Primary">
          ${link("index.html", "nav.home", "home")}
          ${link("modules.html", "nav.modules", "modules")}
          ${link("ctf/ctf.html", "nav.ctf", "ctf")}
          <span class="lang-toggle" role="group" aria-label="Language">
            <button type="button" data-lang="en">EN</button>
            <button type="button" data-lang="he">עב</button>
          </span>
        </nav>`;
    },

    mountChrome() {
      const bar = document.querySelector("[data-chrome]");
      if (bar) {
        bar.classList.add("topbar");
        bar.innerHTML = this.buildTopbar(bar.getAttribute("data-base") || "", bar.getAttribute("data-active") || "");
      }
    },

    /* module cards for the landing + dashboard */
    renderModuleGrid(el, base, withProgress) {
      if (!el) return;
      const lang = I18N.lang;
      el.innerHTML = (global.MODULES || []).map(m => {
        const done = Progress.isComplete(m.id);
        const statusTag = done
          ? `<span class="tag done" data-i18n="ui.done"></span>`
          : (m.status === "deep"
            ? `<span class="tag deep" data-i18n="ui.deep"></span>`
            : `<span class="tag scaffold" data-i18n="ui.scaffold"></span>`);
        return `<a class="mod-card" href="${esc(base)}${esc(m.file)}">
            <span class="dur">${esc(m.dur[lang])}</span>
            <div class="mnum">${String(m.id).padStart(2, "0")}</div>
            <h3>${esc(m.title[lang])}</h3>
            <p>${esc(m.desc[lang])}</p>
            <div class="tags">${statusTag}</div>
          </a>`;
      }).join("");
    },

    /* prev / next pager on a module page */
    renderPager(el, currentId, base) {
      if (!el) return;
      const mods = global.MODULES || [];
      const i = mods.findIndex(m => m.id === currentId);
      const prev = mods[i - 1], next = mods[i + 1];
      const lang = I18N.lang;
      let html = "";
      html += prev
        ? `<a class="prev" href="${esc(base)}${esc(prev.file)}"><div class="dir">← <span data-i18n="ui.prev"></span></div><div class="ttl">${esc(prev.title[lang])}</div></a>`
        : `<a class="prev" href="${esc(base)}index.html"><div class="dir">← <span data-i18n="nav.home"></span></div><div class="ttl">${esc(I18N.t("nav.home"))}</div></a>`;
      html += next
        ? `<a class="next" href="${esc(base)}${esc(next.file)}"><div class="dir"><span data-i18n="ui.next"></span> →</div><div class="ttl">${esc(next.title[lang])}</div></a>`
        : `<a class="next" href="${esc(base)}ctf/ctf.html"><div class="dir"><span data-i18n="nav.ctf"></span> →</div><div class="ttl">${esc(I18N.t("nav.ctf"))}</div></a>`;
      el.innerHTML = html;
    },

    /* mark-complete control on a module page */
    renderMarkComplete(el, moduleId) {
      if (!el) return;
      const draw = () => {
        const done = Progress.isComplete(moduleId);
        el.innerHTML = `<button type="button" class="btn ${done ? 'ghost' : ''}" data-mc>
            ${done ? I18N.t("ui.completed") : I18N.t("ui.markComplete")}</button>`;
        el.querySelector("[data-mc]").addEventListener("click", () => {
          Progress.setComplete(moduleId, !Progress.isComplete(moduleId));
          draw();
        });
      };
      draw();
      // idempotent: if this element is re-mounted, drop its old np:lang handler
      // first so handlers don't stack (each would target replaced DOM).
      if (el._npMcLang) document.removeEventListener("np:lang", el._npMcLang);
      el._npMcLang = draw;
      document.addEventListener("np:lang", el._npMcLang);
    }
  };

  /* ------------------------------- Quiz --------------------------------- */
  /* config: { id, questions:[{ q:{en,he}, opts:[{en,he}...], correct:Index, why:{en,he} }] } */
  const Quiz = {
    mount(el, config) {
      if (!el || !config) return;
      if (!config.id || !Array.isArray(config.questions)) {
        console.warn("[Quiz] invalid config — needs { id, questions:[] }:", config);
        return;
      }
      const state = { answered: false };
      // Stable, shuffled display order per question so the correct answer's POSITION isn't a
      // tell (93% used to sit at index 1). value/data-oi keep the ORIGINAL index, so scoring is
      // unchanged; computed once here, not on every language re-render.
      const order = config.questions.map(q => {
        const idx = (q.opts || []).map((_, i) => i);
        for (let i = idx.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [idx[i], idx[j]] = [idx[j], idx[i]];
        }
        return idx;
      });
      function render() {
        const lang = I18N.lang;
        el.classList.add("quiz");
        el.innerHTML =
          `<h3>${lang === "he" ? "אתגר סיום מודול" : "End-of-module challenge"}</h3>
           <p class="lab-desc">${lang === "he" ? "בחר את התשובה הנכונה בכל שאלה, ואז בדוק." : "Pick the right answer for each question, then check."}</p>` +
          config.questions.map((q, qi) =>
            `<div class="q" data-qi="${qi}">
               <div class="qtext">${qi + 1}. ${esc(q.q[lang])}</div>
               ${order[qi].map(oi => { const o = q.opts[oi]; return (
                 `<label class="opt" data-oi="${oi}">
                    <input type="radio" name="q${config.id}_${qi}" value="${oi}">${esc(o[lang])}
                  </label>`); }).join("")}
               <div class="why lab-desc" style="display:none;margin-top:6px"></div>
             </div>`).join("") +
          `<button type="button" class="btn" data-check>${I18N.t("ui.checkAnswers")}</button>
           <div class="quiz-result" data-result></div>`;
        el.querySelector("[data-check]").addEventListener("click", check);
      }
      function check() {
        const lang = I18N.lang;
        let score = 0;
        config.questions.forEach((q, qi) => {
          const qEl = el.querySelector(`.q[data-qi="${qi}"]`);
          const picked = qEl.querySelector("input:checked");
          qEl.querySelectorAll(".opt").forEach(o => o.classList.remove("correct", "wrong"));
          if (picked) {
            const oi = parseInt(picked.value, 10);
            if (oi === q.correct) { score++; qEl.querySelector(`.opt[data-oi="${oi}"]`).classList.add("correct"); }
            else {
              qEl.querySelector(`.opt[data-oi="${oi}"]`).classList.add("wrong");
              qEl.querySelector(`.opt[data-oi="${q.correct}"]`).classList.add("correct");
            }
          } else {
            qEl.querySelector(`.opt[data-oi="${q.correct}"]`).classList.add("correct");
          }
          if (q.why) { const w = qEl.querySelector(".why"); w.style.display = "block"; w.textContent = q.why[lang]; }
        });
        const total = config.questions.length;
        Progress.setQuizScore(config.id, score, total);
        const res = el.querySelector("[data-result]");
        const pass = score === total;
        res.textContent = (lang === "he"
          ? `ציון: ${score}/${total} ${pass ? "— מושלם! 🎯" : "— בדוק את ההסברים ונסה שוב."}`
          : `Score: ${score}/${total} ${pass ? "— perfect! 🎯" : "— review the explanations and retry."}`);
        res.style.color = pass ? "var(--defense)" : "var(--impact)";
        state.answered = true;
      }
      render();
      if (el._npQuizLang) document.removeEventListener("np:lang", el._npQuizLang);
      el._npQuizLang = () => { if (!state.answered) render(); };
      document.addEventListener("np:lang", el._npQuizLang);
    }
  };

  /* ----------------------------- Bootstrap ------------------------------ */
  function boot() {
    if (!global.I18N || !global.MODULES) {
      console.warn("[Nullprompt] app.js booted without I18N/MODULES — check that " +
        "i18n.js and modules-data.js load before app.js.");
    }
    NP.mountChrome();
    if (global.I18N) I18N.init();
    // generators wired up by each page via data-* hooks
    document.querySelectorAll("[data-module-grid]").forEach(el => {
      NP.renderModuleGrid(el, el.getAttribute("data-base") || "", el.hasAttribute("data-progress"));
      document.addEventListener("np:lang", () => NP.renderModuleGrid(el, el.getAttribute("data-base") || "", true));
    });
    // overview pillars — one per module, generated from MODULES so they never drift
    document.querySelectorAll("[data-pillars]").forEach(el => {
      const draw = () => {
        const lang = I18N.lang;
        el.innerHTML = (global.MODULES || []).map(m =>
          `<div class="pillar"><div class="ico">${String(m.id).padStart(2, "0")}</div>` +
          `<div class="t">${esc(m.title[lang])}</div></div>`).join("");
      };
      draw();
      document.addEventListener("np:lang", draw);
    });
    document.querySelectorAll("[data-pager]").forEach(el => {
      const cid = parseInt(el.getAttribute("data-current"), 10);
      const base = el.getAttribute("data-base") || "";
      NP.renderPager(el, cid, base);
      I18N.apply(el); // fill the prev/next labels on first load, not only on toggle
      document.addEventListener("np:lang", () => { NP.renderPager(el, cid, base); I18N.apply(el); });
    });
    document.querySelectorAll("[data-mark-complete]").forEach(el =>
      NP.renderMarkComplete(el, parseInt(el.getAttribute("data-mark-complete"), 10)));
    // overall progress bar (dashboard)
    const pb = document.querySelector("[data-progress-bar]");
    if (pb) {
      const set = () => { pb.style.width = Progress.completionPct() + "%"; };
      set(); document.addEventListener("np:flag", set);
    }
    const pl = document.querySelector("[data-progress-label]");
    if (pl) {
      const set = () => { pl.textContent = Progress.completionPct() + "%"; };
      set();
    }
    // reset buttons
    document.querySelectorAll("[data-reset]").forEach(b =>
      b.addEventListener("click", () => { Progress.resetAll(); location.reload(); }));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  global.Progress = Progress;
  global.NP = NP;
  global.Quiz = Quiz;
})(window);
