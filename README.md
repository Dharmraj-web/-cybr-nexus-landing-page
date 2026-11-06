# CYBR//NEXUS — Beyond Human

A responsive, futuristic cyborg-themed landing page built as a polished front-end portfolio task for the IIT Bombay Techfest Student Ambassador application.

## Features
- Responsive desktop, tablet, and mobile layouts
- Neon-lime / cyber-teal visual system, dark grid, scanline overlay, and animated orbital cyborg core
- Sticky-feeling top navigation with mobile menu
- Interactive module selector (Neural Sync, Optic Overdrive, Kinetic Engine)
- Scroll reveal animations, animated ticker, diagnostic dashboard, and CTA section
- Semantic HTML, accessible navigation labels, reduced-motion support, and no framework dependency

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. For a local development server, open the folder in VS Code and use the Live Server extension, or run `python -m http.server 8000` from this directory and visit `http://localhost:8000`.

## Project structure
- `index.html` — page content and structure
- `style.css` — responsive styling and animations
- `script.js` — navigation, scroll reveal, and module interactions

## Customization notes
- Edit the copy and sections in `index.html`.
- Update colors in the `:root` variables at the top of `style.css`.
- Change module labels and descriptions in the `moduleContent` object in `script.js`.

## Submission checklist
- [ ] Push all three source files and this README to a **public** GitHub repository.
- [ ] Test at desktop and mobile widths.
- [ ] Record a 45–90 second demo showing the hero, responsive menu, module switching, and scroll sections.
- [ ] Upload the demo to Google Drive and set **General access → Anyone with the link → Viewer**.
- [ ] Submit the GitHub repository URL and Google Drive video URL in the application form.

## Attribution / honesty
This is a fictional creative concept. The page is not an official IIT Bombay Techfest website and does not claim to represent an actual product or organization. Google Fonts are loaded from Google Fonts when internet access is available; fallback fonts are defined.


## Task 2 — Build in 3D

The Task 2 upgrade adds a real-time interactive 3D cybernetic core using Three.js. Users can drag to rotate the object and scroll to zoom. The scene includes a faceted metallic core, illuminated energy nucleus, orbital rings, sensor nodes, star particles, and responsive rendering. It preserves the original CYBR//NEXUS identity from Task 1.

### Technology
- HTML5, CSS3, vanilla JavaScript
- Three.js 0.180.0 via jsDelivr ES modules
- OrbitControls for pointer/touch rotation and zoom
- ResizeObserver for responsive canvas sizing

### Run locally
Because the 3D scene uses JavaScript modules, run the folder through a local server rather than opening `index.html` directly. In VS Code, use the Live Server extension, or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`. Internet access is needed to load Three.js from the CDN.

### Task 2 demo points
1. Show the 3D core in the hero section.
2. Drag the core to rotate it.
3. Scroll over the scene to zoom in/out.
4. Resize the browser to show responsive 3D rendering.
5. Show that the original Task 1 sections and visual identity remain intact.
