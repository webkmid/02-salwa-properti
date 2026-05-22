import { useState } from "react";
import { useProperties } from "../hooks/useProperties";
import PropertyCard from "../components/PropertyCard";
import type { FilterState } from "../types";



const defaultFilters: FilterState = {
  type: "", city: "", minPrice: null, maxPrice: null, minBedrooms: null,
};

const types = ["Rumah", "Apartemen", "Ruko", "Tanah", "Vila"];
const cities = ["Surabaya", "Sidoarjo", "Gresik", "Pasuruan"];

export default function PropertyList() {
  const { properties, loading } = useProperties()
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filtered = properties.filter((p) => {
    if (filters.type && p.type !== filters.type) return false;
    if (filters.city && p.city !== filters.city) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.minBedrooms && p.bedrooms < filters.minBedrooms) return false;
    return true;
  });

  if (loading) return (
  <div className="flex items-center justify-center py-32 text-gray-400">
    <p>Memuat properti...</p>
  </div>
)

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Semua Properti</h1>
        <p className="text-gray-500 text-sm">{filtered.length} properti tersedia</p>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8 flex flex-wrap gap-3">
        {/* Tipe */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilters({ ...filters, type: "" })}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              !filters.type ? "bg-green-600 text-white border-green-600" : "border-gray-200 text-gray-600"
            }`}>Semua</button>
          {types.map((t) => (
            <button key={t} onClick={() => setFilters({ ...filters, type: t })}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filters.type === t ? "bg-green-600 text-white border-green-600" : "border-gray-200 text-gray-600"
              }`}>{t}</button>
          ))}
        </div>

        {/* Kota */}
        <select value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="text-xs border border-gray-200 rounded-full px-3 py-1.5 focus:outline-none focus:border-green-400 ml-auto">
          <option value="">Semua Kota</option>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>

        {/* Reset */}
        {(filters.type || filters.city) && (
          <button onClick={() => setFilters(defaultFilters)}
            className="text-xs text-red-500 hover:underline">Reset</button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">Properti tidak ditemukan</p>
          <p className="text-sm mt-1">Coba ubah filter pencarian kamu</p>
        </div>
      )}
    </div>
  );
}