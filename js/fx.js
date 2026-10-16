/*
 * Animations, powered by Motion (motion.dev): the plain-JavaScript version of
 * Framer Motion, so it works without React.
 *
 * Elements opt in with class="reveal" plus data-fx="<effect>" (default: rise).
 * If Motion doesn't load, or the visitor prefers reduced motion, window.FX stays
 * undefined and site.js falls back to a simple CSS fade-in.
 */
(function () {
  const M = window.Motion;
  if (!M || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const { animate, inView, scroll, stagger, hover, press } = M;
  document.documentElement.classList.add("has-motion");

  const EASE = [0.2, 0.7, 0.2, 1];
  const IN_OUT = [0.65, 0, 0.35, 1];
  const SPRING = { type: "spring", bounce: 0.3, duration: 0.8 };

  const show = (el) => (el.style.opacity = "1");
  const hide = (els) => els.forEach((e) => (e.style.opacity = "0"));

  // Wrap words (or characters) in masks so they can slide up from below.
  // Children marked data-split-skip are left whole and "dropped" in afterwards.
  function split(el, mode) {
    const inner = [];
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) return frag.append(tok);
            const word = document.createElement("span");
            word.className = "split-word";
            (mode === "chars" ? [...tok] : [tok]).forEach((part) => {
              const mask = document.createElement("span");
              const s = document.createElement("span");
              mask.className = "split-mask";
              s.textContent = part;
              mask.append(s);
              word.append(mask);
              inner.push(s);
            });
            frag.append(word);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR" && !n.hasAttribute("data-split-skip")) {
          walk(n);
        }
      });
    };
    walk(el);
    return inner;
  }

  function textFx(el, mode, gap) {
    const parts = split(el, mode);
    const extras = [...el.querySelectorAll("[data-split-skip]")];
    const emph = [...el.querySelectorAll("em .split-mask > span")];
    parts.forEach((p) => (p.style.transform = "translateY(110%)"));
    hide(extras);
    show(el);
    return () => {
      const total = parts.length * gap + 0.5;
      animate(parts, { y: ["110%", "0%"] }, { duration: 0.9, ease: EASE, delay: stagger(gap) });
      extras.forEach((x) =>
        animate(x, { opacity: [0, 1], y: [-160, 0] }, { type: "spring", bounce: 0.55, duration: 1, delay: total })
      );
      if (emph.length)
        animate(emph, { rotate: [0, -8, 0], scale: [1, 1.18, 1] }, { duration: 0.7, ease: EASE, delay: total });
    };
  }

  // Animate a set of descendants with a stagger; the container itself just appears.
  function group(el, selector, keyframes, options, gap) {
    const items = selector ? [...el.querySelectorAll(selector)] : [...el.children];
    hide(items);
    show(el);
    return () => animate(items, keyframes, { ...options, delay: stagger(gap) });
  }

  const effects = {
    rise: (el) => () => animate(el, { opacity: [0, 1], y: [28, 0] }, { duration: 0.8, ease: EASE }),
    left: (el) => () => animate(el, { opacity: [0, 1], x: [-24, 0] }, { duration: 0.7, ease: EASE }),
    words: (el) => textFx(el, "words", 0.07),
    chars: (el) => textFx(el, "chars", 0.03),

    clip: (el) => {
      show(el);
      el.style.clipPath = "inset(0% 100% 0% 0% round 22px)";
      return () =>
        animate(el, { clipPath: ["inset(0% 100% 0% 0% round 22px)", "inset(0% 0% 0% 0% round 22px)"] }, { duration: 1.1, ease: IN_OUT });
    },

    // About photo: wipes up, then on hover only the cut-out of me moves (the backdrop stays still).
    photo: (el) => {
      const imgs = [...el.querySelectorAll("img")];
      const person = el.querySelector(".ph-person");
      show(el);
      el.style.clipPath = "inset(100% 0% 0% 0%)";
      if (person) {
        hover(el, () => {
          animate(person, { scale: 1.07, rotate: -1.5 }, SPRING);
          const follow = (e) => {
            const r = el.getBoundingClientRect();
            const dx = (e.clientX - r.left) / r.width - 0.5;
            animate(person, { x: dx * 28, rotate: -1.5 + dx * 3 }, { type: "spring", bounce: 0.2, duration: 0.6 });
          };
          el.addEventListener("pointermove", follow);
          return () => {
            el.removeEventListener("pointermove", follow);
            animate(person, { scale: 1, rotate: 0, x: 0 }, SPRING);
          };
        });
      }
      return () => {
        animate(el, { clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] }, { duration: 1.2, ease: IN_OUT });
        animate(imgs, { scale: [1.35, 1] }, { duration: 1.8, ease: EASE });
      };
    },

    // Case-study images: wipe in, then drift slightly as the page scrolls.
    figure: (el) => {
      const img = el.querySelector("img");
      show(el);
      el.style.clipPath = "inset(0% 0% 100% 0%)";
      scroll((p) => (img.style.transform = `translateY(${(p - 0.5) * 10}%) scale(1.14)`), {
        target: el,
        offset: ["start end", "end start"]
      });
      return () => animate(el, { clipPath: ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"] }, { duration: 1.1, ease: IN_OUT });
    },

    stagger: (el) => group(el, null, { opacity: [0, 1], y: [16, 0] }, { duration: 0.5, ease: EASE }, 0.06),
    pop: (el) => group(el, null, { opacity: [0, 1], scale: [0.6, 1] }, { type: "spring", bounce: 0.45, duration: 0.7 }, 0.1),
    skills: (el) => group(el, ".about-label, .skill-group", { opacity: [0, 1], x: [-36, 0] }, { duration: 0.6, ease: EASE }, 0.07),
    edu: (el) => group(el, ".about-label, .edu", { opacity: [0, 1], x: [-20, 0] }, { duration: 0.6, ease: EASE }, 0.12),
    awards: (el) =>
      group(el, ".about-label, .award", { opacity: [0, 1], y: [50, 0], rotate: [-5, 0] }, { type: "spring", bounce: 0.35, duration: 0.9 }, 0.14),
    certs: (el) => group(el, ".about-label, .cert", { opacity: [0, 1], y: [14, 0] }, { duration: 0.5, ease: EASE }, 0.05),

    card: (el) => {
      const i = [...el.parentNode.children].indexOf(el);
      return () =>
        animate(el, { opacity: [0, 1], y: [50, 0], scale: [0.96, 1] }, { type: "spring", bounce: 0.25, duration: 0.9, delay: (i % 3) * 0.08 });
    },

    // Timeline: content slides in while a red line sweeps along the row.
    row: (el) => {
      const line = el.querySelector(".tl-line");
      const parts = [...el.children].filter((c) => c !== line);
      hide(parts);
      show(el);
      return () => {
        animate(parts, { opacity: [0, 1], x: [-40, 0] }, { duration: 0.7, ease: EASE, delay: stagger(0.08) });
        animate(line, { scaleX: [0, 1] }, { duration: 0.9, ease: IN_OUT }).then(() =>
          animate(line, { opacity: [1, 0] }, { duration: 0.8 })
        );
      };
    },

    // Big numbers count up.
    count: (el) => {
      const b = el.querySelector("b");
      const n = parseInt(b.textContent, 10);
      if (Number.isNaN(n) || String(n) !== b.textContent.trim()) return effects.rise(el);
      b.textContent = "0";
      return () => {
        animate(el, { opacity: [0, 1], y: [28, 0] }, { duration: 0.7, ease: EASE });
        animate(0, n, { duration: 1.4, ease: EASE, onUpdate: (v) => (b.textContent = Math.round(v)) });
      };
    },

    // Code sample "types" in line by line.
    code: (el) => {
      const lines = [...el.querySelectorAll(".line")];
      hide(lines);
      return () => {
        animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: EASE });
        animate(lines, { opacity: [0, 1], x: [-12, 0] }, { duration: 0.4, ease: EASE, delay: stagger(0.12, { startDelay: 0.3 }) });
      };
    },

    role: (el) => roleCard(el)
  };

  // ---------- Role cards: each has its own entrance and hover ----------
  const roleFx = {
    uiux(el) {
      const boards = [...el.querySelectorAll(".board")];
      const cursor = el.querySelector(".cursor");
      const fan = (spread) =>
        boards.forEach((b, i) => animate(b, { rotate: (i - 1) * 9 * spread, x: (i - 1) * 44 * spread }, SPRING));
      return {
        enter: { opacity: [0, 1], x: [-70, 0] },
        play() {
          animate(boards, { opacity: [0, 1], y: [40, 0] }, { duration: 0.6, ease: EASE, delay: stagger(0.1, { startDelay: 0.2 }) });
          setTimeout(() => fan(1), 600);
          animate(cursor, { x: [-90, 30, 0], y: [60, -10, 0], opacity: [0, 1, 1] }, { duration: 1.4, ease: EASE, delay: 0.7 });
        },
        hover() {
          fan(1.5);
          animate(cursor, { rotate: [0, -14, 0] }, { duration: 0.5 });
          return () => fan(1);
        }
      };
    },
    sa(el) {
      const edges = [...el.querySelectorAll(".edge")];
      const nodes = [...el.querySelectorAll(".node")];
      edges.forEach((e) => (e.style.strokeDashoffset = "1"));
      hide(nodes);
      return {
        enter: { opacity: [0, 1], y: [50, 0], rotate: [-5, 0] },
        play() {
          animate(nodes, { opacity: [0, 1], scale: [0, 1] }, { type: "spring", bounce: 0.5, duration: 0.6, delay: stagger(0.12, { startDelay: 0.3 }) });
          animate(edges, { strokeDashoffset: [1, 0] }, { duration: 0.6, ease: IN_OUT, delay: stagger(0.15, { startDelay: 0.6 }) });
        },
        hover() {
          animate(nodes, { scale: [1, 1.35, 1] }, { duration: 0.45, delay: stagger(0.08) });
        }
      };
    },
    pbd(el) {
      const bars = [...el.querySelectorAll(".bars i")];
      const trend = el.querySelector(".trend path");
      bars.forEach((b) => (b.style.transform = "scaleY(0)"));
      trend.style.strokeDashoffset = "1";
      return {
        enter: { opacity: [0, 1], y: [90, 0] },
        play() {
          animate(bars, { scaleY: [0, 1] }, { type: "spring", bounce: 0.35, duration: 0.9, delay: stagger(0.1, { startDelay: 0.3 }) });
          animate(trend, { strokeDashoffset: [1, 0] }, { duration: 1, ease: IN_OUT, delay: 0.9 });
        },
        hover() {
          animate(bars, { scaleY: [1, 1.14, 1] }, { duration: 0.5, delay: stagger(0.06) });
        }
      };
    },
    qa(el) {
      const ticks = [...el.querySelectorAll(".tick")];
      const rows = [...el.querySelectorAll(".check-row")];
      ticks.forEach((t) => (t.style.strokeDashoffset = "1"));
      hide(rows);
      const check = (d = 0) => animate(ticks, { strokeDashoffset: [1, 0] }, { duration: 0.4, ease: EASE, delay: stagger(0.25, { startDelay: d }) });
      return {
        enter: { opacity: [0, 1], rotateX: [70, 0], transformPerspective: 900 },
        play() {
          animate(rows, { opacity: [0, 1], x: [-20, 0] }, { duration: 0.5, ease: EASE, delay: stagger(0.1, { startDelay: 0.3 }) });
          check(0.8);
        },
        hover() {
          check();
        }
      };
    },
    webdev(el) {
      const lines = [...el.querySelectorAll(".code-lines i")];
      const caret = el.querySelector(".caret");
      const brackets = [...el.querySelectorAll(".win-bar b")];
      lines.forEach((l) => (l.style.transform = "scaleX(0)"));
      const type = (d = 0) => animate(lines, { scaleX: [0, 1] }, { duration: 0.35, ease: EASE, delay: stagger(0.15, { startDelay: d }) });
      return {
        enter: { opacity: [0, 1], x: [70, 0] },
        play() {
          type(0.4);
          animate(caret, { opacity: [1, 0, 1] }, { duration: 1, repeat: Infinity, ease: "linear" });
        },
        hover() {
          brackets.forEach((b, i) => animate(b, { x: (i - 1) * 6 }, SPRING));
          type();
          return () => animate(brackets, { x: 0 }, SPRING);
        }
      };
    }
  };

  function roleCard(el) {
    const id = el.dataset.role;
    const fx = roleFx[id] ? roleFx[id](el) : { enter: { opacity: [0, 1], y: [28, 0] }, play() {} };
    const i = [...el.parentNode.children].indexOf(el);

    hover(el, () => {
      animate(el, { y: -8 }, SPRING);
      const end = fx.hover && fx.hover();
      return () => {
        animate(el, { y: 0 }, SPRING);
        if (typeof end === "function") end();
      };
    });

    return () => {
      animate(el, fx.enter, { duration: 0.9, ease: EASE, delay: i * 0.08 });
      setTimeout(() => fx.play(), i * 80);
    };
  }

  // ---------- Public API ----------
  function reveal(root = document) {
    root.querySelectorAll(".reveal:not([data-fx-bound])").forEach((el) => {
      el.setAttribute("data-fx-bound", "");
      const make = effects[el.dataset.fx] || effects.rise;
      const play = make(el);
      inView(el, () => void play(), { margin: "0px 0px -10% 0px" });
    });
  }

  function chrome() {
    // Header drops in.
    const header = document.querySelector(".site-header");
    if (header) animate(header, { opacity: [0, 1], y: [-90, 0] }, { type: "spring", bounce: 0.35, duration: 1, delay: 0.1 });

    // Red scroll-progress bar.
    const bar = document.createElement("div");
    bar.className = "progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.append(bar);
    scroll((p) => (bar.style.transform = `scaleX(${p})`));

    // Small press feedback on buttons.
    press(".btn, .chip, .skill-group", (el) => {
      animate(el, { scale: 0.94 }, { duration: 0.12 });
      return () => animate(el, { scale: 1 }, { type: "spring", bounce: 0.5, duration: 0.4 });
    });

    // Endless role ticker.
    document.querySelectorAll(".marquee-track").forEach((t) =>
      animate(t, { x: ["0%", "-50%"] }, { duration: 40, ease: "linear", repeat: Infinity })
    );
  }

  // Project mockup flattens as it scrolls into view.
  function tilt(frame) {
    scroll((p) => frame.style.setProperty("--t", p.toFixed(3)), { target: frame, offset: ["start end", "end end"] });
  }

  function dialog(d) {
    // Move the dialog box itself (not its contents) so nothing overflows and shows scrollbars.
    const chips = [...d.querySelectorAll(".skill")];
    animate(d, { opacity: [0, 1], y: [40, 0], scale: [0.95, 1] }, { type: "spring", bounce: 0.3, duration: 0.6 });
    animate(chips, { opacity: [0, 1], scale: [0.85, 1] }, { duration: 0.35, ease: EASE, delay: stagger(0.035, { startDelay: 0.15 }) });
  }

  window.FX = { reveal, chrome, tilt, dialog };
})();
