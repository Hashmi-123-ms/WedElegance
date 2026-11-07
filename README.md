# WedElegence 💍

A minimal, elegant wedding event management booking website — Catering, Rentals, Photography and Wedding Halls.

Plain HTML + CSS + JavaScript. No build step.

## Files
- `index.html` — page structure
- `style.css` — colours, layout, animations
- `script.js` — booking form, "My Bookings" list, menu, scroll effects

## Host on GitHub Pages
1. Create a free account at https://github.com and sign in.
2. Click **+ → New repository**. Name it `wedelegence`, set it to **Public**, click **Create repository**.
3. On the new repo page, click **uploading an existing file**.
4. Drag in `index.html`, `style.css`, `script.js` and `README.md` (the files themselves, not the folder). Click **Commit changes**.
5. Go to **Settings → Pages**.
6. Under **Build and deployment → Source**, choose **Deploy from a branch**. Pick branch **main**, folder **/(root)**, click **Save**.
7. Wait 1–2 minutes and refresh. Your site will be live at:
   `https://YOUR-USERNAME.github.io/wedelegence/`

### Updating later
Open a file in the repo → pencil icon → edit → **Commit changes**. The site updates in about a minute.

### Using Git from your computer instead
```bash
cd wedelegence
git init
git add .
git commit -m "WedElegence website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wedelegence.git
git push -u origin main
```
Then do steps 5–7.

## Customise
- **Your own photos:** create an `images` folder, upload photos, and change e.g.
  `src="https://loremflickr.com/..."` to `src="images/catering.jpg"`.
- **Colours:** edit the variables at the top of `style.css` (`--gold`, `--rose`, `--blush`…).
- **Prices / phone / email:** edit text in `index.html`.

## Note on bookings
Bookings are saved in the visitor's browser (localStorage), so you won't receive them yet.
To get booking requests by email, sign up free at https://formspree.io, and change the form tag to
`<form action="https://formspree.io/f/YOUR_ID" method="POST">` (and remove the JS submit handler),
or connect a backend later.
