'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-900 via-indigo-900 to-black text-white flex flex-col items-center justify-center px-6 py-12">
      <section className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Olu
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Data Engineer specializing in Cloud Data Platforms, Real-time Analytics, and Scalable Data Architectures.
        </p>
        <Image
          src="/profile-photo.jpg"
          alt="Oonim Profile"
          width={160}
          height={160}
          className="rounded-full mx-auto mb-8"
          priority
        />
      </section>

      <section className="max-w-4xl space-y-8 text-left">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>

        {/* 🔗 Clickable project card */}
        <Link href="/projects/supply-chain-monitor" prefetch={false} className="block">
          <article className="bg-gray-900 rounded-lg p-6 shadow-lg hover:bg-indigo-900 transition-colors cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">Global Supply Chain Monitor (Real-Time)</h3>
            <p className="text-gray-300 mb-4">
              A cloud-based real-time monitoring dashboard that ingests IoT logistics data and visualizes temperature anomalies across global supply chain routes for operational awareness.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Real-time data ingestion with Firebase Firestore</li>
              <li>Frontend built with React (Next.js) and deployed via Vercel</li>
              <li>Rule-based anomaly detection implemented with TypeScript</li>
              <li>Interactive visualizations using Recharts and Tailwind CSS</li>
              <li>Filtering by location, status, and time range (10min / 1hr)</li>
            </ul>
            <p className="text-indigo-400 underline mt-4">View Project &rarr;</p>
          </article>
        </Link>

        <Link href="/projects/blog-summarizer" prefetch={false} className="block">
          <article className="bg-gray-900 rounded-lg p-6 shadow-lg hover:bg-indigo-900 transition-colors cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">📰 Blog Summarizer</h3>
            <p className="text-gray-300 mb-4">
              A web app that summarizes blogs into concise overviews using NLP, FastAPI, and a Next.js frontend.
            </p>
            <p className="text-indigo-400 underline mt-4">View Project →</p>
          </article>
        </Link>

        <Link href="/projects/chatbot" prefetch={false} className="block">
          <article className="bg-gray-900 rounded-lg p-6 shadow-lg hover:bg-indigo-900 transition-colors cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">💬 AI Chatbot</h3>
            <p className="text-gray-300 mb-4">
              A conversational AI powered by BlenderBot (400M-distill), deployed with FastAPI on Render and integrated with a Next.js frontend.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>FastAPI backend hosted on Render</li>
              <li>Frontend built with Next.js + Tailwind CSS</li>
              <li>Interactive chat interface with streaming responses</li>
            </ul>
            <p className="text-indigo-400 underline mt-4">View Project →</p>
          </article>
        </Link>

        <Link href="/projects/companion" prefetch={false} className="block">
          <article className="bg-gray-900 rounded-lg p-6 shadow-lg hover:bg-indigo-900 transition-colors cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">📘 Companion</h3>
            <p className="text-gray-300 mb-4">
              A search-friendly educational tool that helps students explore synonyms, idioms, proverbs, grammar tips, and literary devices — all in one place.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>FastAPI backend with PostgreSQL</li>
              <li>Full-text + fuzzy search across multiple categories</li>
              <li>Frontend built with Next.js + Tailwind CSS</li>
            </ul>
            <p className="text-indigo-400 underline mt-4">View Project →</p>
          </article>
        </Link>



{/*
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
*/}

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
