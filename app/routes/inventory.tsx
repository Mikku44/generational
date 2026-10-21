import Logo from "~/components/logo";
import type { Route } from "./+types/inventory";
import { Link, useLoaderData } from "react-router";
import InventoryCard from "~/components/InventoryCard";
import type { Inventory } from "~/models/inventoryModel";

const PER_PAGE = 10;

async function loadAll(): Promise<Inventory[]> {
  try {
    const fs = await import("node:fs/promises");
    const nodePath = await import("node:path");
    const file = nodePath.join(process.cwd(), "app", "data", "inventory.json");
    const raw = await fs.readFile(file, "utf-8");
    const data = JSON.parse(raw) as Inventory[];
    if (Array.isArray(data)) return data;
    throw new Error("inventory.json is not an array");
  } catch {
    const { inventoryData } = await import("~/data/InventoryRepo");
    return inventoryData;
  }
}

// Default: อ่านจาก inventory.json ฝั่ง server (ไม่เข้าฝั่ง client bundle)
// Fallback: ถ้าไฟล์หาย/พัง ถึงจะ dynamic import .ts (server-only เหมือนกัน)
export async function loader({ request }: Route.LoaderArgs) {
  const all = await loadAll();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  let page = parseInt(new URL(request.url).searchParams.get("page") ?? "1", 10);
  if (!Number.isFinite(page) || page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  const start = (page - 1) * PER_PAGE;
  return {
    items: all.slice(start, start + PER_PAGE),
    page,
    perPage: PER_PAGE,
    total,
    totalPages,
  };
}

export function meta({ data }: Route.MetaArgs) {
  const page = data?.page ?? 1;
  const canonicalUrl = page > 1
    ? `https://www.generational.co/inventory/?page=${page}`
    : "https://www.generational.co/inventory/";
  const title = page > 1
    ? `Curated Classic Car Inventory Thailand — Page ${page} | GENERATIONAL`
    : "Curated Classic Car Inventory Thailand — GENERATIONAL";
  return [
    { title },
    {
      name: "description",
      content:
        "Browse GENERATIONAL's curated inventory of rare, historically significant classic cars in Thailand — Ferrari, Porsche, Lamborghini, Honda NSX-R and more.",
    },
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    // — Open Graph
    { property: "og:title", content: title },
    {
      property: "og:description",
      content:
        "Explore GENERATIONAL curated inventory — historically significant, beautifully preserved classic automobiles selected for discerning collectors in Thailand.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    {
      property: "og:image",
      content: "https://www.generational.co/images/inventory.jpg",
    },
    { property: "og:image:alt", content: "Curated classic car inventory by GENERATIONAL Thailand" },
    { property: "og:site_name", content: "GENERATIONAL" },

    // — Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content:
        "Explore Generational's curated inventory — historically significant, beautifully preserved classic automobiles selected for discerning collectors in Thailand.",
    },
    {
      name: "twitter:image",
      content: "https://www.generational.co/images/inventory.jpg",
    },
    { name: "twitter:image:alt", content: "Curated classic car inventory by GENERATIONAL Thailand" },
  ];
}

export default function Inventory() {
  const { items, page, perPage, total, totalPages } = useLoaderData<typeof loader>();
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GENERATIONAL curated classic car inventory",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: (page - 1) * perPage + i + 1,
      url: `https://www.generational.co/inventory/${item.id}`,
      name: item.name,
      image: item.images?.[0] ? `https://www.generational.co${item.images[0]}` : undefined,
    })),
  };
  return (
    <main className="min-h-screen w-full mb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="md:p-10 p-5">
        <Logo />
      </div>
      <h1 className="sr-only">Classic Car Inventory — Curated Collector Automobiles in Thailand by GENERATIONAL</h1>
      {/* <div className="grid container-x md:grid-cols-12 justify-items-center justify-center
       items-center gap-5 md:mt-[220px]  mt-[200px] mb-20">
       
        <div className=" md:col-span-7">
          <div className="md:text-[65px] text-[48px] leading-tight -mt-4 font-semibold mb-2">INVENTORY</div>
          <img src="/images/inventory.jpg" alt="Classic Cars" />
        </div>

      
        <div className="flex md:col-span-5 items-center justify-center gap-5 flex-col">
          <div className=" text-center text-[20px] font-semibold leading-tight">SCAN OUR QR <br /> TO ACCESS OUR INVENTORY</div>
          <img src="/images/qrcode.jpg"
            className="md:size-[200px] size-[40vw]"
            alt="GENERATIONAL qr code" />
        </div>
      </div> */}

      {/* INVENTORY CARDS */}
      <div className="container-x grid md:gap-24 gap-10 md:mt-[220px] mt-[200px]">
        {items.map((item, i) => <InventoryCard
          key={item.id}
          index={(page - 1) * perPage + i}
          item={item} />)}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <nav className="container-x mt-16 flex flex-col items-center gap-4" aria-label="Pagination">
          <div className="text-xs uppercase tracking-[0.25em] opacity-60">
            Showing {from}–{to} of {total}
          </div>
          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link
                to={`?page=${page - 1}`}
                className="px-2 py-2 text-xs uppercase tracking-widest hover:opacity-60 transition-opacity"
              >
                Prev
              </Link>
            ) : (
              <span className="px-2 py-2 text-xs uppercase tracking-widest opacity-30 cursor-not-allowed">
                Prev
              </span>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              p === page ? (
                <span
                  key={p}
                  aria-current="page"
                  className="bg-black text-white border border-black px-4 py-2 text-xs font-bold tracking-widest"
                >
                  {p}
                </span>
              ) : (
                <Link
                  key={p}
                  to={p === 1 ? "/inventory/" : `?page=${p}`}
                  className="border border-black px-4 py-2 text-xs tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                  {p}
                </Link>
              )
            ))}

            {page < totalPages ? (
              <Link
                to={`?page=${page + 1}`}
                className="px-2 py-2 text-xs uppercase tracking-widest hover:opacity-60 transition-opacity"
              >
                Next
              </Link>
            ) : (
              <span className="px-2 py-2 text-xs uppercase tracking-widest opacity-30 cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        </nav>
      )}

    </main>
  )
}
