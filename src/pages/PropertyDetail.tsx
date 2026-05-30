import { useParams, Link } from "react-router-dom";
import { useProperty } from "../hooks/useProperties";
import { useState } from "react";

export default function PropertyDetail() {
  const { id } = useParams();
  const { property, loading } = useProperty(id!);
  const [activeImg, setActiveImg] = useState(0);

  if (loading) return (
    <div className="flex items-center justify-center py-32 text-gray-400">
      <p>Memuat data...</p>
    </div>
  );

  if (!property) return (
    <div className="text-center py-32 text-gray-400">
      <p className="text-lg font-medium">Properti tidak ditemukan</p>
      <Link to="/properti" className="text-green-600 text-sm mt-2 inline-block hover:underline">
        ← Kembali
      </Link>
    </div>
  );

  const p = property;
  const waMessage = encodeURIComponent(
    `Halo, saya tertarik dengan properti: ${p.title} (${p.priceLabel}). Apakah masih tersedia?`
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 overflow-x-hidden">
      <Link to="/properti"
        className="text-sm text-gray-400 hover:text-green-600 flex items-center gap-1 mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Kembali
      </Link>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Kiri */}
        <div className="md:col-span-2 min-w-0">

          {/* Foto Utama */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-3 w-full"
            style={{ height: 300 }}>
            <img
              src={p.images[activeImg]}
              alt={p.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {/* Navigation arrows */}
            {p.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => Math.max(0, i - 1))}
                  disabled={activeImg === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition disabled:opacity-30"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImg((i) => Math.min(p.images.length - 1, i + 1))}
                  disabled={activeImg === p.images.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition disabled:opacity-30"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
            {/* Counter */}
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
              {activeImg + 1} / {p.images.length}
            </div>
            {/* Badge */}
            {p.badge && (
              <div className="absolute top-3 left-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  p.badge === "Hot" ? "bg-red-500 text-white" :
                  p.badge === "Baru" ? "bg-green-500 text-white" :
                  "bg-yellow-500 text-white"
                }`}>
                  {p.badge}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip — fix scroll horizontal */}
          {p.images.length > 1 && (
            <div
              className="mb-6"
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                overflowY: "hidden",
                paddingBottom: 4,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {p.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    flexShrink: 0,
                    width: 72,
                    height: 56,
                    borderRadius: 10,
                    overflow: "hidden",
                    border: activeImg === i ? "2px solid #16A34A" : "2px solid transparent",
                    opacity: activeImg === i ? 1 : 0.6,
                    cursor: "pointer",
                    padding: 0,
                    background: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <img
                    src={img}
                    alt={`foto ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Judul */}
          <h1 className="text-xl font-bold text-gray-900 mb-2 pr-2">{p.title}</h1>
          <p className="text-gray-400 text-sm flex items-center gap-1 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {p.location}, {p.city}
          </p>

          {/* Spesifikasi — 2 kolom di mobile, 4 di desktop */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {[
              ["Tipe", p.type],
              ["Luas Tanah", `${p.landArea} m²`],
              ["Luas Bangunan", `${p.buildingArea} m²`],
              ["Sertifikat", p.certificate],
              ...(p.bedrooms > 0 ? [["Kamar Tidur", `${p.bedrooms} kamar`]] : []),
              ...(p.bathrooms > 0 ? [["Kamar Mandi", `${p.bathrooms} kamar`]] : []),
              ["Furnished", p.furnished],
              ["Status", p.status],
            ].map(([label, val]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <p className="text-sm font-medium text-gray-800 truncate">{val}</p>
              </div>
            ))}
          </div>

          {/* Deskripsi */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="font-semibold text-gray-900 mb-2">Deskripsi</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
          </div>
        </div>

        {/* Kanan — harga & kontak */}
        {/* Di mobile tampil di bawah konten, di desktop sticky di kanan */}
        <div className="md:block">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 md:sticky md:top-20">
            <p className="text-xs text-gray-400 mb-1">Harga</p>
            <p className="text-2xl font-bold text-green-600 mb-1">{p.priceLabel}</p>
            <p className="text-xs text-gray-400 mb-5">{p.type} · {p.certificate}</p>

            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm shrink-0">
                {p.agentName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{p.agentName}</p>
                <p className="text-xs text-gray-400">Agen Properti</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${p.agentPhone}?text=${waMessage}`}
              target="_blank" rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors mb-3 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.999 2C6.477 2 2 6.477 2 12c0 1.989.583 3.842 1.592 5.395L2 22l4.735-1.57A9.959 9.959 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
              Chat WhatsApp
            </a>
            
            <a
              href={`tel:+${p.agentPhone}`}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Telepon Agen
            </a>

            <button
              onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Link disalin!'))}
              className="w-full flex items-center justify-center gap-2 mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
              </svg>
              Salin link properti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}