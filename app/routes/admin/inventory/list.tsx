import React, { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";
import { InventoryService } from "services/inventoryService";


type LocalCar = {
  id: string | number;
  name: string;
  year: string;
  price: string;
  status: string;
  image: string;
  createdAt?: string;
};

const FALLBACK_CARS: LocalCar[] = [
  {
    id: "demo-1",
    name: "Lamborghini Huracan",
    year: "2017",
    price: "$250,000",
    status: "Available",
    image:
      "https://www.lamborghinilongisland.com/imagetag/1939/5/l/New-2017-Lamborghini-Huracan-RWD-Coupe-1498579834.jpg",
  },
  {
    id: "demo-2",
    name: "Ferrari 488 GTB",
    year: "2019",
    price: "$320,000",
    status: "Sold",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400",
  },
  {
    id: "demo-3",
    name: "Porsche 911 GT3",
    year: "2021",
    price: "$180,000",
    status: "Available",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
  },
];

export default function InventoryListRealtime() {
  // UI state (local-only add/delete/edit)
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState<LocalCar[]>(FALLBACK_CARS);

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    price: "",
    status: "Available",
    image: "",
  });

  // Subscribe to Firestore realtime updates
  useEffect(() => {
    // subscribe; InventoryService.listen returns unsubscribe function
    const unsubscribe = InventoryService.listen((data) => {
      // data: Inventory[] from Firestore
      if (Array.isArray(data) && data.length > 0) {
        // Map Firestore inventory to LocalCar shape
        const mapped = data.map((item: any) => {
          // inventory model may use title, cover.href, gallery, price (number)
          const name = item.title ?? item.name ?? "Untitled";
          const year = item.year ?? "";
          const priceRaw = item.price ?? "";
          const price = typeof priceRaw === "number" ? formatCurrency(priceRaw) : String(priceRaw || "");
          const status = item.status ?? "Available";
          const image =
            (item.cover && item.cover.href) ||
            (Array.isArray(item.gallery) && item.gallery[0]) ||
            item.image ||
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400";

          const createdAt =
            item.created_at && item.created_at.toDate
              ? item.created_at.toDate().toLocaleString()
              : item.created_at
              ? String(item.created_at)
              : undefined;

          return {
            id: item.id ?? item.id, // Firestore doc id should be present as .id in listen mapping
            name,
            year,
            price,
            status,
            image,
            createdAt,
          } as LocalCar;
        });

        setCars(mapped);
      } else {
        // if firestore empty, keep fallback demo cars (as requested)
        setCars(FALLBACK_CARS);
      }
    });

    return () => unsubscribe();
  }, []);

  // helper: format number to currency (basic)
  function formatCurrency(v: number) {
    try {
      return v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    } catch {
      return String(v);
    }
  }

  // local-only add (does NOT write to Firestore per your request)
  const handleAddCar = () => {
    if (formData.name && formData.year && formData.price) {
      const newCar: LocalCar = {
        id: `local-${Date.now()}`,
        name: formData.name,
        year: formData.year,
        price: formData.price,
        status: formData.status,
        image: formData.image || FALLBACK_CARS[0].image,
      };
      setCars((prev) => [newCar, ...prev]);
      setFormData({ name: "", year: "", price: "", status: "Available", image: "" });
      setShowAddModal(false);
    }
  };

  // local-only delete (does NOT delete from Firestore)
  const handleDelete = (id: string | number) => {
    setCars((prev) => prev.filter((c) => c.id !== id));
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) || car.year.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider">GENERATIONAL</h1>
          <p className="text-sm tracking-widest text-gray-400 mt-1">ADMIN INVENTORY</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Top Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">INVENTORY</h2>
            <p className="text-gray-500 text-sm mt-1">{cars.length} vehicles in collection</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
            >
              <Plus className="w-5 h-5" />
              Add Vehicle
            </button>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 bg-gray-200">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium ${
                    car.status.toLowerCase() === "available" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {car.status}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">{car.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Year: {car.year}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">{car.price}</p>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 hover:bg-gray-50 transition text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 hover:bg-gray-50 transition text-sm">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="flex items-center justify-center px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 transition text-sm"
                    aria-label={`Delete ${car.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12 text-gray-500">No vehicles found matching your search.</div>
        )}
      </main>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-6">Add New Vehicle</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g., Lamborghini Huracan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g., 2021"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g., $250,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button onClick={handleAddCar} className="flex-1 px-4 py-2 bg-black text-white hover:bg-gray-800 transition">
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
