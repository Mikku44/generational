---
name: add-inventory
description: Use when adding a new car to public/inventory, syncing inventory.json and InventoryRepo.ts, or converting inventory JPGs to WebP. Triggers on "inventory ใหม่", "เพิ่มรถ", "ลดขนาดรูป", "แปลง webp".
---

# Add Inventory

Workflow for adding a new car folder under `public/inventory/` to the GENERATIONAL site.

## Step 1 — Detect new inventory

1. List `public/inventory/` — each subfolder is one car.
2. Run `git status --short` + `git ls-files --others --exclude-standard -- public/inventory` to find untracked (new) folders.
3. Count files per folder (expect 9–10 images). Note which folder is new and not yet in `app/data/inventory.json`.

## Step 2 — Add entry to inventory data

Source of truth: `app/data/inventory.json` (loaded server-side by `app/routes/inventory.tsx`).
Fallback: `app/data/InventoryRepo.ts` — **always keep both in sync** with identical entries.

Entry shape (`Inventory` in `app/models/inventoryModel.ts`):

```json
{
  "id": "<slug, e.g. nissan-skyline-gtr-r32>",
  "name": "<Display name, e.g. Nissan Skyline GT-R>",
  "status": "Available",
  "description": "### <Title>\n\n* <bullet 1>\n* <bullet 2>\n\n<paragraph 1>\n\n<paragraph 2>\n\n**GENERATIONAL proudly presents**\n**<Name>**",
  "images": [
    "/inventory/<folder>/1.webp",
    "...",
    "/inventory/<folder>/10.webp"
  ]
}
```

Rules:
- `status` is capitalised: `Available` (not `available`).
- Description is markdown: `###` title, `*` bullets from user text, then paragraphs verbatim, closing with `**GENERATIONAL proudly presents**`.
- `images` paths are `/inventory/<folder>/<n>.webp`, sorted 1–10.
- Append new entry at the end of the JSON array in both files.

Verify: `node -e "JSON.parse(require('fs').readFileSync('app/data/inventory.json','utf8'))"` must print `JSON OK, count=N`.

## Step 3 — Convert JPG to WebP

Use Python PIL (repo has no `sharp`; `PIL` + `ffmpeg` are available):

```python
from PIL import Image
import glob, os
for f in sorted(glob.glob('public/inventory/<folder>/*.jpg')):
    im = Image.open(f).convert('RGB')
    im.save(os.path.splitext(f)[0] + '.webp', 'WEBP', quality=82, method=6)
```

Expected result: ~60–80% smaller (e.g. 16.9MB → 6.1MB for 10 photos).

Then:
1. Update the new entry's `images` in **both** data files from `.jpg` to `.webp`.
2. Delete the original `.jpg` files (otherwise total size grows).
3. Verify every path exists:
   `node -e "const d=JSON.parse(require('fs').readFileSync('app/data/inventory.json','utf8')); const n=d.find(x=>x.id==='<id>'); console.log(n.images.every(p=>require('fs').existsSync('public'+p)))"`
   must print `true`.

Note: `npm run typecheck` has pre-existing failures in `InventoryCard.tsx` / `admin/inventory/list.tsx` unrelated to inventory data — do not treat them as blockers for this workflow.
