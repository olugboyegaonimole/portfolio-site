import Link from 'next/link'

export default function JokeGeneratorPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">😂 Joke Generator</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A fun web app that serves random clean jokes to brighten your day.
          </p>
        </header>

        {/* Tech Stack */}
        <section className="flex flex-wrap justify-center gap-3">
          {[
            'FastAPI',
            'Python',
            'Render',
            'Next.js',
            'TailwindCSS',
            'GitHub Pages'
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
          <h2 className="text-2xl font-semibold mb-4">🚀 Try App Live</h2>
          <p className="text-gray-400 mb-4">
            Click below to open the Joke Generator in a new tab.
          </p>
          <a
            href="https://olugboyegaonimole.github.io/olu-joke/"  // 👈 Replace with live app link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Open Joke Generator
          </a>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">⚙️ How It Works</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Frontend (HTML, TailwindCSS) is served via GitHub Pages.</li>
            <li>Frontend makes a request to the FastAPI backend on Render.</li>
            <li>Backend selects a random clean joke from a curated list.</li>
            <li>The joke is sent back and displayed in the browser.</li>
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
