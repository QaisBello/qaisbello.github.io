/* Site behaviour: theme, project rendering from portfolio.js, live stats from GitHub. */
(function () {
  const ROOT = document.body.dataset.root || "";
  const P = window.PROFILE, TRACKS = window.TRACKS, PROJECTS = window.PROJECTS;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- glyphs */
  const GLYPH = {
    bars: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V11M10 20V5M16 20v-7M22 20H2"/></svg>',
    scatter: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="17" r="1.8"/><circle cx="9" cy="14" r="1.8"/><circle cx="12" cy="15" r="1.8"/><circle cx="15" cy="9" r="1.8"/><circle cx="19" cy="6" r="1.8"/><path d="M3 20 21 4" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2.5" fill="none"/></svg>',
    pipe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="6" height="6" rx="1.5"/><rect x="16" y="14" width="6" height="6" rx="1.5"/><path d="M8 7h4a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2"/></svg>',
    beam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9h20"/><path d="M4 9l-2 4h4zM20 9l-2 4h4z"/><path d="M8 4v5M12 3v6M16 4v5" stroke-width="1.6"/><path d="M6.5 6.5 8 9l1.5-2.5M10.5 6.5 12 9l1.5-2.5M14.5 6.5 16 9l1.5-2.5" stroke-width="1.4"/><path d="M3 18c4 3 14 3 18 0" stroke-dasharray="2 2"/></svg>',
    nodes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><circle cx="12" cy="13" r="2.2" fill="currentColor"/><path d="M12 7.2v3.6M10.2 14.3 6.8 16.8M13.8 14.3l3.4 2.5"/></svg>'
  };
  const ICON = {
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    gh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>'
  };
  /* ---------- theme (shared key with the dashboards) */
  const saved = store.get("qab-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  const tbtn = $("#theme");
  if (tbtn) {
    const isDark = () => (document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
    const paint = () => { tbtn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme"); tbtn.innerHTML = isDark() ? ICON.sun : ICON.moon; };
    tbtn.addEventListener("click", () => { const next = isDark() ? "light" : "dark"; document.documentElement.setAttribute("data-theme", next); store.set("qab-theme", next); paint(); });
    paint();
  }

  document.querySelectorAll("[data-glyph]").forEach(el => el.innerHTML = GLYPH[el.dataset.glyph] || "");

  /* ---------- live stats from GitHub (rows + last data commit), cached per session */
  const rawUrl = p => `https://raw.githubusercontent.com/${p.repo}/${p.branch}/${p.dataFile}`;
  async function liveStats(p) {
    const key = "qab-stats-" + p.slug, cached = store.sget(key);
    if (cached && Date.now() - cached.t < 10 * 60 * 1000) return cached;
    const out = { t: Date.now(), rows: null, date: null };
    try { const r = await fetch(rawUrl(p), { cache: "no-store" }); if (r.ok) { const txt = await r.text(); out.rows = p.rows ?? Math.max(0, txt.trim().split(/\r?\n/).length - 1); } } catch (e) {}
    try { const r = await fetch(`https://api.github.com/repos/${p.repo}/commits?path=${encodeURIComponent(p.dataFile)}&per_page=1`); if (r.ok) { const j = await r.json(); out.date = j[0]?.commit?.committer?.date || null; } } catch (e) {}
    if (out.rows !== null) store.sset(key, out);
    return out;
  }
  const fmtDate = d => new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  function paintStats(p) {
    liveStats(p).then(s => {
      document.querySelectorAll(`[data-rows="${p.slug}"]`).forEach(el => el.textContent = s.rows !== null ? s.rows.toLocaleString() : "–");
      document.querySelectorAll(`[data-date="${p.slug}"]`).forEach(el => el.textContent = s.date ? fmtDate(s.date) : (s.rows !== null ? "live" : "snapshot"));
      document.querySelectorAll(`[data-src="${p.slug}"]`).forEach(el => {
        el.className = "chip " + (s.rows !== null ? "live" : "");
        el.textContent = s.rows !== null ? "Live from GitHub" : "Snapshot";
      });
    });
  }

  /* ---------- live index (home) */
  const idx = $("#index-body");
  if (idx) {
    idx.innerHTML = TRACKS.map(t => {
      const ps = PROJECTS.filter(p => p.track === t.id);
      const live = ps.filter(p => p.status === "live");
      return `<tr>
        <td><span class="sw" style="background:var(--t-${t.id})"></span><a href="${ROOT}${t.path}">${esc(t.name.toLowerCase().replace(/ /g, "_"))}</a></td>
        <td>${live.length ? '<span class="chip live">live</span>' : '<span class="chip soon">coming soon</span>'}</td>
        <td class="num">${live.length ? live.length : "–"}</td>
        <td>${live.length ? `<span data-date="${live[0].slug}">…</span>` : "–"}</td>
      </tr>`;
    }).join("");
    $("#index-count").textContent = `${PROJECTS.filter(p => p.status === "live").length} live · ${TRACKS.length} tracks`;
  }

  document.querySelectorAll("[data-track-chip]").forEach(el => {
    const n = PROJECTS.filter(p => p.track === el.dataset.trackChip && p.status === "live").length;
    el.className = "chip " + (n ? "live" : "soon"); el.textContent = n ? `${n} live` : "Coming soon";
  });

  /* ---------- project card markup */
  const shot = p => p.image ? `<img class="theme-img-light" src="${ROOT}${p.image.light}" alt="${esc(p.title)} dashboard, light theme" loading="lazy"><img class="theme-img-dark" src="${ROOT}${p.image.dark}" alt="${esc(p.title)} dashboard, dark theme" loading="lazy">` : "";
  const actions = p => `
    <a class="btn primary" href="${ROOT}${p.page}">${p.cta || "Open live dashboard"} ${ICON.arrow}</a>
    <a class="btn" href="https://github.com/${p.repo}" target="_blank" rel="noopener">${ICON.gh} Code &amp; data</a>`;

  const feat = $("#featured");
  if (feat) {
    const p = PROJECTS.find(x => x.status === "live");
    if (p) {
      feat.innerHTML = `<article class="feature">
        <a class="shot" href="${ROOT}${p.page}" aria-label="Open ${esc(p.title)}">${shot(p)}</a>
        <div class="body">
          <div class="client">${p.clientLogo ? `<img src="${ROOT}${p.clientLogo}" alt="${esc(p.client)}">` : ""}<span class="chip live" data-src="${p.slug}">Live from GitHub</span></div>
          <h3>${esc(p.title)}</h3>
          <p class="quote">${esc(p.headline).replace(/(\d+%)/, "<em>$1</em>")}</p>
          <p class="sum">${esc(p.summary)}</p>
          <div class="stats">${p.highlights.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>
          <div class="meta-line"><span>source: <a href="https://github.com/${p.repo}" target="_blank" rel="noopener">${esc(p.repo)}</a></span><span>${p.rowsLabel || "rows"}: <b data-rows="${p.slug}">…</b></span><span>data updated: <span data-date="${p.slug}">…</span></span></div>
          <div class="cta">${actions(p)}</div>
        </div></article>`;
    }
  }

  /* ---------- track gallery (dashboards page etc.) */
  const gal = $("#gallery");
  if (gal) {
    const track = gal.dataset.track;
    const ps = PROJECTS.filter(p => p.track === track);
    gal.innerHTML = ps.map(p => `<article class="card">
        <a class="shot" href="${ROOT}${p.page}" aria-label="Open ${esc(p.title)}">${shot(p)}</a>
        <div class="body">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="chip live" data-src="${p.slug}">Live from GitHub</span><span class="chip">${esc(p.client)}</span></div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
          <div class="meta-line"><span>${p.rowsLabel || "rows"}: <b data-rows="${p.slug}">…</b></span><span>data updated: <span data-date="${p.slug}">…</span></span></div>
          <div class="tags">${p.stack.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
          <div class="actions">${actions(p)}</div>
        </div></article>`).join("") +
      `<article class="card slot"><span class="chip soon">Next slot</span><h3>Next project</h3><p>In progress. New projects land here and read their data live from their own repo.</p></article>`;
  }

  PROJECTS.filter(p => p.status === "live").forEach(paintStats);

  /* ---------- about page */
  const about = $("#about-body");
  if (about) {
    $("#about-headline").textContent = P.headline;
    about.innerHTML = P.about.map(p => `<p>${esc(p)}</p>`).join("");
    const tl = (list) => list.map(x => `<div class="item"><div class="role">${esc(x.role)}</div><div class="org">${esc(x.org)}</div><div class="dates">${esc(x.dates)}</div>${x.note ? `<p class="note">${esc(x.note)}</p>` : ""}</div>`).join("");
    $("#exp").innerHTML = tl(P.experience);
    $("#vol").innerHTML = tl(P.volunteering);
    $("#edu").innerHTML = tl(P.education);
    $("#certs").innerHTML = P.certifications.map(([n, o, d]) => `<tr><td>${esc(n)}</td><td>${esc(o)}</td><td class="mono">${esc(d)}</td></tr>`).join("");
    $("#skills").innerHTML = Object.entries(P.skills).map(([g, list]) => `<div><div class="eyebrow" style="margin-bottom:8px">${esc(g)}</div><div class="skills">${list.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div></div>`).join("");
  }
  const teaser = $("#about-teaser");
  if (teaser) teaser.innerHTML = P.about.slice(0, 2).map(p => `<p>${esc(p)}</p>`).join("");

  /* ---------- contact block */
  const contact = $("#contact");
  if (contact) {
    const L = P.links;
    contact.innerHTML =
      `<a href="${L.linkedin}" target="_blank" rel="noopener"><span class="k">LinkedIn</span><span class="v">in/qais-adeniji-bello</span></a>` +
      `<a href="${L.github}" target="_blank" rel="noopener"><span class="k">GitHub</span><span class="v">github.com/QaisBello</span></a>` +
      (L.email ? `<div class="row"><span class="k">Email</span><span class="v" id="email">${esc(L.email)}</span><button class="copy" type="button" id="copy-email">Copy</button></div>` : "");
    const cb = $("#copy-email");
    if (cb) cb.addEventListener("click", () => {
      navigator.clipboard?.writeText(L.email).then(() => cb.textContent = "Copied", () => { const r = document.createRange(); r.selectNodeContents($("#email")); getSelection().removeAllRanges(); getSelection().addRange(r); });
    });
  }

  /* ---------- coming-soon canvas: a small animation per track */
  const cv = $("#soon-canvas");
  if (cv) {
    const ctx = cv.getContext("2d"), kind = cv.dataset.kind;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W, H, t0 = performance.now();
    const col = () => getComputedStyle(cv).getPropertyValue("--tc").trim() || "#2443d6";
    const faint = () => getComputedStyle(document.documentElement).getPropertyValue("--line").trim();
    const size = () => { const r = cv.getBoundingClientRect(); const d = devicePixelRatio || 1; W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    size(); addEventListener("resize", size);
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const pts = Array.from({ length: 46 }, () => { const x = rnd(); return { x, y: Math.min(.95, Math.max(.05, .15 + .7 * x + (rnd() - .5) * .35)) }; });
    const nodes = Array.from({ length: 14 }, () => ({ x: .08 + rnd() * .84, y: .12 + rnd() * .76 }));
    const edges = []; nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < .32) edges.push([i, j]); }));
    function frame(now) {
      const s = (now - t0) / 1000, c = col();
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = faint(); ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.fillStyle = c; ctx.strokeStyle = c;
      if (kind === "scatter") {
        const k = reduce ? 1 : Math.min(1, s / 3);
        pts.forEach((p, i) => { if (i / pts.length <= k) { ctx.beginPath(); ctx.arc(p.x * W, H - p.y * H, 3.5, 0, 7); ctx.fill(); } });
        if (k >= 1) { const a = reduce ? 1 : Math.min(1, (s - 3) / 1.5); ctx.globalAlpha = .9; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(0, H - .15 * H); ctx.lineTo(a * W, H - (.15 + .7 * a) * H); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }
      } else if (kind === "beam") {
        const y0 = H * .45, xs = [.08, .5, .92].map(f => f * W), amp = reduce ? 1 : (0.6 + 0.4 * Math.sin(s * 1.4));
        ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xs[0], y0); ctx.lineTo(xs[2], y0); ctx.stroke();
        xs.forEach(x => { ctx.beginPath(); ctx.moveTo(x, y0 + 2); ctx.lineTo(x - 10, y0 + 18); ctx.lineTo(x + 10, y0 + 18); ctx.closePath(); ctx.fill(); });
        ctx.lineWidth = 1.5; for (let i = 0; i < 12; i++) { const x = xs[0] + (i + .5) * (xs[2] - xs[0]) / 12; ctx.beginPath(); ctx.moveTo(x, y0 - 34); ctx.lineTo(x, y0 - 6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 4, y0 - 12); ctx.lineTo(x, y0 - 5); ctx.lineTo(x + 4, y0 - 12); ctx.stroke(); }
        ctx.setLineDash([5, 4]); ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 0; i <= 100; i++) { const f = i / 100, x = xs[0] + f * (xs[2] - xs[0]); const g = f < .5 ? f / .5 : (f - .5) / .5; const d = Math.sin(Math.PI * g) * (1 - 0.35 * Math.sin(Math.PI * g)); ctx.lineTo(x, y0 + 26 + 22 * amp * d); }
        ctx.stroke(); ctx.setLineDash([]);
        ctx.font = "11px JetBrains Mono, monospace"; ctx.fillText("deflected shape", xs[0], H - 12);
      } else if (kind === "pipe") {
        const stages = [.12, .38, .64, .88], y = H / 2;
        ctx.lineWidth = 2; ctx.globalAlpha = .35; ctx.beginPath(); ctx.moveTo(stages[0] * W, y); ctx.lineTo(stages[3] * W, y); ctx.stroke(); ctx.globalAlpha = 1;
        stages.forEach(x => { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x * W - 18, y - 18, 36, 36, 8) : ctx.rect(x * W - 18, y - 18, 36, 36); ctx.stroke(); });
        for (let i = 0; i < 9; i++) { const f = reduce ? i / 9 : ((s * .18 + i / 9) % 1); const x = (stages[0] + f * (stages[3] - stages[0])) * W; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill(); }
      } else {
        ctx.lineWidth = 1.2;
        edges.forEach(([i, j], n) => { const a = nodes[i], b = nodes[j]; const pulse = reduce ? .4 : .2 + .6 * Math.max(0, Math.sin(s * 1.6 - n * .5)); ctx.globalAlpha = pulse; ctx.beginPath(); ctx.moveTo(a.x * W, a.y * H); ctx.lineTo(b.x * W, b.y * H); ctx.stroke(); });
        ctx.globalAlpha = 1; nodes.forEach(p => { ctx.beginPath(); ctx.arc(p.x * W, p.y * H, 4.5, 0, 7); ctx.fill(); });
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* year */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
})();
