# NUTECH Rubber Solutions

A custom responsive website concept for Nutechrubber, focused on rubber solutions for offset printing. Built with semantic HTML, CSS, and JavaScript. GSAP 3.15.0 and ScrollTrigger provide the motion layer. Their distribution files are self-hosted in `assets/vendor/`, so the committed site runs without a build step or an external CDN.

## Current design

The October 2026 editorial redesign covers all ten pages: the homepage, Meiwa profile, technology overview, India opportunity and six individual roller categories. [DESIGN-REVIEW.md](DESIGN-REVIEW.md) records the audit and implemented changes for each page. `site-design.css` owns shared visual tokens and homepage refinements; `detail-pages.css` owns the supporting-page layouts. Product pages use the original roller imagery, labeled range tables and application-specific enquiry guides. The India equipment image is removed, and About NUTECH links directly to the India page. Product tilt is removed; the applications tabs remain static and manual.

Use `npm run build` for production output: all ten HTML pages, their CSS/JavaScript and `assets/` are validated and copied to `dist/`. Vercel serves that directory. Original source attachments and local screenshots remain outside the published output.

## Preview

Requires Node.js 20.11 or newer.

```sh
npm run dev
```

Open http://localhost:3000. Set `PORT` if a different local port is needed. `npm run check` checks JavaScript syntax. Deploy `index.html`, `styles.css`, `motion.css`, `app.js`, `motion.js`, and `assets/` to any static host. `server.mjs` is a local preview server, not a production backend.

## Design direction and reference audit

Reference: https://www.meiwa-rubber.co.jp/

The reference provides useful product classification, technical discovery, and a delivery process. Its dense persistent sidebar, rotating hero, competing promotional blocks, and extensive product navigation divide attention. NUTECH uses one clear opening message, focused product discovery, an engineering explanation, application-specific guidance, and a direct enquiry action.

The current higher-resolution user-supplied NUTECH logo is copied unchanged to `assets/nutech-logo-hires.png` and displayed in the header and footer. CSS frames the mark within its large white canvas. The earlier supplied logo is retained in `assets/nutech-logo.png`. Navy and blue lead the design, balanced with pale neutral surfaces, fine borders, square buttons, and restrained Arial/Helvetica typography. Illustrative roller drawings and a cross-section schematic connect the sections. Masked text reveals, restrained product depth, and scroll-linked engineering sequences form a consistent motion language. Reduced-motion preferences remove the motion layer. The applications section stays static for every motion preference.

## Company content and source material

The company update uses the user-supplied `Meiwa_Rubber_India_Presentation.pptx` and three JPEG images. [CONTENT-SOURCES.md](CONTENT-SOURCES.md) records slide-level provenance and attribution decisions. Meiwa’s founding history is also supported by its official company pages.

The site describes Meiwa’s inking, dampening, industrial, and specialty roller ranges. These are explicitly attributed to Meiwa, rather than presented as NUTECH-owned product brands. The earlier provisional recovering offering has been removed because the supplied deck does not establish it.

The India proposal describes local manufacturing as exploratory. Copy reflects that status and does not claim an operating Indian factory, signed technology agreement, certified NUTECH manufacturing, guaranteed delivery, pricing, or performance results. The Indian partner is unnamed in the deck. The user subsequently clarified that NUTECH is a separate company started by the founders of Teams Equipment LLP and has a confirmed technical collaboration with Meiwa; the copy now reflects those facts while local-production arrangements remain exploratory. Public office/factory addresses, email, and phone numbers were subsequently supplied by the user and are displayed in the contact section. The equipment image is described as a supplied concept without asserting a machine model, installation, or ownership.

A planned visit announcement uses the presentation’s first-week-of-November-2026 timing. The client script hides it from November 8, 2026 in India. This is an expression-of-interest enquiry, not a confirmed booking. Confirm the event and replace it if dates change.

This website remains a local preview; no public deployment has been made.

## Enquiry behaviour

Product details and application tabs transfer their selection to an accessible native dialog. The form validates required fields and creates `nutech-enquiry.txt` locally for the visitor to share with their NUTECH contact. It sends no message and stores no form data. A clear on-screen notice explains this. Connect a real enquiry endpoint and replace the download wording once a recipient and delivery service are agreed; do not merely rename the button to “Send.”

## Files and accessibility

- `index.html`: page content, semantic landmarks, forms, dialogs, native FAQ disclosures.
- `styles.css`: design tokens, layouts, responsive rules, focus states, reduced-motion support.
- `app.js`: navigation, product dialogs, keyboard-accessible application tabs, and local enquiry download.
- `motion.js` / `motion.css`: optional GSAP choreography and CSS interaction states.
- `scripts/vendor.mjs`: copies the pinned GSAP distribution files and license notice into deployable assets.
- `assets/`: supplied logo, favicon, illustrative hero, and three optimised WebP company/equipment images.
- `output/`: locally saved screenshots, ignored by Git.

