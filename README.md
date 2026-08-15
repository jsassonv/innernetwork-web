# InnerNetwork Web Fallback

Static fallback site for the InnerNetwork app, deployed at **https://innernetwork.app**.

## What's in here

- `index.html` - simple home/landing page with an App Store button.
- `404.html` - the smart lander. GitHub Pages serves this for ANY unmatched path (like `/e/abc123`), so it doubles as the `/e/:id` fallback page. It reads the id from the URL, tries to open the app via its custom URL scheme (`com.innernetwork.app://`), and shows the App Store button if the app doesn't open.
- `.well-known/apple-app-site-association` - enables iOS Universal Links for paths matching `/e/*`. Must be served with no file extension, over HTTPS, with no redirects.
- `.nojekyll` - tells GitHub Pages to skip Jekyll processing, which otherwise silently drops the `.well-known/` directory.
- `privacy-policy.html` - linked from App Store Connect.
- `CNAME` - tells GitHub Pages to serve this repo at `innernetwork.app`.

## Remaining placeholder

In `404.html` and `index.html`:
- `YOUR_APP_STORE_ID` -> fill in once the app is submitted to App Store Connect and has a real numeric App Store ID.

## Deploying (GitHub Pages)

Push to `main` — GitHub Pages serves directly from the repo root.
