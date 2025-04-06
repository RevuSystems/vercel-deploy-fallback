import { useEffect, useState } from 'react'
import Link from 'next/link'
export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <div className="p-10 space-y-4 text-center">
      <h1 className="text-5xl font-bold text-emerald-600">ReVu Systems</h1>
      <p className="text-xl text-gray-500">Family Reveal Mode Activated – All Megablocks Live</p>
      <div className="space-y-2">
        <Link href="/soap" className="block bg-gray-100 p-3 rounded">📝 SOAP Notes</Link>
        <Link href="/map" className="block bg-gray-100 p-3 rounded">🗺 Code Flow Map</Link>
        <Link href="/claims/flow" className="block bg-gray-100 p-3 rounded">📊 Claims Dashboard</Link>
        <Link href="/vault/stats" className="block bg-gray-100 p-3 rounded">📁 Vault Metrics</Link>
        <Link href="/cbct-builder" className="block bg-gray-100 p-3 rounded">🧠 CBCT Builder</Link>
      </div>
    </div>
  )
}