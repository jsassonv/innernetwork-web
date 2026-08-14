# InnerNetwork Web Fallback

Static fallback site for the InnerNetwork app, deployed at **https://innernetwork.app**.

## What's in here

- `index.html` - simple home/landing page with App Store + Google Play buttons.
- `404.html` - the smart lander. GitHub Pages serves this for ANY unmatched path (like `/e/abc123`), so it doubles as the `/e/:id` fallback page. It reads the id from the URL, tries to open the app via a custom URL scheme, and shows App Store / Google Play buttons if the app doesn't open.
- `.well-known/apple-app-site-association` - enables iOS Universal Links for paths matching `/e/*`.
- `.well-known/assetlinks.json` - enables Android App Links for the same package.
- `CNAME` - tells GitHub Pages to serve this repo at `innernetwork.app`.

## Before going live, replace these placeholders

In `404.html` and `index.html`:
- `YOUR_APP_STORE_ID` -> your numeric Apple App Store ID
- `com.yourcompany.innernetwork` -> your real Android package name
- `innernetwork://` -> your app's actual custom URL scheme (must match what's registered in Xcode/Info.plist)

In `.well-known/apple-app-site-association`:
- `TEAMID.com.yourcompany.innernetwork` -> `<Your Apple Team ID>.<Your Bundle ID>` (e.g. `ABCDE12345.com.innernetwork.app`)

In `.well-known/assetlinks.json`:
- `com.yourcompany.innernetwork` -> your real Android package name
- `REPLACE_WITH_YOUR_APP_SIGNING_SHA256_FINGERPRINT` -> your app's release signing SHA-256 fingerprint (get it from Play Console > Setup > App integrity, or via `keytool -list -v`)

## Deploying (GitHub Pages)

See the step-by-step instructions provided alongside this file.
