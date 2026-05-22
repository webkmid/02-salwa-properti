import { Link } from "react-router-dom";
import { useProperties } from "../hooks/useProperties";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const { properties } = useProperties();
  const featured = properties.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white px-5 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            Titip Jual & Beli Properti Terpercaya
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            Temukan Rumah <span className="text-green-600">Impian</span> Kamu
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Ratusan properti pilihan di Surabaya, Sidoarjo, dan sekitarnya. Proses mudah, agen berpengalaman.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/properti"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition-colors">
              Lihat Semua Properti
            </Link>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
              className="border border-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-3 divide-x divide-gray-200">
          {[
            ["200+", "Properti Terjual"],
            ["50+", "Agen Aktif"],
            ["5 Tahun", "Pengalaman"],
          ].map(([num, label]) => (
            <div key={label} className="text-center px-4">
              <div className="text-2xl font-bold text-gray-900">{num}</div>
              <div className="text-sm text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">Properti Unggulan</p>
            <h2 className="text-2xl font-bold text-gray-900">Pilihan Terbaik</h2>
          </div>
          <Link to="/properti" className="text-sm text-green-600 hover:underline font-medium">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-green-600 mx-5 mb-16 rounded-2xl px-8 py-12 text-center max-w-6xl md:mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">Mau Jual atau Titip Jual Properti?</h2>
        <p className="text-green-100 mb-6">Kami bantu pasarkan properti kamu ke ribuan calon pembeli aktif.</p>
        <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors">
          Hubungi Kami Sekarang
        </a>
      </section>
    </div>
  );
}