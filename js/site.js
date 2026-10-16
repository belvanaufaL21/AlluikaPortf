// Shared helpers: header, contact footer, project cards and scroll reveal.
(function () {
  const D = window.PORTFOLIO;
  document.documentElement.classList.add("js");

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Unsplash ID -> URL; anything that looks like a path is used as-is.
  const img = (src, w = 1600) =>
    /^\d+-[0-9a-f]+$/.test(src)
      ? `https://images.unsplash.com/photo-${src}?auto=format&fit=crop&w=${w}&q=75`
      : src;

  const role = (id) => D.roles.find((r) => r.id === id);

  const icons = {
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21h-4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>'
  };

  function header() {
    const p = D.person;
    return `
      <header class="site-header">
        <a class="brand" href="index.html" aria-label="${esc(p.name)}, home">
          <img src="assets/img/avatar.jpg" alt="" width="40" height="40">
          <span class="brand-text"><strong>${esc(p.short)}</strong><span>${esc(p.headline)}</span></span>
        </a>
        <nav class="nav" aria-label="Main">
          <a href="index.html#work">Work</a>
          <a href="index.html#about">About</a>
          <a class="btn" href="#contact"><span class="ico">${icons.send}</span>Let's talk</a>
        </nav>
      </header>`;
  }

  function contact() {
    const p = D.person;
    const chips = D.roles.map((r) => `<span class="tag mono">${esc(r.short)}</span>`).join("");
    return `
      <section class="contact" id="contact">
        <div class="container">
          <p class="contact-lead reveal" data-fx="left">Need a product that's designed right and works right?</p>
          <h2 class="display contact-title reveal" data-fx="words">Let's build<br><em>it</em> together</h2>
          <div class="contact-chips reveal" data-fx="stagger">${chips}</div>
          <div class="contact-row reveal">
            <p>I care about the parts nobody sees: clear user flows, documentation people actually read, acceptance criteria that mean something, and catching the edge case before it reaches production.</p>
            <div class="contact-actions">
              <a class="btn" href="mailto:${esc(p.email)}"><span class="ico">${icons.send}</span>${esc(p.email)}</a>
              <a class="btn btn-ghost btn-icon" href="${esc(p.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">${icons.linkedin}</a>
              <a class="btn btn-ghost btn-icon" href="${esc(p.instagram)}" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">${icons.instagram}</a>
            </div>
          </div>
          <div class="foot mono">
            <span>© ${new Date().getFullYear()} ${esc(p.name)}</span>
            <span>${esc(p.location)}</span>
          </div>
        </div>
      </section>`;
  }

  function rolePills(ids) {
    return ids
      .map((id) => role(id))
      .filter(Boolean)
      .map((r) => `<span class="role-pill mono" style="--role:${r.color}">${esc(r.short)}</span>`)
      .join("");
  }

  // `tab` opens a multi-role project on that role's tab.
  function card(p, tab) {
    return `
      <a class="card reveal" data-fx="card" href="project.html?p=${encodeURIComponent(p.id)}${tab && p.roles.length > 1 && p.roles.includes(tab) ? `&tab=${tab}` : ""}">
        <div class="card-media tone">
          <img src="${img(p.cover, 900)}" alt="" loading="lazy">
          <div class="card-roles">${rolePills(p.roles)}</div>
        </div>
        <div class="card-body">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
          <div class="card-tags mono">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="card-foot">
            <span class="mono">${esc(p.period)}</span>
            <span class="btn">Details</span>
          </div>
        </div>
      </a>`;
  }

  let observer;
  function reveal(root = document) {
    if (window.FX) return window.FX.reveal(root);
    const els = root.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    observer =
      observer ||
      new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              observer.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
    els.forEach((el) => observer.observe(el));
  }

  function mount() {
    document.body.insertAdjacentHTML("afterbegin", header());
    document.body.insertAdjacentHTML("beforeend", contact());
    if (window.FX) window.FX.chrome();
  }

  window.Site = { D, esc, img, role, icons, card, rolePills, reveal, mount };
})();
