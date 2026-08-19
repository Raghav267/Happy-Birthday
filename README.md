# 🐻 Bubu × Dudu Birthday Website — Enhanced

This version includes:

- 💌 Sorry letter
- 🎂 Birthday letter
- 📸 Memory gallery
- 📅 Relationship timeline
- 🎥 Instagram Reel page
- 🎵 Optional music player
- ✨ Floating hearts
- 🐻🐼 Bubu/Dudu-inspired CSS characters
- 📱 Responsive mobile layout
- React Router page navigation
- Framer Motion animations

## 1. Install

```bash
npm install
```

## 2. Run

```bash
npm run dev
```

Open the URL Vite gives you, usually:

http://localhost:5173

## 3. Personalize

Open:

```text
src/App.jsx
```

Change:

```js
const GIRLFRIEND_NAME = "My Bubu";
const YOUR_NAME = "Dudu";
const ANNIVERSARY_DATE = "14 February 2025";
const INSTAGRAM_REEL_URL = "https://www.instagram.com/reel/YOUR_REEL_ID/";
```

## 4. Add photos

Put your photos in:

```text
public/images/
```

Use these names:

```text
photo1.jpg
photo2.jpg
photo3.jpg
photo4.jpg
```

## 5. Add music

Put your music file at:

```text
public/music.mp3
```

Then click "Our song" in the top-right.

Browsers normally block automatic audio playback, so the music starts after the user clicks the button.

## 6. Build

```bash
npm run build
```

Production output:

```text
dist/
```

## 7. Deploy later

The project is suitable for Vercel/static hosting.

For Vercel, the usual settings are:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
