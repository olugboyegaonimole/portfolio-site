// src/app/page.tsx

import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-900 via-indigo-900 to-black text-white flex flex-col items-center justify-center px-6 py-12">
      <section className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Olu&rsquo;s Data Engineering Portfolio
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Modern Data Engineer specializing in Cloud Data Platforms, Real-time Analytics, and Scalable Data Architectures.
        </p>
        <Image
          src="/profile-photo.jpg" // Add your photo in public/profile-photo.jpg
          alt="Oonim Profile"
          width={160}
          height={160}
          className="rounded-full mx-auto mb-8"
          priority
        />
      </section>

      <section className="max-w-4xl space-y-8 text-left">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>

        <article className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Global Supply Chain Monitor (Real-Time)</h3>
          <p className="text-gray-300 mb-4">
            A scalable cloud-based data platform that ingests real-time global shipping data, integrates IoT and satellite feeds, and provides actionable dashboards for supply chain resilience.
          </p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Streaming data ingestion with Apache Kafka and Azure Event Hubs</li>
            <li>Data lakehouse architecture on GCP BigQuery & Azure Synapse</li>
            <li>Power BI and Looker dashboards for executive insights</li>
            <li>Automated anomaly detection using Python and ML models</li>
          </ul>
        </article>

        <article className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Smart Energy Analytics Platform</h3>
          <p className="text-gray-300 mb-4">
            Developed a platform for utility companies to analyze energy consumption patterns using IoT sensor data and predictive analytics.
          </p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Azure Data Factory pipelines for ETL automation</li>
            <li>Real-time Power BI reports with embedded analytics</li>
            <li>Integration with GCP Vertex AI for demand forecasting</li>
          </ul>
        </article>
      </section>

      <section className="max-w-3xl mt-12 text-center">
        <p className="text-gray-400">
          Connect with me on{' '}
          <a
            href="https://www.linkedin.com/in/olugboyega-onimole-9b5009366"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 underline"
          >
            LinkedIn
          </a>{' '}
          or view my{' '}
          <a
            href="https://github.com/olugboyegaonimole"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 underline"
          >
            GitHub
          </a>.
        </p>
      </section>
    </main>
  )
}
