// src/app/projects/supply-chain-monitor/page.tsx

import Link from 'next/link'

export default function SupplyChainMonitorPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">🌐 Global Supply Chain Monitor (Real-Time)</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A real-time data platform simulating global logistics, IoT feeds, and live anomaly tracking using cloud-native architecture.
          </p>
        </header>

        {/* Tech Stack */}
        <section className="flex flex-wrap justify-center gap-3">
          {['Apache Kafka', 'Azure Event Hubs', 'BigQuery', 'Azure Synapse', 'Power BI', 'Python ML', 'Next.js', 'TailwindCSS'].map(tech => (
            <span key={tech} className="bg-indigo-700 text-sm px-3 py-1 rounded-full font-medium">
              {tech}
            </span>
          ))}
        </section>

        {/* Real-Time Data Section */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">📡 Real-Time Data Stream</h2>
          <p className="text-gray-400 mb-4">Simulated live data feed showing global shipping or sensor data in motion.</p>
          <div className="bg-gray-800 h-40 rounded-lg flex items-center justify-center text-gray-500 italic">
            [ Streamed data rows will appear here... ]
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">📊 Executive Dashboard</h2>
          <p className="text-gray-400 mb-4">Visualize insights using BI tools — simulate chart-based reporting for supply chain metrics.</p>
          <div className="bg-gray-800 h-48 rounded-lg flex items-center justify-center text-gray-500 italic">
            [ Dashboard chart placeholder ]
          </div>
        </section>

        {/* Anomaly Detection */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">🚨 Anomaly Detection</h2>
          <p className="text-gray-400 mb-4">Mock output from Python/ML pipelines detecting shipping delays or disruptions.</p>
          <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg text-red-300 font-mono">
            ALERT: Route 27 anomaly — ETA deviation detected (↑ 4.2 hrs)
          </div>
        </section>

        {/* Back link */}
        <div className="text-center mt-12">
          <Link href="/" className="text-indigo-400 underline hover:text-indigo-300">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
