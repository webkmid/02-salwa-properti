import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Beranda" },
    { to: "/properti", label: "Properti" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900">
            Salwa<span className="text-green-600">Properti</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={`text-sm transition-colors ${
                location.pathname === l.to
                  ? "text-green-600 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Hubungi Agen
        </a>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-600">{l.label}</Link>
          ))}
          <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
            className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center">
            Hubungi Agen
          </a>
        </div>
      )}
    </nav>
  );
}