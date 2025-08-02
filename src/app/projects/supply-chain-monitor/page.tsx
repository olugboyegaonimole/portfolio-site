import Link from 'next/link'
import RealTimeChart from '@/components/RealTimeChart'
import StreamingLog from '@/components/StreamingLog'
import AnomalyAlert from '@/components/AnomalyAlert'
import StreamDashboard from '@/components/StreamDashboard'  // Added import
import StatusBarChart from '@/components/StatusBarChart'
import AnomalyPieChart from '@/components/AnomalyPieChart'


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
          {[
            'Apache Kafka',
            'Azure Event Hubs',
            'BigQuery',
            'Azure Synapse',
            'Power BI',
            'Python ML',
            'Next.js',
            'TailwindCSS'
          ].map((tech) => (
            <span
              key={tech}
              className="bg-indigo-700 text-sm px-3 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </section>

        {/* Real-Time Data Section */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">📡 Real-Time Data Stream</h2>
          <p className="text-gray-400 mb-4">
            Simulated live data feed showing global shipping or sensor data in motion.
          </p>
          <StreamingLog />
        </section>

        {/* Dashboard Preview */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">📊 Executive Dashboard</h2>
          <p className="text-gray-400 mb-4">
            Visualize insights using BI tools — simulate chart-based reporting for supply chain metrics.
          </p>
          <RealTimeChart />
        </section>

        {/* Anomaly Detection */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <AnomalyAlert />
        </section>

        {/* Anomaly PieChart */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <AnomalyPieChart />
        </section>

        {/* Status BarChart */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <StatusBarChart />
        </section>

        {/* Stream Dashboard */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">📈 Stream Dashboard</h2>
          <StreamDashboard />
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
