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

  const LS = {
    fontScale: "drh-font-scale",
    dyslexic: "drh-dyslexic",
    contrast: "drh-contrast",
  };

  function announce(msg) {
    if (!live) return;
    // Clear then set so repeated messages still get announced
    live.textContent = "";
    window.setTimeout(() => (live.textContent = msg), 10);
  }

  // -----------------------
  // Font scaling
  // -----------------------
  const base = 100;
  let scale = parseInt(localStorage.getItem(LS.fontScale) || String(base), 10);

  function clamp(v) {
    return Math.min(140, Math.max(85, v));
  }

  function applyScale() {
    body.style.fontSize = scale + "%";
  }

  if (btnUp) {
    btnUp.addEventListener("click", () => {
      scale = clamp(scale + 5);
      localStorage.setItem(LS.fontScale, String(scale));
      applyScale();
      announce("Text size increased");
    });
  }

  if (btnDown) {
    btnDown.addEventListener("click", () => {
      scale = clamp(scale - 5);
      localStorage.setItem(LS.fontScale, String(scale));
      applyScale();
      announce("Text size decreased");
    });
  }

  applyScale();

  // -----------------------
  // Dyslexic font toggle
  // -----------------------
  let dys = localStorage.getItem(LS.dyslexic) === "1";

  function applyDys(val) {
    body.classList.toggle("odx-font", val);
    if (btnDys) btnDys.setAttribute("aria-pressed", String(val));
    announce(val ? "Dyslexic-friendly font on" : "Dyslexic-friendly font off");
  }

  applyDys(dys);

  if (btnDys) {
    btnDys.addEventListener("click", () => {
      dys = !dys;
      localStorage.setItem(LS.dyslexic, dys ? "1" : "0");
      applyDys(dys);
    });
  }

  // -----------------------
  // High contrast toggle
  // -----------------------
  let hc = localStorage.getItem(LS.contrast) === "1";

  function setHCLabel(val) {
    if (!btnHC) return;
    // label reflects current state
    btnHC.textContent = val ? "High contrast on" : "High contrast off";
  }

  function applyHC(val) {
    body.classList.toggle("high-contrast", val);
    if (btnHC) btnHC.setAttribute("aria-pressed", String(val));
    setHCLabel(val);
    announce(val ? "High contrast on" : "High contrast off");
  }

  applyHC(hc);

  if (btnHC) {
    btnHC.addEventListener("click", () => {
      hc = !hc;
      localStorage.setItem(LS.contrast, hc ? "1" : "0");
      applyHC(hc);
    });
  }

  // -----------------------
  // Search + filter
  // -----------------------
  function matchItem(el, query, type) {
    const t = (
      (el.dataset.title || "") +
      " " +
      (el.dataset.desc || "")
    ).toLowerCase();
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

    if (pdfCount)
      pdfCount.textContent = `${pdfVisible} PDF${pdfVisible === 1 ? "" : "s"}`;
    if (linkCount)
      linkCount.textContent = `${linkVisible} link${
        linkVisible === 1 ? "" : "s"
      }`;
  }

  if (searchInput) searchInput.addEventListener("input", update);
  if (categorySelect) categorySelect.addEventListener("change", update);
  update();

  // -----------------------
  // Preview toggles for PDFs (FIXED)
  // -----------------------
  document.querySelectorAll(".btnPreview").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("aria-controls");
      const preview = id ? document.getElementById(id) : null;

      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const willExpand = !isExpanded;

      btn.setAttribute("aria-expanded", String(willExpand));

      if (preview) {
        preview.classList.toggle("visually-hidden", !willExpand);
        preview.setAttribute("aria-hidden", String(!willExpand));
      }

      announce(willExpand ? "Preview shown" : "Preview hidden");
    });
  });

  // -----------------------
  // Year in footer
  // -----------------------
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
})();
