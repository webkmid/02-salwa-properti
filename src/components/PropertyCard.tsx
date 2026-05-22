import { Link } from "react-router-dom";
import type { Property } from "../types";

const badgeColor: Record<string, string> = {
  Hot: "bg-red-500 text-white",
  Baru: "bg-green-500 text-white",
  Eksklusif: "bg-yellow-500 text-white",
};

function formatPrice(price: number): string {
  if (price >= 1_000_000_000) return `Rp ${(price / 1_000_000_000).toFixed(1)} M`;
  if (price >= 1_000_000) return `Rp ${(price / 1_000_000).toFixed(0)} Jt`;
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function PropertyCard({ property: p }: { property: Property }) {
  return (
    <Link to={`/properti/${p.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img src={p.images[0]} alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {p.badge && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor[p.badge]}`}>
              {p.badge}
            </span>
          )}
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-gray-700">
            {p.type}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-bold text-lg drop-shadow-md">
            {p.priceLabel || formatPrice(p.price)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
          {p.title}
        </h3>
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {p.location}, {p.city}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-50">
          {p.bedrooms > 0 && <span>{p.bedrooms} KT</span>}
          {p.bathrooms > 0 && <span>{p.bathrooms} KM</span>}
          <span>{p.landArea} m²</span>
          <span className="ml-auto text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {p.certificate}
          </span>
        </div>
      </div>
    </Link>
  );
}