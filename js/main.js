(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var navLinks = document.querySelectorAll(".site-nav a[href^='#']");

  function setHeaderScrolled() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  function closeNav() {
    if (!navToggle || !siteNav) return;
    siteNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function openNav() {
    if (!navToggle || !siteNav) return;
    siteNav.classList.add("is-open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      if (siteNav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          closeNav();
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Animated counters */
  function animateValue(el, target, duration) {
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".stat-number").forEach(function (el) {
        var t = parseInt(el.getAttribute("data-target"), 10);
        if (!isNaN(t)) el.textContent = t;
      });
      return;
    }

    var statSection = document.getElementById("stats");
    if (!statSection) return;

    var done = false;
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || done) return;
          done = true;
          document.querySelectorAll(".stat-number[data-target]").forEach(function (el) {
            var target = parseInt(el.getAttribute("data-target"), 10);
            if (!isNaN(target)) animateValue(el, target, 1400);
          });
          obs.disconnect();
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(statSection);
  }

  initCounters();

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message. We will get back to you soon.");
    });
  }
})();
