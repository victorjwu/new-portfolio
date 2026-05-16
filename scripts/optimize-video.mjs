#!/usr/bin/env node
/**
 * Video optimizer.
 *
 *  1. Drop a source video into `public/assets/video/_originals/`
 *     (mov, mp4, m4v — anything ffmpeg reads).
 *  2. Run `npm run optimize:video`
 *  3. Outputs `<name>.mp4` (H.264, web-tuned) and `<name>.webm` (VP9)
 *     into `public/assets/video/`.
 *
 * Requires ffmpeg on PATH:  brew install ffmpeg
 *
 * Defaults: max width 1920, no audio, faststart for MP4. Tweak CRF
 * if files come out larger than ~3 MB — try 28 or 30.
 */
import { spawn } from "node:child_process";
import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

const VIDEO_DIR = join(ROOT, "public/assets/video");
const ORIGINALS_DIR = join(VIDEO_DIR, "_originals");

const MAX_WIDTH = 1920;
const H264_CRF = 28; // lower = bigger + better quality
const VP9_CRF = 36;

// Optional trim. Set via env: TRIM_START=14 TRIM_DURATION=12 npm run optimize:video
const TRIM_START = process.env.TRIM_START ?? null;
const TRIM_DURATION = process.env.TRIM_DURATION ?? null;

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)}kb`;
}

function ffmpeg(args) {
  return new Promise((resolve, reject) => {
    const p = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "inherit"] });
    p.on("error", reject);
    p.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))
    );
  });
}

async function main() {
  if (!existsSync(ORIGINALS_DIR)) {
    await mkdir(ORIGINALS_DIR, { recursive: true });
    console.error(`Created ${relative(ROOT, ORIGINALS_DIR)}`);
    console.error("Drop your source video in there, then re-run.");
    process.exit(0);
  }

  const sources = (await readdir(ORIGINALS_DIR)).filter((f) =>
    /\.(mp4|mov|m4v|mkv|webm)$/i.test(f)
  );
  if (!sources.length) {
    console.error(`No source videos found in ${relative(ROOT, ORIGINALS_DIR)}.`);
    process.exit(1);
  }

  for (const file of sources) {
    const name = basename(file, extname(file));
    const input = join(ORIGINALS_DIR, file);
    const mp4 = join(VIDEO_DIR, `${name}.mp4`);
    const webm = join(VIDEO_DIR, `${name}.webm`);
    const inputSize = (await stat(input)).size;

    console.log(`→ ${file}  (${kb(inputSize)})`);

    // Input-side seek (-ss before -i) is fast; -t caps duration.
    const trimArgs = [];
    if (TRIM_START) trimArgs.push("-ss", String(TRIM_START));
    if (TRIM_DURATION) trimArgs.push("-t", String(TRIM_DURATION));
    if (trimArgs.length) {
      console.log(
        `  trim: start ${TRIM_START ?? "0"}s · duration ${TRIM_DURATION ?? "full"}s`
      );
    }

    console.log(`  MP4  (H.264 crf ${H264_CRF})`);
    await ffmpeg([
      "-y", "-loglevel", "error",
      ...trimArgs, "-i", input,
      "-vf", `scale='min(${MAX_WIDTH},iw)':-2`,
      "-c:v", "libx264", "-crf", String(H264_CRF), "-preset", "slow",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      "-an",
      mp4,
    ]);

    console.log(`  WebM (VP9   crf ${VP9_CRF})`);
    await ffmpeg([
      "-y", "-loglevel", "error",
      ...trimArgs, "-i", input,
      "-vf", `scale='min(${MAX_WIDTH},iw)':-2`,
      "-c:v", "libvpx-vp9", "-crf", String(VP9_CRF), "-b:v", "0",
      "-deadline", "good", "-cpu-used", "2",
      "-tile-columns", "2", "-row-mt", "1",
      "-an",
      webm,
    ]);

    const outMp4 = (await stat(mp4)).size;
    const outWebm = (await stat(webm)).size;
    console.log(`  → mp4 ${kb(outMp4)} · webm ${kb(outWebm)}`);
  }

  console.log(`\n✓ ${sources.length} video${sources.length > 1 ? "s" : ""} optimized`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
