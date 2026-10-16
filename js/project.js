(function () {
  const { D, esc, img, role, icons, card, reveal, mount } = window.Site;

  mount();

  const id = new URLSearchParams(location.search).get("p");
  const p = D.projects.find((x) => x.id === id) || D.projects[0];
  const primary = role(p.roles[0]);
  const main = document.getElementById("main");

  document.title = `${p.title} | ${D.person.short} portfolio`;
  main.style.setProperty("--role", primary.color);

  const roleNames = p.roles.map((r) => role(r).name).join(" · ");

  // Very small Gherkin highlighter for code samples.
  const gherkin = (src) =>
    src
      .split("\n")
      .map((l) => `<span class="line">${esc(l).replace(/^(\s*)(Feature|Scenario|Given|When|Then|And|But)\b/, '$1<span class="kw">$2</span>') || " "}</span>`)
      .join("");

  // A real screenshot inside a section, framed as a browser window or a phone.
  const screen = (src, device, label) =>
    device === "phone"
      ? `<div class="case-shot is-phone reveal"><div class="mockup-frame phone tone"><img class="is-shot" src="${esc(src)}" alt="${esc(label)}" loading="lazy"></div></div>`
      : `<div class="case-shot reveal"><div class="mockup-frame tone">
           <div class="mockup-bar"><i></i><i></i><i></i><span class="mono">${esc(label)}</span></div>
           <img class="is-shot" src="${esc(src)}" alt="${esc(label)}" loading="lazy">
         </div></div>`;

  // Real screenshots (local files) show in full; placeholder photos are cropped to fit.
  const shot = /^\d+-[0-9a-f]+$/.test(p.cover) ? "" : ' class="is-shot"';
  const mockup =
    p.device === "phone"
      ? `<div class="mockup-frame phone tone"><img${shot} src="${img(p.cover, 700)}" alt="${esc(p.title)} placeholder image"></div>`
      : `<div class="mockup-frame tone">
           <div class="mockup-bar"><i></i><i></i><i></i><span class="mono">${esc(p.title)}</span></div>
           <img${shot} src="${img(p.cover, 1800)}" alt="${esc(p.title)} placeholder image">
         </div>`;

  const meta = [
    ["Role", roleNames],
    ["Company", p.org],
    ["Period", p.period],
    p.tools && ["Tools", p.tools.join(", ")]
  ]
    .filter(Boolean)
    .map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${esc(v)}</dd></div>`)
    .join("");

  const stats = p.stats
    ? `<div class="stats">${p.stats
        .map(([n, label]) => `<div class="stat reveal" data-fx="count"><b>${esc(n)}</b><span>${esc(label)}</span></div>`)
        .join("")}</div>`
    : "";

  const block = (s) => `
      <article class="case-block">
        <h2 class="display reveal" data-fx="words">${esc(s.heading)}</h2>
        <div class="body reveal"><div></div><p>${esc(s.body)}</p></div>
        ${
          s.code
            ? `<div class="code reveal" data-fx="code"><header class="mono">${esc(s.codeLabel || "Example")}</header><pre><code>${gherkin(s.code)}</code></pre></div>`
            : ""
        }
        ${s.image ? `<figure class="reveal tone" data-fx="figure"><img src="${img(s.image)}" alt="" loading="lazy"></figure>` : ""}
        ${s.shot ? screen(s.shot, s.device, `${p.title}: ${s.heading}`) : ""}
      </article>`;

  // Projects with more than one role get a tab per role; each section says which role it belongs to.
  // Sections without a role are shared and show above the tabs.
  const multi = p.roles.length > 1;
  const wanted = new URLSearchParams(location.search).get("tab");
  const active = p.roles.includes(wanted) ? wanted : p.roles[0];
  const tabs = !multi
    ? ""
    : `
      <div class="role-tabs reveal" role="tablist" aria-label="My roles in this project">
        ${p.roles
          .map(
            (r) => `<button class="role-tab" type="button" role="tab" id="tab-${r}" data-role="${r}"
                      aria-controls="panel-${r}" aria-selected="${r === active}" tabindex="${r === active ? 0 : -1}">${esc(role(r).name)}</button>`
          )
          .join("")}
      </div>
      ${p.roles
        .map((r) => {
          const own = p.sections.filter((s) => s.role === r);
          return `
          <div class="role-panel" role="tabpanel" id="panel-${r}" aria-labelledby="tab-${r}"${r === active ? "" : " hidden"}>
            <p class="role-panel-note mono">My work as ${esc(role(r).name)}</p>
            ${own.length ? own.map(block).join("") : `<p class="grid-empty">Details for this role are coming soon.</p>`}
          </div>`;
        })
        .join("")}`;

  const sections = p.sections.filter((s) => !multi || !s.role).map(block).join("") + tabs;

  // "More projects": others sharing a role first, then the rest.
  const others = D.projects.filter((x) => x.id !== p.id);
  const more = [
    ...others.filter((x) => x.roles.some((r) => p.roles.includes(r))),
    ...others.filter((x) => !x.roles.some((r) => p.roles.includes(r)))
  ].slice(0, 3);

  main.innerHTML = `
    <section class="hero">
      <div class="container">
        <a class="crumb reveal" data-fx="left" href="index.html?role=${primary.id}#work">Portfolio /</a>
        <h1 class="display hero-title reveal ${p.title.length > 12 ? "is-long" : ""}" data-fx="chars">${esc(p.title)}</h1>
        <div class="tag-row reveal" data-fx="stagger">${p.tags.map((t) => `<span class="tag mono">${esc(t)}</span>`).join("")}</div>
        <div class="summary-box reveal" data-fx="clip">
          <p>${esc(p.summary)}<span class="meta mono">${esc(p.org)} · ${esc(p.period)}</span></p>
          ${
            p.link
              ? `<a class="btn btn-dark" href="${esc(p.link)}" target="_blank" rel="noopener">Live project ${icons.arrow.replace("<svg", '<svg width="16" height="16"')}</a>`
              : `<a class="btn btn-dark" href="index.html?role=${primary.id}#work">More ${esc(primary.short)} work</a>`
          }
        </div>
      </div>
    </section>

    <section class="mockup container reveal">${mockup}</section>

    <section class="section" style="padding-top:clamp(48px,7vw,88px)">
      <div class="container">
        <div class="case-intro reveal"><span class="mono" style="color:var(--muted)">Overview</span><p>${esc(p.intro)}</p></div>
        <dl class="meta-grid reveal" data-fx="stagger">${meta}</dl>
        ${stats}
        ${sections}
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <h2 class="display section-title reveal" data-fx="words">More projects</h2>
        <div class="grid">${more.map((x) => card(x)).join("")}</div>
      </div>
    </section>`;

  // Tilt the mockup flat as it scrolls into view (like the reference site).
  const frame = main.querySelector(".mockup-frame");
  if (window.FX) {
    FX.tilt(frame);
  } else if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let ticking = false;
    const update = () => {
      const r = frame.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.75)));
      frame.style.setProperty("--t", t.toFixed(3));
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    addEventListener("resize", update);
    update();
  } else {
    frame.style.setProperty("--t", "1");
  }

  // Tab switching (click or arrow keys).
  const tabList = main.querySelector(".role-tabs");
  if (tabList) {
    const select = (btn, focus) => {
      const r = btn.dataset.role;
      tabList.querySelectorAll(".role-tab").forEach((b) => {
        const on = b === btn;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        main.querySelector(`#panel-${b.dataset.role}`).hidden = !on;
      });
      if (focus) btn.focus();
      const panel = main.querySelector(`#panel-${r}`);
      if (window.FX && window.Motion) Motion.animate(panel, { opacity: [0, 1], y: [16, 0] }, { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] });
      reveal(panel);
      const url = new URL(location.href);
      url.searchParams.set("tab", r);
      history.replaceState(null, "", url);
    };
    tabList.addEventListener("click", (e) => {
      const b = e.target.closest(".role-tab");
      if (b) select(b);
    });
    tabList.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const all = [...tabList.querySelectorAll(".role-tab")];
      const i = all.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      select(all[(i + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length], true);
    });
  }

  reveal();
})();
