#!/usr/bin/env node
/**
 * Image optimizer.
 *
 *  1. Drop originals into `public/assets/photos/_originals/`
 *  2. Run `npm run optimize:photos`
 *  3. Outputs `<name>.jpg` + `<name>.webp` + `<name>.avif` into
 *     `public/assets/photos/` and updates `src/content/photo-manifest.json`.
 *
 * Requires sharp (devDependency). Install once:  npm i -D sharp
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

const PHOTOS_DIR = join(ROOT, "public/assets/photos");
const ORIGINALS_DIR = join(PHOTOS_DIR, "_originals");
const MANIFEST_PATH = join(ROOT, "src/content/photo-manifest.json");

// Single-width export. Bump or fan out into [1200, 1800, 2400] if you want
// responsive srcset and the Photo component is updated to consume widths.
const TARGET_WIDTH = 2000;
const QUALITIES = { jpg: 82, webp: 80, avif: 60 };

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0).padStart(4)}kb`;
}

async function loadManifest() {
  try {
    const txt = await readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(txt || "{}");
  } catch {
    return {};
  }
}

async function main() {
  if (!existsSync(ORIGINALS_DIR)) {
    await mkdir(ORIGINALS_DIR, { recursive: true });
    console.error(`Created ${relative(ROOT, ORIGINALS_DIR)}`);
    console.error("Drop your raw photos in there, then re-run.");
    process.exit(0);
  }

  const originals = (await readdir(ORIGINALS_DIR)).filter((f) =>
    /\.(jpe?g|png|tiff?)$/i.test(f)
  );
  if (!originals.length) {
    console.error(`No images found in ${relative(ROOT, ORIGINALS_DIR)}.`);
    process.exit(1);
  }

  const manifest = await loadManifest();
  let totalOriginalBytes = 0;
  let totalOutputBytes = 0;

  for (const file of originals) {
    const input = join(ORIGINALS_DIR, file);
    const name = basename(file, extname(file));
    const out = join(PHOTOS_DIR, name);
    const inputSize = (await stat(input)).size;
    totalOriginalBytes += inputSize;

    process.stdout.write(`→ ${file.padEnd(36)} `);

    const meta = await sharp(input).metadata();
    const aspectRatio =
      meta.width && meta.height
        ? Number((meta.width / meta.height).toFixed(4))
        : undefined;
    const width = Math.min(TARGET_WIDTH, meta.width ?? TARGET_WIDTH);

    const pipeline = () =>
      sharp(input).rotate().resize({ width, withoutEnlargement: true });

    await pipeline()
      .jpeg({ quality: QUALITIES.jpg, mozjpeg: true })
      .toFile(`${out}.jpg`);
    await pipeline().webp({ quality: QUALITIES.webp }).toFile(`${out}.webp`);
    await pipeline().avif({ quality: QUALITIES.avif }).toFile(`${out}.avif`);

    const sizes = {
      jpg: (await stat(`${out}.jpg`)).size,
      webp: (await stat(`${out}.webp`)).size,
      avif: (await stat(`${out}.avif`)).size,
    };
    totalOutputBytes += sizes.jpg;

    manifest[`/assets/photos/${name}.jpg`] = {
      formats: ["webp", "avif"],
      aspectRatio,
      width,
    };

    console.log(
      `orig ${kb(inputSize)} → jpg ${kb(sizes.jpg)} · webp ${kb(sizes.webp)} · avif ${kb(sizes.avif)}`
    );
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  const ratio = totalOriginalBytes
    ? ((1 - totalOutputBytes / totalOriginalBytes) * 100).toFixed(1)
    : "0";
  console.log(
    `\n✓ ${originals.length} photo${originals.length > 1 ? "s" : ""} optimized` +
      ` · saved ${ratio}% on JPG (${kb(totalOriginalBytes - totalOutputBytes)})`
  );
  console.log(`  manifest: ${relative(ROOT, MANIFEST_PATH)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
