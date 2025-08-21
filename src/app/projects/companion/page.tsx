import Link from 'next/link'

export default function CompanionPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">📘 Companion</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A search-friendly educational tool that helps students explore synonyms, idioms, proverbs, grammar tips, literary devices, and more — all in one place.
          </p>
        </header>

        {/* Tech Stack */}
        <section className="flex flex-wrap justify-center gap-3">
          {[
            'FastAPI',
            'PostgreSQL',
            'SQLAlchemy',
            'Next.js',
            'TailwindCSS',
            'Docker',
            'Render'
          ].map((tech) => (
            <span
              key={tech}
              className="bg-indigo-700 text-sm px-3 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </section>

        {/* Live Demo */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">🚀 Try Companion Live</h2>
          <p className="text-gray-400 mb-4">
            Explore the app and test the search engine in action.
          </p>
          <a
            href="https://olu-companion.onrender.com/"  // 👉 replace with your deployed Companion URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Open Companion
          </a>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">⚙️ How It Works</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Tables (idioms, synonyms, grammar, etc.) are preloaded into memory on startup.</li>
            <li>User searches trigger a fuzzy match across all categories.</li>
            <li>Results are categorized, ranked, and linked back to dedicated pages.</li>
            <li>Built with FastAPI backend and PostgreSQL for structured data storage.</li>
          </ul>
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
