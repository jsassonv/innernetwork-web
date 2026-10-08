# Inner Network Web

Static site for the Inner Network app (Wavecode LLC), deployed at **https://innernetwork.app** via GitHub Pages. Plain HTML/CSS/JS, no build step.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing page with an App Store button. |
| `download.html` | Store badges (App Store live; Google Play placeholder until the Android app ships). Served at `/download`. |
| `support.html` | Contact details and FAQ. Linked from App Store Connect as the support URL. |
| `404.html` | The smart lander. GitHub Pages serves this for ANY unmatched path (like `/e/abc123`), so it doubles as the `/e/:id` fallback. It reads the event id from the URL, fetches a public preview from Supabase, tries to open the app via its custom URL scheme (`com.innernetwork.app://`), and shows the App Store button if the app doesn't open. |
| `card.html` | A member's public digital business card (`/card.html?id=...`), built client-side from the `public-profile-card` Edge Function's JSON. `noindex` and disallowed in `robots.txt`. |
| `verify-company.html` | Landing page for company-email confirmation links. Shows a "Confirm my company email" button and only posts the token to the `verify-company-email` Edge Function when the visitor taps it; the token is stripped from the address bar on load. `noindex` and disallowed in `robots.txt`. |
| `privacy-policy.html` | **Generated** — see below. Linked from App Store Connect. |
| `terms.html` | **Generated** — see below. |
| `takedown.html` | **Generated** — Removal & Corrections (DMCA / listing takedown) process. |
| `accessibility.html` | **Generated** — accessibility statement. |
| `.well-known/apple-app-site-association` | Enables iOS Universal Links for `/e/*`. Must be served with no file extension, over HTTPS, with no redirects. |
| `.nojekyll` | Tells GitHub Pages to skip Jekyll processing, which otherwise silently drops the `.well-known/` directory. |
| `CNAME` | Tells GitHub Pages to serve this repo at `innernetwork.app`. |
| `robots.txt` | Allows everything except `card.html` and `verify-company.html`. |

Every hand-written page carries the same footer: a `<nav aria-label="Legal">` linking the four legal pages plus Support, the Wavecode LLC copyright/address/contact line, and the third-party trademark disclaimer.

## Generated legal pages — do not edit by hand

`privacy-policy.html`, `terms.html`, `takedown.html` and `accessibility.html` are produced by `App/scripts/generate_legal.py` in the main project repo. Edit the source there and regenerate from the project folder:

```sh
python3 App/scripts/generate_legal.py
```

Then commit the regenerated files here.

## Assets

- `assets/logo.png`, `assets/favicon.png`, `assets/apple-touch-icon.png` — brand images.
- `assets/fonts/` — self-hosted variable fonts used by `card.html` (Inter, EB Garamond, Playfair Display, with italic faces for the two serifs). All three families are licensed under the SIL Open Font License 1.1; the license text and copyright notices are in `assets/fonts/OFL.txt`. Self-hosting means the site makes no third-party font requests.

## Deploying (GitHub Pages)

Push to `main` — GitHub Pages serves directly from the repo root.
