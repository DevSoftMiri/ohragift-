import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const imageDir = path.join(publicDir, "images");
const widths = [360, 720, 1200, 1600];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  }));
  return files.flat();
}

function webpPath(file, width) {
  const parsed = path.parse(file);
  return path.join(parsed.dir, `${parsed.name}-${width}.webp`);
}

async function isNewer(source, target) {
  try {
    const [sourceStat, targetStat] = await Promise.all([stat(source), stat(target)]);
    return targetStat.mtimeMs >= sourceStat.mtimeMs;
  } catch {
    return false;
  }
}

async function optimize(file) {
  const image = sharp(file);
  const metadata = await image.metadata();
  if (!metadata.width) return 0;

  let generated = 0;
  for (const width of widths) {
    const target = webpPath(file, width);
    if (await isNewer(file, target)) continue;

    await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toFile(target);
    generated += 1;
  }

  return generated;
}

const files = (await walk(imageDir)).filter((file) => /\.png$/i.test(file) && !/-\d+\.webp$/i.test(file));
const count = (await Promise.all(files.map(optimize))).reduce((sum, item) => sum + item, 0);

console.log(`Optimized ${count} image variants from ${files.length} source images.`);
