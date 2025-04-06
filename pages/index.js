import Link from 'next/link'
export default function Home() {
  return (
    <div className="p-10 text-center space-y-6">
      <h1 className="text-5xl font-bold text-emerald-700">ReVu Systems - FULL SYSTEM ACCESS</h1>
      <p className="text-gray-600 text-xl">Every MEGABLOCK Activated – Clinical Billing Domination</p>
      <div className="mt-8 space-y-4">
        <Link href="/ask" className="block bg-emerald-500 text-white p-3 rounded">🧠 Ask ReVu Anything Engine</Link>
        <Link href="/vault" className="block bg-gray-200 p-3 rounded">📁 Vault v2 Reactive UI</Link>
        <Link href="/vault/export" className="block bg-gray-200 p-3 rounded">📄 Vault PDF Export</Link>
        <Link href="/megablocks-demo" className="block bg-gray-200 p-3 rounded">🔍 Intelligence Demo Suite</Link>
        <Link href="/cbct-builder" className="block bg-gray-200 p-3 rounded">🦷 CBCT Auto Stack Builder</Link>
        <Link href="/audit/export" className="block bg-gray-200 p-3 rounded">🔥 Audit Heatmap Export</Link>
        <Link href="/scrubber" className="block bg-gray-200 p-3 rounded">✨ Claim Scrubber v2</Link>
        <Link href="/rewrite" className="block bg-gray-200 p-3 rounded">📝 Clinical AI Rewrite</Link>
        <Link href="/recall" className="block bg-gray-200 p-3 rounded">📅 Predictive Recall Builder</Link>
      </div>
    </div>
  )
}