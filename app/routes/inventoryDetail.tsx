import { Link, useLoaderData, useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { ChevronLeft, DollarSign, Share2 } from "lucide-react";
import { MdOutlineFullscreen } from "react-icons/md";
import { Remark } from "react-remark";
import { ImagePreview } from "../../components/ui/image-preview";
import Logo from "~/components/logo";
import { motion } from "framer-motion";
import AnimatedSection from "~/components/AnimationSector";
import type { Route } from "./+types/inventoryDetail";

type DetailInventory = {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  price: number;
  status: "available" | "sold";
  cover: {
    href: string;
    type: "video" | "image";
  };
  gallery: string[];
  specs?: Record<string, string | number>;
  content: string;
};

function stripMarkdown(text: string) {
  return text
    .replace(/[#*`>_~\-\\[\]()!]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(text: string, len = 155) {
  const plain = stripMarkdown(text);
  return plain.length > len ? plain.slice(0, len - 1).trimEnd() + "…" : plain;
}

async function loadLocalById(slug: string): Promise<DetailInventory | null> {
  try {
    const fs = await import("node:fs/promises");
    const nodePath = await import("node:path");
    const file = nodePath.join(process.cwd(), "app", "data", "inventory.json");
    const raw = await fs.readFile(file, "utf-8");
    const data = JSON.parse(raw) as Array<{
      id: string;
      name: string;
      status: string;
      description: string;
      images: string[];
    }>;
    const found = data.find((d) => d.id === slug);
    if (!found) return null;
    return {
      id: found.id,
      slug: found.id,
      title: found.name,
      year: "",
      price: 0,
      status: found.status?.toLowerCase() === "sold" ? "sold" : "available",
      cover: { href: found.images?.[0] ?? "/images/inventory.jpg", type: "image" },
      gallery: found.images?.slice(1) ?? [],
      specs: {},
      content: found.description,
    };
  } catch {
    try {
      const { inventoryData } = await import("~/data/InventoryRepo");
      const found = (inventoryData as Array<any>).find((d) => d.id === slug);
      if (!found) return null;
      return {
        id: found.id,
        slug: found.id,
        title: found.name,
        year: "",
        price: 0,
        status: String(found.status ?? "").toLowerCase() === "sold" ? "sold" : "available",
        cover: { href: found.images?.[0] ?? "/images/inventory.jpg", type: "image" },
        gallery: found.images?.slice(1) ?? [],
        specs: {},
        content: found.description,
      };
    } catch {
      return null;
    }
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug || "";
  // 1) Firestore (admin-created entries with slug/title/cover)
  try {
    const { InventoryService } = await import("services/inventoryService");
    const remote = (await InventoryService.getBySlug(slug)) as unknown as DetailInventory | null;
    if (remote) {
      return {
        ...remote,
        slug: (remote as any).slug ?? slug,
        status: String((remote as any).status ?? "available").toLowerCase() === "sold" ? "sold" : "available",
      } as DetailInventory;
    }
  } catch {
    // fall through to local JSON
  }
  // 2) Local curated inventory (id === slug)
  return await loadLocalById(slug);
}

export function meta({ data, params }: Route.MetaArgs) {
  const slug = (params as Record<string, string | undefined>)?.slug ?? "";
  const canonicalUrl = `https://www.generational.co/inventory/${slug}`;
  const item = data as unknown as DetailInventory | null;
  if (!item) {
    return [
      { title: "Vehicle Not Found — GENERATIONAL" },
      { name: "description", content: "The requested vehicle could not be found in GENERATIONAL's curated inventory." },
      { tagName: "link", rel: "canonical", href: canonicalUrl },
      { name: "robots", content: "noindex, follow" },
    ];
  }

  const desc = excerpt(item.content || item.title);
  const image = item.cover?.href?.startsWith("http")
    ? item.cover.href
    : `https://www.generational.co${item.cover?.href ?? "/images/inventory.jpg"}`;
  const title = `${item.title} | Classic Car Thailand — GENERATIONAL`;

  return [
    { title },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: `${item.title} — curated by GENERATIONAL Thailand` },
    { property: "og:site_name", content: "GENERATIONAL" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: `${item.title} — curated by GENERATIONAL Thailand` },
  ];
}

export default function InventoryDetail() {
  const data = useLoaderData<typeof loader>() as unknown as DetailInventory | null;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Smart back: real history back when previous page is internal,
  // otherwise keep the user on the site by going to /inventory.
  const handleBack = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      // 1) SPA internal history (inventory list -> detail, home -> detail, ...).
      // React Router stores an incrementing idx in history.state.
      // If idx > 0 we know the previous entry is ours, even though
      // document.referrer still points at the original page load (e.g. Google).
      const idx = (window.history.state as { idx?: unknown } | null)?.idx;
      if (typeof idx === "number" && idx > 0 && window.history.length > 1) {
        navigate(-1);
        return;
      }

      // 2) Full-page load with no SPA history: only go back when the
      // referrer is generational.co (or the same host, e.g. localhost preview).
      const ref = document.referrer;
      if (ref) {
        try {
          const refHost = new URL(ref).hostname.toLowerCase();
          const curHost = window.location.hostname.toLowerCase();
          const isSameSite =
            refHost === curHost ||
            refHost === "generational.co" ||
            refHost.endsWith(".generational.co");
          if (isSameSite && window.history.length > 1) {
            window.history.back();
            return;
          }
        } catch {
          // malformed referrer -> fall through to /inventory
        }
      }

      // 3) Direct entry, bookmark, or external referrer (Google, Facebook, ...):
      // never send the user away, keep them on the website.
      navigate("/inventory");
    },
    [navigate]
  );

  // All viewable images: cover (if image) + gallery
  const allImages: string[] = data
    ? [
        ...(data.cover?.type === "image" && data.cover.href ? [data.cover.href] : []),
        ...(data.gallery ?? []),
      ]
    : [];

  // Image distribution: [0] = hero above description,
  // [1] = image above Interested?, rest = gallery
  const showInterestedImage = (data?.status ?? "available") === "available" && allImages.length > 1;
  const galleryOffset = allImages.length > 0 ? (showInterestedImage ? 2 : 1) : 0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.title,
        text: `Check out this ${data?.year ? data.year + " " : ""}${data?.title} at GENERATIONAL`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
        <p className="text-gray-600 mb-4">This vehicle is no longer in our curated inventory.</p>
        <Link to="/inventory" className="text-blue-600 hover:underline">
          Back to Inventory
        </Link>
      </div>
    );
  }

  const carSchema = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: data.title,
    description: excerpt(data.content, 300),
    image: [data.cover?.href, ...(data.gallery ?? [])].filter(Boolean).map((src) =>
      src.startsWith("http") ? src : `https://www.generational.co${src}`
    ),
    url: `https://www.generational.co/inventory/${data.slug}`,
    vehicleModelDate: data.year || undefined,
    ...(data.price > 0
      ? {
          offers: {
            "@type": "Offer",
            availability:
              data.status === "available"
                ? "https://schema.org/InStock"
                : "https://schema.org/SoldOut",
            priceCurrency: "USD",
            price: data.price,
            url: `https://www.generational.co/inventory/${data.slug}`,
          },
        }
      : {}),
  };

  return (
    <div className="mx-auto mb-20 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carSchema) }}
      />
      <div className="md:p-10 p-5">
        <Logo />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl md:mt-[120px] mt-[100px]">
        <Link
          to="/inventory"
          onClick={handleBack}
          className="py-5 flex hover:opacity-60 duration-200 font-bold items-center gap-2"
        >
          <ChevronLeft /> Back to Inventory
        </Link>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{data.title}</h1>
            {data.subtitle && (
              <p className="text-xl text-gray-600 font-light mb-4">{data.subtitle}</p>
            )}
            <div
              className="inline-block px-4 py-2 text-white text-sm font-medium uppercase bg-black"
            >
              {data.status}
            </div>
            {data.year && (
              <div className="mt-3 text-sm uppercase tracking-wider text-gray-600">{data.year}</div>
            )}
            {data.price > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <DollarSign className="w-5 h-5" />
                <span className="text-4xl font-bold">${data.price.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Hero — first image, full-bleed like Our Services */}
      {allImages.length > 0 && (
        <div
          className="w-full h-[520px] md:h-[820px] overflow-hidden cursor-pointer group relative"
          onClick={() => setSelectedIndex(0)}
        >
          <img
            src={allImages[0]}
            alt={`${data.title} — featured view`}
            loading="eager"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-end justify-end p-5">
            <MdOutlineFullscreen className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Description — Our Services style: big heading left, body right */}
        <div className="w-full grid md:grid-cols-12 mt-[48px] gap-5">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:text-[65px] text-[48px] -mt-3 font-semibold md:col-span-7"
          >
            DESCRIPTION
          </motion.h2>
          <motion.div className="space-y-4 md:col-span-5">
            <AnimatedSection>
              {data.content ? (
                <Remark
                  remarkParseOptions={{ commonmark: true }}
                  rehypeReactOptions={{
                    components: {
                      p: (props: any) => <p className="text-[20px] font-medium mb-3" {...props} />,
                      ul: (props: any) => <ul className="list-disc pl-5 mb-3 space-y-2" {...props} />,
                      li: (props: any) => <li className="text-[20px] font-medium" {...props} />,
                      h3: (props: any) => <h3 className="text-[26px] font-medium mb-2 mt-8" {...props} />,
                      strong: (props: any) => <strong className="font-bold" {...props} />,
                    }
                  }}
                >
                  {data.content}
                </Remark>
              ) : (
                <p className="text-[20px] font-medium">No description available.</p>
              )}
            </AnimatedSection>
          </motion.div>
        </div>

        {/* Specifications — Our Services Section style */}
        {data.specs && Object.keys(data.specs).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full grid md:grid-cols-12 mt-[48px] gap-5"
          >
            <div className="md:col-span-7"></div>
            <div className="md:col-span-5">
              <h2 className="text-[26px] font-bold mb-2">SPECIFICATIONS</h2>
              <dl className="space-y-4">
                {Object.entries(data.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 border-b border-black/10 pb-2">
                    <dt className="text-[20px] font-medium capitalize">
                      {key.replace(/_/g, " ")}:
                    </dt>
                    <dd className="text-[20px] font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        )}

        {/* Cover video (when cover is video, images still slide in lightbox) */}
        {data.cover?.type === "video" && data.cover.href && (
          <div className="mt-14">
            <video controls className="w-full object-cover" title={`${data.title} — video walkthrough`}>
              <source src={data.cover.href} />
            </video>
          </div>
        )}

      </div>

      {/* Interested? — Our Services style with its own full-bleed image above */}
      {data.status === "available" && (
        <>
          {showInterestedImage && (
            <div
              className="w-full h-[420px] md:h-[680px] overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedIndex(1)}
            >
              <img
                src={allImages[1]}
                alt={`${data.title} — contact our team about this vehicle`}
                loading="lazy"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-end justify-end p-5">
                <MdOutlineFullscreen className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          )}
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="w-full grid md:grid-cols-12 mt-[48px] gap-5 min-h-[600px]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:text-[65px] text-[48px] -mt-3 font-semibold md:col-span-7"
              >
                INTERESTED?
              </motion.h2>
              <motion.div className="space-y-4 md:col-span-5">
                <AnimatedSection>
                  <p className="text-[20px] font-medium">
                    Contact us for more information about this vehicle.
                  </p>
                  <div className="text-[26px] font-bold pt-2">TALK TO GENERATIONAL</div>
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="text-[20px] font-medium text-gray-600">MOBILE</div>
                      <a href="tel:+66891991191" className="text-[20px] font-medium hover:opacity-60">+66 919 911 911</a>
                    </div>
                    <div>
                      <div className="text-[20px] font-medium text-gray-600">WHATSAPP</div>
                      <a href="https://wa.me/66851661256" target="_blank" className="text-[20px] font-medium hover:opacity-60">+66 851 661 256</a>
                    </div>
                    <div>
                      <div className="text-[20px] font-medium text-gray-600">MOBILE (UNITED KINGDOM)</div>
                      <a href="tel:+447500007008" className="text-[20px] font-medium hover:opacity-60">+44 7500 007 008</a>
                    </div>
                    <div>
                      <div className="text-[20px] font-medium text-gray-600">EMAIL</div>
                      <a href="mailto:HELLO@GENERATIONAL.CO" className="text-[20px] font-medium hover:opacity-60 break-words">HELLO@GENERATIONAL.CO</a>
                    </div>
                    <div>
                      <div className="text-[20px] font-medium text-gray-600">LINE ID</div>
                      <a href="https://line.me/R/ti/p/@generational" target="_blank" rel="noopener" className="text-[20px] font-medium hover:opacity-60">@GENERATIONAL</a>
                    </div>
                    <div>
                      <div className="text-[20px] font-medium text-gray-600">INSTAGRAM</div>
                      <a href="https://www.instagram.com/drivegenerational/?utm_source=ig_web_button_share_sheet" target="_blank" className="text-[20px] font-medium hover:opacity-60">@DRIVEGENERATIONAL</a>
                    </div>
                  </div>
                </AnimatedSection>
              </motion.div>
            </div>
          </div>
        </>
      )}

      {/* Full-bleed Gallery — like Our Services ImageBox sections */}
      {allImages.length > galleryOffset && (
        <section aria-label="Gallery" className="w-full mt-14">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="md:text-[65px] text-[48px] font-semibold"
            >
              GALLERY
            </motion.h2>
          </div>
          <div className="w-full">
            {allImages.slice(galleryOffset).map((img, i) => (
              <div
                key={i}
                className="w-full h-[420px] md:h-[680px] overflow-hidden cursor-pointer group relative"
                onClick={() => setSelectedIndex(i + galleryOffset)}
              >
                <img
                  src={img}
                  alt={`${data.title} — gallery view ${i + galleryOffset + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-end justify-end p-5">
                  <MdOutlineFullscreen className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen filmstrip image preview */}
      <ImagePreview
        images={allImages}
        name={data.title}
        detailHref={`/inventory/${data.id}`}
        index={selectedIndex}
        onSelect={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </div>
  );
}