Tabs support Up/Down, Home/End, and correct selection and focus state. Dialogs support Escape, focus return, and background click dismissal. Images include descriptive alternative text. Mobile navigation uses explicit expanded state. Main content includes a skip link.

## Image provenance

`assets/rollers-hero.webp` was created using the built-in image generation tool and optimised to WebP. It is an illustrative studio concept, not an actual NUTECH product photograph. Both supplied logo versions were copied unchanged; the current header/footer use the higher-resolution PNG. `meiwa-exhibition.webp`, `meiwa-japan-visit.webp`, and `manufacturing-equipment.webp` are conversions of the supplied JPEG images. The photos retain their full frames and the people are not identified by name. The website now uses `manufacturing-equipment-complete.webp`, a built-in Imagegen recreation requested by the user. After the initial premium render, a second edit completed the cropped left fittings and right motor, pipework, and base ends, and pulled back the view to show the whole assembly. Missing edge details are inferred visualization details. Its studio lighting and metal finish are enhanced while the prompt preserves the reference equipment arrangement. It is displayed at the original 1170 × 1267 aspect ratio with the existing layout and motion. The original equipment image is retained. The full prompt is recorded in `EQUIPMENT-IMAGE-PROMPT.md`; the original generated PNG is saved in ignored `output/imagegen/`.

Final image prompt:

> Use case: product-mockup. Asset type: hero image for NUTECH Rubber Solutions, a sophisticated manufacturing website for offset printing rubber rollers. Create a photorealistic high-end industrial studio photograph, landscape 3:2. Three precision-ground rubber printing rollers arranged diagonally from lower-left foreground to upper-right background, with substantial cylindrical deep navy-blue and one medium cobalt-blue rubber bodies, beautifully machined silver steel shafts extending from both ends, subtle concentric steel end rings. Close camera, softly lit off-white / very pale cool gray seamless backdrop, restrained shadows and slight rubber microtexture, realistic manufacturing components, restrained engineering elegance. The rollers fill the frame but have breathing room. No logos, no text, no labels, no people, no factory, no random machine parts, no watermark. This is an illustrative concept image, not a specific company's product.

## Verification

Browser review covers desktop, tablet, 390 px mobile, and 320 px narrow mobile. Checked page overflow, heading clipping, product-to-enquiry selection, application selection and arrow-key navigation, mobile menu state, Escape dismissal and focus return, FAQ expansion, and the contents of the downloaded sample enquiry. Syntax checks pass. Review on other browsers and real devices, and verify final content and delivery integration before public launch.


## Motion system

- Hero: three masked headline lines, an image entrance, bounded 2.5D pointer depth, separate scroll parallax, a four-pixel magnetic CTA, and a short finite scroll-cue animation.
- Solutions: staggered opacity entrances keep buttons stationary. Fine pointers add a maximum 1.8-degree tilt, independently moving roller drawings, a restrained highlight sweep, and arrow feedback.
- Engineering: SVG circles and connector paths draw in sequence using measured path lengths. Rubber surface, bonding layer, and steel core highlights pair with explanatory captions; the indexing ring turns 20 degrees before the complete schematic remains visible.
- Applications: static normal-flow section. The user requested removing its animation. No scroll pinning, automatic scroll-based selection, entrance animation, or animated panel transitions remain. Clicking and keyboard navigation change the application immediately; the selected application still transfers into the enquiry form.
- About and contact: masked typography, a subtle background shift, and scroll-linked rotation of the existing roller-inspired ring. No continuous background animation.
- FAQ: native `details` with a 320 ms height enhancement, plus-to-minus indicators, keyboard behaviour, and interruption-safe rapid toggles. Height is the deliberate exception to transform/opacity animation; dimensions are measured only when toggled, not on each animation frame.

`gsap.matchMedia()` owns responsive timelines and ScrollTriggers. Event listeners use abort signals; pointer tweens and FAQ animations clean up on media changes and page lifecycle events. Dynamic animation callbacks are registered with the GSAP context. Without GSAP, core functionality and the complete static SVG remain usable. The HTML and CSS do not pre-hide existing content.

To update the vendored animation files after changing the pinned dependency:

```sh
npm ci --ignore-scripts
npm run vendor
npm run check
```

Earlier motion QA, before removal of the applications animation, included forward and reverse pinned scrolling, manual tab override, keyboard selection, enquiry handoff, interrupted accordion toggles, mobile pin removal, and a missing-library fallback. A local fixture simulated JS reduced-motion media changes: all ScrollTriggers and pin spacers were removed, headings remained visible, and transition copies were cleaned up. Its sampled desktop session recorded zero layout-shift score and no long tasks; this is a local observation, not a Core Web Vitals certification or a guaranteed frame rate. Validate on real touch devices and production hosting before launch. Temporary QA fixtures and screenshots are in ignored `output/` and should not be deployed.

## Company update verification

