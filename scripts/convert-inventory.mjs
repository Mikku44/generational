// Convert app/data/InventoryRepo.ts -> app/data/inventory.json
// Usage: node scripts/convert-inventory.mjs
// No extra deps: parses the exported array literal from the .ts source.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const repoPath = path.join(process.cwd(), "app", "data", "InventoryRepo.ts");
const outPath = path.join(process.cwd(), "app", "data", "inventory.json");

const src = await readFile(repoPath, "utf-8");
const start = src.indexOf("[");
const end = src.lastIndexOf("]");
if (start === -1 || end === -1 || end <= start) {
  throw new Error("Could not find array literal in InventoryRepo.ts");
}
const arrayLiteral = src.slice(start, end + 1);

// Source is plain JS object literals (no TS syntax inside the array),
// so evaluating it is safe here.
const data = new Function(`return (${arrayLiteral});`)();

if (!Array.isArray(data)) throw new Error("Parsed data is not an array");

await mkdir(path.dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
console.log(`Wrote ${data.length} items -> ${outPath}`);
