import { useState, useEffect } from 'react'
import type { Property, FilterState } from '../types'
import { fetchProperties, fetchPropertyById } from '../lib/notion'

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProperties()
      .then(setProperties)
      .catch(() => setError('Gagal memuat properti'))
      .finally(() => setLoading(false))
  }, [])

  return { properties, loading, error }
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPropertyById(id)
      .then(setProperty)
      .finally(() => setLoading(false))
  }, [id])

  return { property, loading }
}

export function formatPrice(price: number): string {
  if (price >= 1_000_000_000)
    return `Rp ${(price / 1_000_000_000).toFixed(1)} M`
  if (price >= 1_000_000)
    return `Rp ${(price / 1_000_000).toFixed(0)} Jt`
  return `Rp ${price.toLocaleString('id-ID')}`
}