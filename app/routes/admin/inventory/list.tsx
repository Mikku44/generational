import React, { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";
import { InventoryService } from "services/inventoryService";
import type { Inventory } from "~/models/inventoryModel";
import { Link } from "react-router";

const defaultFormData = {
    title: "",
    year: "",
    price: "",
    status: "available" as "available" | "sold",
    image: "",
    content : ""
  }

export default function InventoryListRealtime() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState<(Inventory & { id: string })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingCar, setEditingCar] = useState<(Inventory & { id: string }) | null>(null);

  const [formData, setFormData] = useState(defaultFormData);

  // Subscribe to Firestore realtime updates
  useEffect(() => {
    const unsubscribe = InventoryService.listen((data) => {
      setCars(data);
    });

    return () => unsubscribe();
  }, []);

  const formatCurrency = (v: number) => {
    try {
      return v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    } catch {
      return String(v);
    }
  };

  const handleAddCar = async () => {
    if (formData.title && formData.year && formData.price) {
      setLoading(true);
      setError("");

      try {
        const priceNumber = parseFloat(formData.price.replace(/[^0-9.]/g, ""));

        if (isNaN(priceNumber)) {
          setError("Please enter a valid price");
          setLoading(false);
          return;
        }

        await InventoryService.create({
          title: formData.title,
          year: formData.year,
          price: priceNumber,
          status: formData.status,
          cover: {
            href: formData.image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
            type: "image"
          },
          gallery: formData.image ? [formData.image] : [],
          content: formData.content,
          slug: `${formData.title}-${formData.year}-${formData.price}`
        });

        setFormData(defaultFormData);
        setShowAddModal(false);
      } catch (err) {
        setError("Failed to add vehicle. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCar = async () => {
    if (!editingCar || !formData.title || !formData.year || !formData.price) return;

    setLoading(true);
    setError("");

    try {
      const priceNumber = parseFloat(formData.price.replace(/[^0-9.]/g, ""));

      if (isNaN(priceNumber)) {
        setError("Please enter a valid price");
        setLoading(false);
        return;
      }

      await InventoryService.update(editingCar.id!, {
        title: formData.title,
        year: formData.year,
        price: priceNumber,
        status: formData.status,
        cover: {
          href: formData.image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
          type: "image"
        },
        content:formData.content,
        gallery: formData.image ? [formData.image] : [],
      });

      setFormData(defaultFormData);
      setShowEditModal(false);
      setEditingCar(null);
    } catch (err) {
      setError("Failed to update vehicle. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    setLoading(true);
    try {
      await InventoryService.delete(id);
    } catch (err) {
      setError("Failed to delete vehicle. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (car: Inventory & { id: string }) => {
    setEditingCar(car);
    const imageUrl = car.cover?.href || (car.gallery && car.gallery[0]) || "";
    setFormData({
      title: car.title,
      year: car.year,
      price: String(car.price),
      status: car.status,
      image: imageUrl,
      content : car.content
    });
    setShowEditModal(true);
  };

  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase()) || car.year.includes(searchQuery)
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
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

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
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2 hover:bg-gray-800 transition disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              Add Vehicle
            </button>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car: Inventory & {id:string}) => (
            <div key={car.id} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 bg-gray-200">
                <img src={car.gallery?.[0]} alt={car.title} className="w-full h-full object-cover" />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium uppercase ${car.status === "available" ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                >
                  {car.status}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">{car.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Year: {car.year}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">{formatCurrency(car.price)}</p>

                <div className="flex gap-2 mt-4">
                  <Link to={`/inventory/${car.slug}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 hover:bg-gray-50 transition text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  <button
                    onClick={() => openEditModal(car)}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 hover:bg-gray-50 transition text-sm disabled:opacity-50"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {car?.id && handleDelete(car.id, car.title)}}
                    disabled={loading}
                    className="flex items-center justify-center px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 transition text-sm disabled:opacity-50"
                    aria-label={`Delete ${car.title}`}
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
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full max-h-[80vh] overflow-scroll p-6">
            <h3 className="text-2xl font-bold mb-6">Add New Vehicle</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Name</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  placeholder="e.g., 250000 or $250,000"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content / Description
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Write a detailed description here..."
                  rows={5} // adjust as needed
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "available" | "sold" })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setError("");
                }}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCar}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Vehicle Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 overflow-scroll max-h-[80vh]">
            <h3 className="text-2xl font-bold mb-6">Edit Vehicle</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Name</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  placeholder="e.g., 250000 or $250,000"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content / Description
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Write a detailed description here..."
                  rows={5} // adjust as needed
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "available" | "sold" })}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCar(null);
                  setError("");
                }}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditCar}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}