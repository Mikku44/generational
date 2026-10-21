import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://www.generational.co";
const perPage = 10;
const inventory = JSON.parse(
  await readFile(new URL("../app/data/inventory.json", import.meta.url), "utf8"),
);

if (!Array.isArray(inventory) || inventory.some((item) => !item.id)) {
  throw new Error("Inventory data must be an array of cars with IDs");
}

const paths = [
  "/",
  "/curation-philosophy",
  "/ourservice",
  "/inventory/",
  "/ourteam",
  "/contact",
];

for (let page = 2; page <= Math.ceil(inventory.length / perPage); page++) {
  paths.push(`/inventory/?page=${page}`);
}

for (const item of inventory) {
  paths.push(`/inventory/${encodeURIComponent(item.id)}`);
}

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...new Set(paths)].map((path) => `  <url><loc>${escapeXml(siteUrl + path)}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml, "utf8");
console.log(`Generated sitemap with ${paths.length} URLs`);
