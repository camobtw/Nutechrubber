# NUTECH editorial redesign — October 2026

The previous pages repeated a large slogan, a long introduction and a sequence of loose information rows. Product pages did not show their products. Body text on the homepage was often too small, and the company, technical and manufacturing stories had almost identical visual rhythms.

The revised system uses NUTECH blue, warm paper backgrounds, fine rules, a consistent type scale, generous but measured section spacing, and clear product/application labels. Existing roller images and supplied company photographs are retained. No new stock imagery or image generation was needed. Illustrative process images remain labeled as visualizations.

| Page | Audit finding | Implemented direction |
| --- | --- | --- |
| Home | Small catalogue copy, competing section layouts and unnecessary image tilt | More legible catalogue, consistent heading grid, aligned expo photographs, restrained hover states, clearer expertise links and footer navigation |
| Meiwa | A generic text hero did not express the company or its history | Real expo photograph in the opening, a concise company metric panel, facts ledger, leadership perspective and chronological quality history |
| Roller technology | Repeated information with weak connections to individual solutions | Process-led opening, labeled comparison table, industrial context, specialty portfolio grouped into two columns with direct product links, material benefits |
| India manufacturing | Broad slogan and undifferentiated text sections | A typographic Japan/India collaboration diagram, clear proposal status, four grouped objectives, contrasting visit section and practical contact area; the removed equipment image stays removed |
| Printing rollers | Named families followed a generic slogan with no product visual | Original printing trio in the opening, clear category title, eight named range entries and press/ink/specification enquiry guide |
| Industrial rolls | Production functions were buried in copy | Original industrial trio, four clearly labeled production-line entries and line/operating-condition/specification guide |
| Dust-removal rolls | The cleanliness purpose and product category were visually disconnected | Original dust-removal trio, three applications and substrate/contamination/process enquiry guide |
| Anti-static rolls | Long technical introduction had little visual support | Original anti-static trio, six named grades and material/environment/operating-condition guide |
| CFRP rolls | Lightweight core technology looked like another generic text page | Original carbon-fibre trio, three construction/application entries and core/span/surface guide |
| Non-stick rolls | Specialty surface options needed clearer distinction | Original non-stick trio, three surface options, ceramic scope preserved, processed-material/release/environment guide |

All six category pages share a specimen layout, category navigation with an active marker, an accessible comparison table, and a selection guide. Mobile layouts stack the product/copy and present table entries with explicit field labels. Navigation, contact links, keyboard focus and reduced-motion behavior remain supported. The applications tabs remain static and manually selected.

Company claims remain qualified as before: NUTECH and Teams Equipment LLP are separate companies with the same founders; Meiwa is the technical collaborator; Indian production is under exploration; ISO dates describe Meiwa's history. Enquiry forms still download a local file.

## Verification

- Production build validates all ten pages, local links, assets and fragment references.
- Browser layout checks passed on every page at the default desktop width and at 820, 390 and 320 pixels: no horizontal overflow or clipped headings.
- Desktop and mobile screenshots were captured for every page under the ignored `output/` directory.
- Mobile navigation opened and closed with Escape; About NUTECH opened the India opportunity page.
- Application tabs changed manually and with the vertical arrow keys, with no pin spacer or animation in that section.
- FAQ expanded, and the enquiry dialog opened with all five fields and the existing Download enquiry action.
- Mobile catalogue field labels remain visible, with the table headers retained for assistive technology.
