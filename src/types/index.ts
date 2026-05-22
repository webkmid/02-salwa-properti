export interface Property {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  location: string;
  city: string;
  type: "Rumah" | "Apartemen" | "Ruko" | "Tanah" | "Vila";
  status: "Dijual" | "Terjual" | "Disewakan";
  badge?: "Baru" | "Hot" | "Eksklusif";
  bedrooms: number;
  bathrooms: number;
  landArea: number;
  buildingArea: number;
  description: string;
  images: string[];
  agentName: string;
  agentPhone: string;
  certificate: string;
  furnished: "Full Furnished" | "Semi Furnished" | "Unfurnished" | "-";
  createdAt: string;
}

export interface FilterState {
  type: string;
  city: string;
  minPrice: number | null;
  maxPrice: number | null;
  minBedrooms: number | null;
}