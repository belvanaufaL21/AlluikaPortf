(function () {
  const { D, esc, role, icons, card, rolePills, reveal, mount } = window.Site;
  const $ = (id) => document.getElementById(id);

  mount();

  // Role ticker (two copies so it can loop seamlessly)
  const tick = `<span class="marquee-group">${D.roles.map((r) => `<span>${esc(r.name)}</span><b>✱</b>`).join("")}</span>`;
  $("marquee").innerHTML = tick + tick;

  const count = (id) => D.projects.filter((p) => p.roles.includes(id)).length;
  const countLabel = (id) => {
    const n = count(id);
    return n ? `${n} project${n === 1 ? "" : "s"}` : "Coming soon";
  };

  // Role cards: each role gets its own shape (CSS) and a small illustration (animated in fx.js).
  const lines = (n) => Array.from({ length: n }, () => "<i></i>").join("");
  const visuals = {
    uiux: `
      <span class="board">${lines(3)}</span>
      <span class="board">${lines(3)}</span>
      <span class="board">${lines(2)}<i class="hot"></i></span>
      <svg class="cursor" viewBox="0 0 24 24"><path d="M4 2l6.5 19 2.6-7.6L21 11z"/></svg>`,
    sa: `
      <svg viewBox="0 0 240 130">
        <path class="edge" pathLength="1" d="M42 65 L104 28"/>
        <path class="edge" pathLength="1" d="M42 65 L104 102"/>
        <path class="edge" pathLength="1" d="M122 28 L122 102"/>
        <path class="edge" pathLength="1" d="M140 28 L198 65"/>
        <path class="edge" pathLength="1" d="M140 102 L198 65"/>
        <circle class="node hot" cx="30" cy="65" r="12"/>
        <rect class="node" x="104" y="16" width="36" height="24" rx="6"/>
        <rect class="node" x="104" y="90" width="36" height="24" rx="6"/>
        <rect class="node" x="198" y="53" width="36" height="24" rx="6"/>
      </svg>`,
    pbd: `
      <span class="bars"><i style="--h:34%"></i><i style="--h:52%"></i><i style="--h:72%"></i><i style="--h:96%"></i></span>
      <svg class="trend" viewBox="0 0 200 100" preserveAspectRatio="none"><path pathLength="1" d="M8 80 L68 58 L128 36 L192 6"/></svg>`,
    qa: [70, 52, 62]
      .map(
        (w, i) => `
      <span class="check-row${i === 2 ? " bug" : ""}">
        <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6"/><path class="tick" pathLength="1" d="${
          i === 2 ? "M8 8 L16 16 M16 8 L8 16" : "M7 12.5 L10.4 15.8 L17 8.8"
        }"/></svg>
        <i style="--w:${w}%"></i>
      </span>`
      )
      .join(""),
    webdev: `
      <span class="win">
        <span class="win-bar mono"><b>&lt;</b><b>/</b><b>&gt;</b></span>
        <span class="code-lines">
          <i style="--w:55%"></i><i class="ind" style="--w:72%"></i><i class="ind hot" style="--w:42%"></i><i style="--w:30%"></i>
          <span class="caret"></span>
        </span>
      </span>`
  };

  $("roles-grid").innerHTML = D.roles
    .map(
      (r) => `
      <button class="role-card rc-${r.id} reveal" data-fx="role" type="button" data-role="${r.id}">
        <span class="rc-visual rv-${r.id}" aria-hidden="true">${visuals[r.id] || ""}</span>
        <span class="rc-text">
          <span class="count mono">${countLabel(r.id)}</span>
          <span class="rc-title">${esc(r.name)}</span>
          <span class="rc-blurb">${esc(r.blurb)}</span>
          <span class="go">View projects ${icons.arrow.replace("<svg", '<svg width="16" height="16"')}</span>
        </span>
      </button>`
    )
    .join("");

  // Filters + grid
  const filters = [{ id: "all", short: "All", color: "#eceee9" }, ...D.roles];
  $("filters").innerHTML = filters
    .map(
      (f) => `
      <button class="chip" type="button" data-role="${f.id}" style="--role:${f.color}" aria-pressed="false">
        <i></i>${esc(f.id === "all" ? "All" : f.name)}
        <small>${f.id === "all" ? D.projects.length : count(f.id)}</small>
      </button>`
    )
    .join("");

  // "All" view rules:
  //  1. At least one project per role (main role, UI/UX, first).
  //  2. At most two rows of cards; everything else goes behind "See more".
  //  3. Empty spots left in those two rows are filled with random other projects.
  // On a one-column phone layout, two rows would hide roles, so it shows one per role.
  const gridCols = () => getComputedStyle($("grid")).gridTemplateColumns.split(" ").length || 1;
  const shuffled = D.projects
    .map((p) => [Math.random(), p])
    .sort((x, y) => x[0] - y[0])
    .map((x) => x[1]); // shuffled once per visit so the fill stays put on resize

  function featured() {
    const cols = gridCols();
    const main = D.person.primaryRole;
    const ordered = [...D.roles].sort((x, y) => (y.id === main) - (x.id === main));
    const picks = [];
    ordered.forEach((r) => {
      const p = D.projects.find((x) => x.roles.includes(r.id) && !picks.includes(x));
      if (p) picks.push(p);
    });
    const max = cols === 1 ? picks.length : cols * 2;
    const shown = picks.slice(0, max);
    for (const p of shuffled) {
      if (shown.length >= max) break;
      if (!shown.includes(p)) shown.push(p);
    }
    return new Set(shown);
  }

  // Re-pick when the column count changes (e.g. resizing between desktop and tablet).
  let current = "all";
  let lastCols = 0;
  addEventListener("resize", () => {
    if (current === "all" && gridCols() !== lastCols) show("all");
  });

  function show(id) {
    current = id;
    lastCols = gridCols();
    const first = id === "all" ? featured() : null;
    const list = id === "all"
      ? [...first, ...D.projects.filter((p) => !first.has(p))]
      : D.projects.filter((p) => p.roles.includes(id));
    const shown = first || new Set(list);
    const hidden = list.filter((p) => !shown.has(p));
    $("grid").innerHTML =
      list.filter((p) => shown.has(p)).map((p) => card(p, id)).join("") +
      hidden.map((p) => card(p, id).replace('<a class="card', '<a hidden class="card is-extra')).join("") ||
      `<p class="grid-empty reveal">Projects for this role are coming soon.</p>`;
    $("see-more").hidden = !hidden.length;
    $("see-more").setAttribute("aria-expanded", "false");
    $("see-more").innerHTML = `See more projects <small class="mono">${hidden.length}</small>`;
    $("role-note").textContent = id === "all" ? "Everything I've worked on, newest first." : role(id).blurb;
    document.querySelectorAll("#filters .chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.role === id)));
    reveal($("grid"));
    const url = new URL(location.href);
    if (id === "all") url.searchParams.delete("role");
    else url.searchParams.set("role", id);
    history.replaceState(null, "", url);
  }

  $("see-more").addEventListener("click", () => {
    const btn = $("see-more");
    const open = btn.getAttribute("aria-expanded") !== "true";
    const extras = [...$("grid").querySelectorAll(".is-extra")];
    extras.forEach((c) => (c.hidden = !open));
    btn.setAttribute("aria-expanded", String(open));
    btn.innerHTML = open ? "Show less" : `See more projects <small class="mono">${extras.length}</small>`;
    if (open) reveal($("grid"));
    else $("work").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  $("filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (b) show(b.dataset.role);
  });
  $("roles-grid").addEventListener("click", (e) => {
    const b = e.target.closest(".role-card");
    if (!b) return;
    show(b.dataset.role);
    $("work").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  const initial = new URLSearchParams(location.search).get("role");
  show(D.roles.some((r) => r.id === initial) ? initial : "all");

  // Experience
  $("timeline").innerHTML = D.experience
    .map(
      (x) => `
      <div class="tl-row reveal" data-fx="row">
        <span class="mono">${esc(x.period)}</span>
        <div><h3>${esc(x.title)} · ${esc(x.org)}</h3><p>${esc(x.note)}</p></div>
        ${x.role ? rolePills([x.role]) : ""}
        <span class="tl-line" aria-hidden="true"></span>
      </div>`
    )
    .join("");

  // About
  $("education").innerHTML = D.education
    .map(
      (e) => `
      <li class="edu">
        <span class="mono">${esc(e.level)} · ${esc(e.period)}</span>
        <strong>${esc(e.school)}</strong>
        <span>${esc(e.degree)}${e.detail ? ` · ${esc(e.detail)}` : ""}</span>
      </li>`
    )
    .join("");

  // Awards with a certificate are buttons that open it in the pop-up.
  $("achievements").innerHTML = D.achievements
    .map((a, i) => {
      const inner = `
        <span class="mono">${esc(a.year)}</span>
        <strong>${esc(a.title)}</strong>
        <span class="award-text">${esc(a.text)}</span>`;
      return a.images
        ? `<li><button class="award award-btn" type="button" data-i="${i}" aria-haspopup="dialog">${inner}
             <span class="cert-view mono">View certificate ${icons.arrow.replace("<svg", '<svg width="12" height="12"')}</span>
           </button></li>`
        : `<li class="award">${inner}</li>`;
    })
    .join("");

  // Certificates: each opens a pop-up with the certificate image(s).
  $("certificates").innerHTML = D.certificates
    .map(
      (c, i) => `
      <li>
        <button class="cert" type="button" data-i="${i}" aria-haspopup="dialog">
          <span class="mono cert-meta"><span>${esc(c.type)}</span><span>${esc(c.year)}</span></span>
          <strong>${esc(c.title)}</strong>
          ${c.issuer ? `<span>${esc(c.issuer)}</span>` : ""}
          ${c.images ? `<span class="cert-view mono">View certificate ${icons.arrow.replace("<svg", '<svg width="12" height="12"')}</span>` : ""}
        </button>
      </li>`
    )
    .join("");

  const certDialog = $("cert-dialog");
  function openCert(c) {
    $("cert-dialog-meta").textContent = `${c.type} · ${c.year}`;
    $("cert-dialog-title").textContent = c.title;
    $("cert-dialog-issuer").textContent = c.issuer || "";
    $("cert-dialog-images").innerHTML =
      c.images
        .map((src, n) => `<a href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(c.title)} certificate${c.images.length > 1 ? `, page ${n + 1}` : ""}"></a>`)
        .join("") + (c.note ? `<small class="cert-note">${esc(c.note)}</small>` : "");
    // Portrait documents (A4 letters) display narrower than landscape certificates.
    $("cert-dialog-images").querySelectorAll("img").forEach((img) => {
      const mark = () => img.classList.toggle("portrait", img.naturalHeight > img.naturalWidth);
      img.complete ? mark() : img.addEventListener("load", mark);
    });
    certDialog.showModal();
    certDialog.querySelector(".skill-dialog-body").scrollTop = 0;
    if (window.FX) FX.dialog(certDialog);
  }
  $("certificates").addEventListener("click", (ev) => {
    const b = ev.target.closest(".cert");
    const c = b && D.certificates[+b.dataset.i];
    if (c && c.images) openCert(c);
  });
  $("achievements").addEventListener("click", (ev) => {
    const b = ev.target.closest(".award-btn");
    const a = b && D.achievements[+b.dataset.i];
    if (a && a.images) openCert({ type: "Award", year: a.year, title: `${a.title}: ${a.text}`, issuer: a.issuer, images: a.images });
  });

  // Skills: group names only; details open in a dialog.
  $("skills").innerHTML = D.skills
    .map(
      (s, i) => `
      <button class="skill-group" type="button" data-i="${i}" aria-haspopup="dialog">
        <span>${esc(s.group)}</span>
        <small class="mono">${s.items.length}</small>
        <i aria-hidden="true">+</i>
      </button>`
    )
    .join("");

  const dialog = $("skill-dialog");
  $("skills").addEventListener("click", (ev) => {
    const b = ev.target.closest(".skill-group");
    if (!b) return;
    const s = D.skills[+b.dataset.i];
    $("skill-dialog-title").textContent = s.group;
    $("skill-dialog-summary").textContent = s.summary;
    $("skill-dialog-items").innerHTML = s.items.map((i) => `<span class="skill">${esc(i)}</span>`).join("");
    dialog.showModal();
    if (window.FX) FX.dialog(dialog);
  });
  // Close either pop-up when clicking the backdrop.
  [dialog, certDialog].forEach((d) =>
    d.addEventListener("click", (ev) => {
      if (ev.target === d) d.close();
    })
  );

  reveal();
})();
