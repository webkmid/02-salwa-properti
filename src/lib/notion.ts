import type { Property } from '../types'

const BASE_URL = 'http://localhost:3001/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePage(page: any): Property {
  const p = page.properties
  const text = (f: any) => f?.rich_text?.[0]?.plain_text ?? ''
  const title = (f: any) => f?.title?.[0]?.plain_text ?? ''
  const num = (f: any) => f?.number ?? 0
  const select = (f: any) => f?.select?.name ?? ''
  const files = (f: any) =>
  f?.files?.map((x: any) => x?.file?.url ?? x?.external?.url ?? '')
    .filter(Boolean) ?? []

  return {
    id: page.id,
    title: title(p['Judul']),
    price: num(p['Harga']),
    priceLabel: text(p['Label Harga']),
    location: text(p['Alamat']),
    city: select(p['Kota']),
    type: select(p['Tipe']),
    status: select(p['Status']),
    badge: select(p['Badge']) || undefined,
    bedrooms: num(p['Kamar Tidur']),
    bathrooms: num(p['Kamar Mandi']),
    landArea: num(p['Luas Tanah']),
    buildingArea: num(p['Luas Bangunan']),
    description: text(p['Deskripsi']),
    images: files(p['Foto']),
    agentName: text(p['Nama Agen']),
    agentPhone: text(p['No HP Agen']),
    certificate: select(p['Sertifikat']),
    furnished: select(p['Furnished']),
    createdAt: page.created_time,
  }
}

export async function fetchProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${BASE_URL}/properties`, { method: 'POST' })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.results.map(parsePage)
  } catch {
    const { dummyProperties } = await import('./dummy')
    return dummyProperties
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`${BASE_URL}/properties/${id}`)
    if (!res.ok) throw new Error()
    const data = await res.json()
    return parsePage(data)
  } catch {
    const { dummyProperties } = await import('./dummy')
    return dummyProperties.find((p) => p.id === id) ?? null
  }
}