import Link from 'next/link'

export default function GamePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">🎮 Vocabulary Game</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A fun synonym-based game with 7 levels of increasing difficulty,
            designed to test and improve vocabulary skills.
          </p>
        </header>

        {/* Tech Stack */}
        <section className="flex flex-wrap justify-center gap-3">
          {[
            'FastAPI',
            'Python',
            'React',
            'Next.js',
            'TailwindCSS',
            'Render',
            'REST API'
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
          <h2 className="text-2xl font-semibold mb-4">🚀 Try Game Live</h2>
          <p className="text-gray-400 mb-4">
            Choose a level and play 10 rounds to test your knowledge of synonyms.
          </p>
          <a
            href="https://olugame-frontend.onrender.com/"  // 🔗 Replace with your deployed game URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Open Vocabulary Game
          </a>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">⚙️ How It Works</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>User selects a difficulty level (Level 1 → Level 7).</li>
            <li>The frontend requests 10 random words from the FastAPI backend.</li>
            <li>The user chooses a synonym from multiple-choice options.</li>
            <li>Score is tracked and shown at the end of the game.</li>
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