Reviewed the new company gallery and manufacturing section on desktop and narrow mobile. Checked the specialty product details, manufacturing and meeting enquiry selections, application copy, image loading, heading wrapping, FAQ disclosures, and horizontal overflow. The updated source continues to pass `npm run check`.


## Complete catalogue and UAE customer section

The solutions section follows all six categories in the user-supplied reference: printing rubber rollers (including inking, dampening, and Hickey), industrial rubber rolls, dust-removal rolls, anti-static rolls, CFRP lightweight rolls, and non-stick rolls. Each has a distinct optimized category illustration, detailed enquiry guidance, and a corresponding enquiry choice. Desktop uses three columns, tablet uses two, and phones use one. Product motion follows the new raster images. No extra runtime dependency was added.

Immediately below the solutions, `#customers` highlights the six UAE customers supplied by the user: Al Ghurair Printing and Publishing, HOTpack, Toppan, Metro Printing Press, Golden Line Printing Press, and E7 Group. Names are displayed as text with no fabricated logos or testimonials. The grid adapts to three, two, and one columns.

Category images are saved in `assets/rollers/` and were created with the built-in Imagegen tool. `ROLLER-CATALOG-PROMPTS.md` lists every saved image and its full prompt. The six current original studio campaign images use `*-premium.webp` filenames and total approximately 181 KB. No reference images were passed into these six generations; their subjects and compositions replace the earlier reference-inspired trios. Full-resolution source PNGs remain in ignored `output/imagegen/`.


Catalogue/customer verification: all six category dialogs opened and transferred matching titles into the enquiry selector. Reviewed the three-column desktop and two-column tablet catalogue, one-column phone catalogue, and three/two/one-column customer grids at desktop, 820 px, 390 px, and 320 px. All six images loaded, headings and names remained readable, and there was no horizontal overflow or browser warning/error output. Local asset, unique ID, and anchor checks passed.

Premium image revision verification: all six current assets loaded at desktop and 390 px phone width, with 3:2 containment and no horizontal overflow. The full roller bodies and shaft ends remain visible. Hover image depth was reduced to protect edge clearance. JavaScript syntax checks passed and browser warnings/errors were empty.

Contact and logo verification: the current supplied logo appears in both header and footer without modifying its source pixels. The contact section has separate office, factory, and direct-contact blocks, with mailto and tel links. Contact navigation works; reviewed at 1280 px desktop and 390 px phone width with no horizontal overflow or browser warnings/errors. JavaScript syntax checks passed.

Teams Equipment legacy update: the hero includes a link identifying shared founders, and About explains NUTECH’s separate-company status and confirmed Meiwa technical collaboration. A distinct Teams Equipment LLP business block presents the continuing machinery-import business and customer-focused principle. USA/Europe machinery imports and China UV/finishing equipment are stated separately. No extra dependency was added.

Founder-story verification: reviewed desktop, 390 px phone, and 320 px narrow layouts. About copy, Teams heading, import categories, and hero origin link showed no text clipping or horizontal overflow. Browser warnings/errors were empty, section IDs and anchors were valid, and JavaScript syntax checks passed.

Applications animation removal verification: no pin spacers remain, page scrolling does not change the chosen application, and tab changes are immediate. Checked all three selections, arrow-key navigation, and Packaging printing enquiry handoff. Desktop and phone layouts showed no horizontal overflow or browser warnings/errors; JavaScript syntax checks passed.

Current roller imagery: the user requested restoring the previous images. The six catalogue images again use the original light-background `assets/rollers/*.webp` files without the `-premium` suffix. Current prompts are in `ROLLER-CATALOG-PROMPTS.md`; the dark studio assets and prompts remain available in `ROLLER-CATALOG-PROMPTS-PREMIUM.md`. The current page layout and other completed changes are retained.

Current roller update: six reference-based lighting refinements preserve the restored three-roller designs, colors, and arrangements. `ROLLER-4K-PROMPTS.md` records the built-in edit prompts and all final paths. Tool-native images are 1536 × 1024; the 3840 × 2560 PNG/WebP exports are upscaled using Lanczos and preserve 3:2 framing. The site uses responsive 960/1536/3840-wide WebPs, and `output/nutech-rollers-4k.zip` packages the six PNGs. These are upscaled 4K-width exports, not native 4K renders. The existing layout and application section’s static behavior are retained.

### Supporting pages

The supplied 11-slide presentation is covered across `meiwa.html` (company, leadership, R&D and quality history), `roller-technology.html` (complete portfolio, named families, industrial functions and benefits), and `india-manufacturing.html` (exploratory proposal, four objectives, planned visit and coordination). See `PRESENTATION-COVERAGE.md` for the slide-by-slide audit and `PRESENTATION-IMAGE-PROMPTS.md` for new illustrative process-image provenance. Shared styles and accessible mobile navigation are in `detail-pages.css` and `detail-pages.js`; these pages intentionally use no scroll-pinning animation.
