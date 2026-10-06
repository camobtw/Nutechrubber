# Meiwa presentation → website coverage

Source: user-supplied `Meiwa_Rubber_India_Presentation.pptx`, 11 slides. All substantive information is represented, organized for website reading rather than repeated slide footers or page numbers. Source text extraction is retained in `output/deck-content-audit.json`.

| Slide | Information | Website destination |
| --- | --- | --- |
| 1 | Meiwa’s English and Japanese name, printing/industrial focus, Tokyo 1946, 80 years in 2026, ISO 9001, introduction ahead of November visit | `meiwa.html` introduction, profile, quality; `india-manufacturing.html#president-visit` |
| 2 | April 28 founding, Ota-ku HQ, 5 plants, 13 sales offices, Seoul office, president, corporate/plant quality history | `meiwa.html#profile`, `#quality` |
| 3 | Technological Innovation motto, leadership message, investment in materials/R&D/manufacturing, changing printing and film needs, dependable products/service | `meiwa.html#leadership` (paraphrased; motto quoted) |
| 4 | Compounding expertise, continuous R&D, quality certification, decades serving printing/film | `meiwa.html#why-meiwa` |
| 5 | Six categories: printing, industrial, dust, antistatic, CFRP, no-adhesive/ceramic | Homepage catalogue plus `roller-technology.html#printing`, `#industrial`, `#specialty`; ceramic explicit in `#nonstick` |
| 6 | BZ, UV Summit II, BW, BN, NCD-III/IV, MD/Aquaphilic, impression/furnisher/fountain rolls and respective functions | `roller-technology.html#printing` |
| 7 | Film stretching/guide/corona/laminating/winding; paper felt/pick-up/back-up/winding; plywood/steel spreader/coating/guide; material requirements | `roller-technology.html#industrial` |
| 8 | Low heat, stable dimensions/hardness, ink compatibility/phthalate-free options, ozone/abrasion resistance, static control, stoppages/quality/total cost | `roller-technology.html#performance` (all six benefits, application-qualified) |
| 9 | Exploratory local manufacturing, Japan/India combination, local stock/delivery, Indian-market pricing, technical transfer/training/after-sales, Make in India long-term supply | `india-manufacturing.html#proposal`, `#objectives` |
| 10 | First week November 2026, Eiichiro Tsuboi personal visit, printing-company meetings, trials/supply/manufacturing dialogue, limited slots, scheduling interest | `india-manufacturing.html#president-visit` plus homepage announcement |
| 11 | Boardroom meeting invitation, appointment/product enquiries, India coordinating contacts, Meiwa official website | `india-manufacturing.html#coordinate`; actual NUTECH contacts replace deck placeholders |

## Accuracy and editorial decisions

- NUTECH is the separate company founded by the same founders as Teams Equipment LLP, with a confirmed technical collaboration with Meiwa, as clarified by the user. Neither Meiwa’s 80-year history nor its certifications are attributed to NUTECH.
- Local manufacturing remains exploratory; proposed benefits are presented as objectives, not completed facilities or guaranteed pricing/delivery.
- Meiwa’s historical ISO 9002 milestones (Tokyo 2000, Maebashi 2001) and corporate ISO 9001 milestone (2003) are linked to its official history. No claim is made about NUTECH certification.
- The presidential visit is labelled planned. Dates and appointments must be confirmed with NUTECH. Dated visit panels hide after November 7, 2026.
- Source-deck contact placeholders, repeated footers/page numbers and closing courtesy are adapted into website contact actions, not reproduced as literal placeholders.
- Two generated process scenes explain printing and film handling. They are labelled illustrative; authentic supplied expo photography represents company connections, and the equipment rendering remains a concept.

## Primary verification sources

- [Meiwa company profile and leadership](https://www.meiwa-rubber.co.jp/english/company/gleeting/)
- [Meiwa company history](https://www.meiwa-rubber.co.jp/english/company/history/)
- [Meiwa printing products](https://www.meiwa-rubber.co.jp/english/product/print/)
- [Meiwa development](https://www.meiwa-rubber.co.jp/english/development/)

## Imagery

See `PRESENTATION-IMAGE-PROMPTS.md` for the two new process images and the built-in generation prompts. `ROLLER-4K-PROMPTS.md` records the six reference-preserving roller refinements and their upscaled 3840 × 2560 exports.

## Verification

- Reviewed all three supporting pages in the browser at desktop and 390 px mobile sizes; additionally checked 768/820 px navigation and the quality-history layout at 320 px.
- Corrected image height handling so supplied expo photography retains its full composition on mobile.
- Checked one H1 per page, unique IDs, image files/alt text, and all internal file/fragment links across the four HTML pages: no issues.
- Confirmed printing and non-stick dialog links target the matching technology sections, and the non-stick enquiry retains its selected solution.
- Confirmed all six responsive homepage roller images load, no application pin spacers remain, and the new discovery section has three aligned page links.
- JavaScript syntax checks pass. The four India objectives and all three planned-visit discussion topics are present.
- Verified all six master roller exports are 3840 × 2560 and the ZIP archive passes its integrity check. Exports are upscaled; native image generation was 1536 × 1024.
- Fixed incoming homepage fragment navigation after motion initialization. Browser verification shows the `#explore` section landing at the expected scroll offset, with all three links aligned.
