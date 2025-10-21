import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { InventoryService } from "services/inventoryService";
import { ChevronLeft, Calendar, DollarSign, Gauge, Eye, Share2, Phone, Mail } from "lucide-react";
import type { Route } from "./admin/inventory/+types/list";

type Inventory = {
  id?: string;
  slug?: string;
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
  created_at?: any;
  updated_at?: any;
  isPublished?: boolean;
};
 export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const data = await InventoryService.getBySlug(slug || "");
  return data; // can be null
}

// ✅ 2. Now safely use it in meta()
export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [
      { title: "Not Found - GENERATIONAL" },
      { name: "description", content: "Car not found." },
    ];
  }

  return [
    { title: `${data.title} - GENERATIONAL` },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}



export default function InventoryDetail() {
  const { slug } = useParams();
  const [data, setData] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    InventoryService.getBySlug(slug)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.title,
        text: `Check out this ${data?.year} ${data?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
        <Link to="/inventory" className="text-blue-600 hover:underline">
          Back to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-20 space-y-6">
      {/* Cover (video or image) */}
      <div className="h-[500px] overflow-clip relative bg-black">
        <div className="w-full absolute z-20">
          <Link
            to="/inventory"
            className="container-x py-5 flex hover:text-white/80 duration-200 font-bold items-center gap-2 text-white"
          >
            <ChevronLeft /> Back to Inventory
          </Link>
        </div>
        
        {data.status !== "available" && (
          <div className="bg-black/70 text-5xl  font-bold flex items-center justify-center text-white absolute w-full h-full capitalize z-10">
            {data.status}
          </div>
        )}
        
        {data.cover.type === "image" ? (
          <img src={data.cover.href} className="w-full h-full object-cover" alt={data.title} />
        ) : (
          <video controls className="w-full h-full object-cover">
            <source src={data.cover.href} />
          </video>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{data.title}</h1>
            {data.subtitle && (
              <p className="text-xl text-gray-600 font-light mb-4">{data.subtitle}</p>
            )}
            <div
              className={`inline-block px-4 py-2 text-white text-sm font-medium uppercase ${
                data.status === "available" ? "bg-green-600" : "bg-gray-600"
              }`}
            >
              {data.status}
            </div>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-lg leading-relaxed whitespace-pre-line text-gray-700">
                {data.content || "No description available."}
              </p>
            </div>

            {/* Specifications */}
            {data.specs && Object.keys(data.specs).length > 0 && (
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(data.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-700 capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square cursor-pointer group overflow-hidden"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${data.title} ${i + 1}`}
                        className="w-full h-full object-cover transition group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Price Card */}
              <div className="bg-black text-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-wider">Price</span>
                </div>
                <div className="text-4xl font-bold">
                  ${data.price.toLocaleString()}
                </div>
              </div>

              {/* Vehicle Info Card */}
              <div className="bg-white border border-gray-200 p-6 space-y-4">
                <h3 className="text-xl font-bold mb-4">Vehicle Information</h3>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600">Year</div>
                    <div className="font-bold text-lg">{data.year}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Gauge className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div className="font-bold text-lg capitalize">{data.status}</div>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              {data.status === "available" && (
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="text-xl font-bold mb-4">Interested?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact us for more information about this vehicle.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+668919911911"
                      className="flex items-center gap-3 px-4 py-3 bg-black text-white hover:bg-gray-800 transition"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Us</span>
                    </a>
                    <a
                      href="mailto:HELLO@GENERATIONAL.CO.TH"
                      className="flex items-center gap-3 px-4 py-3 border border-gray-300 hover:bg-gray-50 transition"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email Us</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}