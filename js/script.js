(function () {
  const body = document.body;
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const items = Array.from(document.querySelectorAll(".resource-item"));
  const pdfCount = document.getElementById("pdfCount");
  const linkCount = document.getElementById("linkCount");
  const live = document.getElementById("liveRegion");

  // Accessibility controls
  const btnUp = document.getElementById("btnFontUp");
  const btnDown = document.getElementById("btnFontDown");
  const btnDys = document.getElementById("btnDyslexic");
  const btnHC = document.getElementById("btnContrast");
  const contrastBadge = document.getElementById("contrastBadge");

  const LS = {
    fontScale: "drh-font-scale",
    dyslexic: "drh-dyslexic",
    contrast: "drh-contrast",
  };

  function announce(msg) {
    if (live) {
      live.textContent = msg;
    }
  }

  // Font scaling
  const base = 100; // 100% as baseline
  let scale = parseInt(localStorage.getItem(LS.fontScale) || base, 10);

  function applyScale() {
    body.style.fontSize = scale + "%";
  }

  function clamp(v) {
    return Math.min(140, Math.max(85, v));
  }

  if (btnUp) {
    btnUp.addEventListener("click", () => {
      scale = clamp(scale + 5);
      localStorage.setItem(LS.fontScale, scale);
      applyScale();
      announce("Text size increased");
    });
  }

  if (btnDown) {
    btnDown.addEventListener("click", () => {
      scale = clamp(scale - 5);
      localStorage.setItem(LS.fontScale, scale);
      applyScale();
      announce("Text size decreased");
    });
  }

  applyScale();

  // Dyslexic font toggle
  function applyDys(val) {
    body.classList.toggle("odx-font", val);
    if (btnDys) {
      btnDys.setAttribute("aria-pressed", String(val));
    }
    announce(val ? "Dyslexic-friendly font on" : "Dyslexic-friendly font off");
  }

  let dys = localStorage.getItem(LS.dyslexic) === "1";
  applyDys(dys);

  if (btnDys) {
    btnDys.addEventListener("click", () => {
      dys = !dys;
      localStorage.setItem(LS.dyslexic, dys ? "1" : "0");
      applyDys(dys);
    });
  }

  // High contrast
  function applyHC(val) {
    body.classList.toggle("high-contrast", val);
    if (btnHC) {
      btnHC.setAttribute("aria-pressed", String(val));
    }
    if (contrastBadge) {
      contrastBadge.classList.toggle("visually-hidden", !val);
    }
    announce(val ? "High contrast on" : "High contrast off");
  }

  let hc = localStorage.getItem(LS.contrast) === "1";
  applyHC(hc);

  if (btnHC) {
    btnHC.addEventListener("click", () => {
      hc = !hc;
      localStorage.setItem(LS.contrast, hc ? "1" : "0");
      applyHC(hc);

      // Change button text automatically
      btnHC.textContent = hc ? "High contrast off" : "High contrast on";

      // Announce to screen readers
      announce(hc ? "High contrast enabled" : "High contrast disabled");
    });
  }

  // Search + filter
  function matchItem(el, query, type) {
    const t = (el.dataset.title + " " + el.dataset.desc).toLowerCase();
    const okQuery = t.includes(query);
    const okType = type === "all" || el.dataset.type === type;
    return okQuery && okType;
  }

  function update() {
    const q = (searchInput?.value || "").toLowerCase().trim();
    const type = categorySelect?.value || "all";
    let pdfVisible = 0,
      linkVisible = 0;

    items.forEach((el) => {
      const show = matchItem(el, q, type);
      el.classList.toggle("d-none", !show);
      if (show) {
        if (el.dataset.type === "pdf") pdfVisible++;
        else linkVisible++;
      }
    });

    if (pdfCount) {
      pdfCount.textContent =
        pdfVisible + " PDF" + (pdfVisible === 1 ? "" : "s");
    }
    if (linkCount) {
      linkCount.textContent =
        linkVisible + " link" + (linkVisible === 1 ? "" : "s");
    }
  }

  if (searchInput) searchInput.addEventListener("input", update);
  if (categorySelect) categorySelect.addEventListener("change", update);
  update();

  // Preview toggles for PDFs
  document.querySelectorAll(".btnPreview").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("aria-controls");
      const preview = id ? document.getElementById(id) : null;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      if (preview) {
        preview.classList.toggle("visually-hidden", expanded);
        preview.setAttribute("aria-hidden", String(expanded));
      }
      announce(expanded ? "Preview hidden" : "Preview shown");
    });
  });

  // Year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
