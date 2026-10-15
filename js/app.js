(function () {
  "use strict";

  var pages = document.querySelectorAll(".page");
  var main = document.querySelector(".main");
  var nav = document.querySelector(".nav");

  function show(id) {
    var target = document.getElementById("page-" + id) ? id : "home";
    pages.forEach(function (p) {
      var on = p.id === "page-" + target;
      p.classList.toggle("is-active", on);
      p.querySelectorAll("video").forEach(function (v) {
        if (on) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else { v.pause(); }
      });
    });

    document.querySelectorAll("[data-go]").forEach(function (el) {
      if (!el.classList.contains("nav__item") && !el.classList.contains("nav__child")) return;
      var go = el.getAttribute("data-go");
      var active = go === target || (el.classList.contains("nav__item") && target.indexOf(go + "-") === 0);
      el.classList.toggle("is-active", active);
    });
    var group = document.querySelector(".nav__group");
    if (group && target.indexOf("real") === 0) group.classList.add("is-open");

    main.scrollTop = 0;
    reveal(document.getElementById("page-" + target));
  }

  function route() { show((location.hash || "#home").slice(1)); }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-toggle]");
    if (t && e.target.closest(".nav__chev")) { t.closest(".nav__group").classList.toggle("is-open"); return; }
    var el = e.target.closest("[data-go]");
    if (!el) return;
    e.preventDefault();
    var id = el.getAttribute("data-go");
    if (location.hash === "#" + id) route(); else location.hash = id;
  });

  var toggle = document.getElementById("nav-toggle");
  if (toggle) toggle.addEventListener("click", function () { nav.classList.toggle("is-collapsed"); });

  /* Entrance reveal */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { root: main, threshold: 0.12 }) : null;

  function reveal(page) {
    if (!page) return;
    page.querySelectorAll(".rv").forEach(function (el) {
      el.classList.remove("in");
      if (io) { io.observe(el); } else { el.classList.add("in"); }
    });
  }

  /* Demo buttons from config.js */
  var urls = window.DEMO_URLS || {};
  var target = window.DEMO_TARGET || "_top";
  document.querySelectorAll("[data-demo]").forEach(function (a) {
    var key = a.getAttribute("data-demo");
    var url = urls[key];
    if (url && !/^REPLACE/.test(url)) {
      a.setAttribute("href", url);
      a.setAttribute("target", target);
      a.setAttribute("rel", "noopener");
    } else {
      a.classList.add("is-unset");
      a.setAttribute("title", "Add this demo link in js/config.js (DEMO_URLS." + key + ")");
      a.addEventListener("click", function (e) { e.preventDefault(); toast("Demo link not set. Add it in js/config.js under DEMO_URLS." + key + "."); });
    }
  });

  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("is-on"); }, 3200);
  }

  /* Lightbox for screenshots */
  var lb = document.getElementById("lightbox");
  var lastShot = null;
  function closeLb() { if (!lb || lb.hidden) return; lb.hidden = true; if (lastShot) lastShot.focus(); }
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".shot");
    if (b && lb) {
      lastShot = b;
      var img = lb.querySelector("img");
      img.src = b.getAttribute("data-full");
      img.alt = b.querySelector("img").alt;
      lb.querySelector(".lightbox__cap").textContent = b.querySelector(".shot__cap").textContent;
      lb.hidden = false;
      lb.querySelector(".lightbox__x").focus();
      return;
    }
    if (lb && !lb.hidden && (e.target === lb || e.target.closest(".lightbox__x"))) closeLb();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  window.addEventListener("hashchange", closeLb);

  /* Hub phases: expand and collapse */
  function setPhase(hp, open) {
    hp.classList.toggle("is-open", open);
    var b = hp.querySelector(".hp__head"); if (b) b.setAttribute("aria-expanded", open ? "true" : "false");
  }
  document.addEventListener("click", function (e) {
    var h = e.target.closest(".hp__head");
    if (h) { var hp = h.closest(".hp"); setPhase(hp, !hp.classList.contains("is-open")); return; }
    var o = e.target.closest("[data-hub]");
    if (o) {
      e.preventDefault();
      var ids = o.getAttribute("data-hub").split(" "), first = null;
      ids.forEach(function (id) {
        var c = document.getElementById(id); if (!c) return;
        setPhase(c.closest(".hp"), true);
        c.classList.remove("is-flash"); void c.offsetWidth; c.classList.add("is-flash");
        if (!first) first = c;
      });
      if (first) setTimeout(function () { first.scrollIntoView({ behavior: "smooth", block: "center" }); }, 420);
    }
  });

  /* SVG motion in the agents and people visual follows reduced motion */
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("svg.orbit").forEach(function (svg) { if (svg.pauseAnimations) svg.pauseAnimations(); });
  }

  window.addEventListener("hashchange", route);
  route();
})();
