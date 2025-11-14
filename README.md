# Dementia Resource Hub

The **Dementia Resource Hub** is a simple, static website that brings together
dementia-related PDFs and helpful links on one easy-to-browse page.

It was created primarily as a **personal way to organise information** that can
otherwise be hard to find across many different websites. It is not an official
site of any organisation.

---

## Overview

The site provides:

- **PDF guides** about dementia, services, supports, activities, and planning
- **Links to external websites** such as dementia services, information pages,
  and carer supports
- Basic **search and filtering**, so people can quickly find PDFs or links
- Several **accessibility features** to support different reading needs

The page is built as a single, static HTML file using **Bootstrap 5** and can be
hosted on any static web hosting service (e.g. GitHub Pages, Vercel, Netlify).

---

## Features

- 🧠 **PDF Resources**

  - Dublin dementia services
  - Living Well with Dementia programme information
  - Activity ideas and Life Story Book guidance
  - Supportive memory e-guide and carer resources
  - Local guides such as the Memory Guide – Tipperary
  - ASI privacy and information leaflets

- 🌐 **Helpful Websites**

  - Alzheimer Society of Ireland
  - Dementia: Understand Together
  - ASI resources, carer training, and online supports
  - Virtual Dementia Hub
  - Irish Dementia Café Network  
    _(and others as configured in `index.html`)_

- ♿ **Accessibility**
  - **A+ / A−** buttons to increase or decrease text size
  - **OpenDyslexic** font toggle for a dyslexia-friendly typeface (optional)
  - **High contrast mode** (dark background, light text) to support WCAG AA-level contrast
  - Keyboard-accessible layout and visible focus outlines
  - “Skip to main content” link for screen reader and keyboard users

---

## Important Notes About the Content

- **Service delivery, referral pathways, contact details and opening times can change.**  
  Information in the PDFs and on external websites may go out of date.

- The site is intended as a **starting point for information**, not a
  replacement for professional advice.

- **People should always contact services directly** (e.g. dementia advisors,
  local coordinators, support groups, Memory Harbour, etc.) to:

  - confirm availability,
  - check referral criteria,
  - and get the most up-to-date details for their area.

- If any organisation prefers that a leaflet or link is not included, it can be
  **removed or updated** easily by editing `index.html`.

---

## Project Structure

```text
DementiaResourceHub/
├── index.html          # Main page
├── css/
│   └── style.css       # Custom styles, including high contrast and OpenDyslexic
├── js/
│   └── script.js       # Accessibility controls, search/filter, PDF previews
├── pdf/                # PDF resources (guides, leaflets, service info)
└── fonts/
    └── OpenDyslexic-Regular.woff2  # (optional) dyslexia-friendly font
```
