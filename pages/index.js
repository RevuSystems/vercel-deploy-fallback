import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!isMounted) return null // ✨ Hydration-safe render

  return (
    <div className="p-10 text-center space-y-6">
      <h1 className="text-5xl font-bold text-emerald-700">ReVu Systems – Full Access</h1>
      <p className="text-gray-600 text-xl">Every MEGABLOCK Live – Clinical Billing Intelligence Suite</p>
      <div className="mt-8 space-y-4">
        <Link href="/ask" className="block bg-emerald-500 text-white p-3 rounded">🧠 Ask ReVu Anything</Link>
        <Link href="/megablocks-demo" className="block bg-gray-200 p-3 rounded">🔍 Intelligence Demo Suite</Link>
        <Link href="/vault" className="block bg-gray-200 p-3 rounded">📁 Vault v2 Interface</Link>
        <Link href="/cbct-builder" className="block bg-gray-200 p-3 rounded">🦷 CBCT Stack Builder</Link>
        <Link href="/audit/export" className="block bg-gray-200 p-3 rounded">🔥 Audit Heatmap Export</Link>
        <Link href="/scrubber" className="block bg-gray-200 p-3 rounded">✨ Claim Scrubber v2</Link>
        <Link href="/rewrite" className="block bg-gray-200 p-3 rounded">📝 Clinical AI Rewrite</Link>
        <Link href="/recall" className="block bg-gray-200 p-3 rounded">📅 Predictive Recall Builder</Link>
        <Link href="/map" className="block bg-gray-200 p-3 rounded">🌐 Code Map Visualizer</Link>
        <Link href="/soap" className="block bg-gray-200 p-3 rounded">📄 SOAP Note Generator</Link>
      </div>
    </div>
  )
}