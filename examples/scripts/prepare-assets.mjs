import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const gsapSource = join(root, "node_modules", "gsap", "dist", "gsap.min.js");
if (!existsSync(gsapSource)) throw new Error("gsap is missing; run npm install in examples/");
let count = 0;
for (const name of readdirSync(root)) {
  if (!/^FX-\d{3}$/.test(name)) continue;
  const assets = join(root, name, "assets");
  mkdirSync(assets, { recursive: true });
  copyFileSync(gsapSource, join(assets, "gsap.min.js"));
  count++;
}
process.stdout.write(`Prepared GSAP for ${count} editable examples.\n`);
