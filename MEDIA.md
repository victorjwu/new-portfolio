# Media workflow

How to add photos and video. Both pipelines compress source files into web-ready variants and update the components that consume them.

## Photos

### One-time setup

```bash
npm i -D sharp   # already installed; only needed on a fresh clone
```

### Add new photos

1. Drop originals into `public/assets/photos/_originals/` — any case, spaces OK, JPG / PNG / TIFF.
2. Rename to kebab-case so URLs stay clean:
   ```bash
   cd public/assets/photos/_originals
   for f in *\ *; do mv "$f" "$(echo "$f" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"; done
   cd -
   ```
3. Optimize:
   ```bash
   npm run optimize:photos
   ```
   Writes `<name>.jpg` + `<name>.webp` + `<name>.avif` at 2000px wide into `public/assets/photos/`, updates `src/content/photo-manifest.json`. Skips files that are already there (delete the output if you want to re-run).
4. Add entries to `PHOTOS` in `src/content/art.ts`:
   ```ts
   { real: "/assets/photos/<name>.jpg", cap: "CAPTION", id: "10", span: { col: 6, row: 4 } }
   ```
   Always reference the `.jpg` path. The `<picture>` element auto-upgrades to WebP/AVIF based on the manifest.

### Picking grid spans

12-column grid, 90px row units, 14px gap. To avoid cropping, match the cell ratio to the photo ratio:

| Photo ratio | Recommended span | Cell ratio |
|---|---|---|
| 3:2 landscape (1.50) | `col 6 row 4` | 1.47 |
| 16:9 landscape (1.78) | `col 7 row 4` | 1.72 |
| 4:3 landscape (1.33) | `col 5 row 4` | 1.22 |
| 2:3 portrait (0.67) | `col 4 row 6` | 0.64 |
| Square (1.00) | `col 5 row 5` | 0.97 |
| Hero feature | `col 8 row 5` | 1.57 |
| Wide panorama crop | `col 12 row 4` | 2.95 |

To get a file's dimensions on macOS:
```bash
sips -g pixelWidth -g pixelHeight path/to/photo.jpg
```

Bands per row should sum to 12 cols. The grid has `grid-auto-flow: dense` so small gaps will fill.

### Captions

Free-form. The original convention was `LOCATION  MM/YY` (e.g. `KYODO  07/24`). Keep uppercase — they render in JetBrains Mono and pair with the mono `idTag`.

### Tuning compression

Edit `scripts/optimize-images.mjs`:
- `TARGET_WIDTH = 2000` — output longest edge in px.
- `QUALITIES.avif = 60` — drop to 52 for ~30% smaller AVIFs, 65 for higher fidelity.

---

## Video (landing hero)

### One-time setup

```bash
brew install ffmpeg   # required, not an npm package
```

### Add a hero video

1. Drop a source clip into `public/assets/video/_originals/` — any format ffmpeg reads (`.mov`, `.mp4`, `.m4v`, `.mkv`, `.webm`).
2. Optimize:
   ```bash
   npm run optimize:video
   ```
   Writes `<name>.mp4` (H.264, faststart) + `<name>.webm` (VP9) into `public/assets/video/`. No audio.
3. Wire it up in `src/pages/LandingPage.tsx`:
   ```tsx
   <HeroVideo
     poster="/assets/hero-tokyo.png"
     src="/assets/video/<name>.mp4"
     webm="/assets/video/<name>.webm"
   />
   ```
   (Uncomment the two commented lines.)

### Source clip specs

- **Length**: 8–15 seconds, designed to loop seamlessly (start and end frames should be visually similar so the cut isn't noticeable).
- **Motion**: subtle. Camera pan, fog drifting, water, a train passing through frame, rain on a window. Avoid cuts and rapid action — this is ambient, not a trailer.
- **Resolution**: shoot 1080p+. The script downscales to 1920px wide.
- **Audio**: irrelevant. The script strips it; autoplay would be muted anyway.
- **Target output size**: ~2–4 MB for the MP4. If it comes out bigger, raise `H264_CRF` (28 default; +2 ≈ 25% smaller). Anything over 5 MB is too heavy for a hero loop — trim instead of bumping quality.
- **WebM caveat**: VP9 single-pass sometimes comes out *larger* than the H.264 MP4 on noisy / detailed 4K sources. If that happens, just delete the `.webm` and skip the `webm` prop on `<HeroVideo>` — every browser falls back to the MP4 cleanly.

### Trimming on the fly

If your source is longer than the loop you want, trim during optimization with env vars instead of pre-cutting:

```bash
# Take 12 seconds starting at 0:14
TRIM_START=14 TRIM_DURATION=12 npm run optimize:video
```

Both vars are optional. Set just `TRIM_DURATION` to take the first N seconds.

### What "just works" without me touching anything

`HeroVideo` handles these on its own — drop the file in, you don't need to add guards:
- `prefers-reduced-motion: reduce` → poster image only, video doesn't load.
- `navigator.connection.saveData` → poster image only.
- 2g / slow-2g connection → poster image only.
- Missing video file → renders nothing for `<video>`, poster stays.
- Video failing to load (codec/network) → poster stays underneath, no broken icon.

---

## What stays out of git

`.gitignore` is set so:
- `public/assets/photos/_originals/` and `public/assets/video/_originals/` stay **local only** (raw files never commit).
- Optimized outputs under `public/assets/` **do commit** so deploys ship them.
- Loose JPG/PNG/MP4/etc. in the repo root or `src/` are ignored by default.

If you ever need to inspect what would actually deploy, look at what's tracked under `public/assets/`.
