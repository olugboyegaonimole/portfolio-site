import Link from 'next/link'

export default function BlogSummarizerPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">📰 Blog Summarizer</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A web application that summarizes long-form blog posts into concise, easy-to-read overviews.
          </p>
        </header>

        {/* Tech Stack */}
        <section className="flex flex-wrap justify-center gap-3">
          {[
            'FastAPI',
            'Python',
            'NLTK',
            'Docker',
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
          <h2 className="text-2xl font-semibold mb-4">🚀 Try it Live</h2>
          <p className="text-gray-400 mb-4">
            Enter a blog URL and get a quick summary.
          </p>
          <a
            href="https://olugboyegaonimole.github.io/olu-blog-summarizer/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Open Blog Summarizer
          </a>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">⚙️ How It Works</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>User submits a blog URL through the frontend (GitHub Pages).</li>
            <li>The frontend sends a POST request to the FastAPI backend on Render.</li>
            <li>The backend scrapes and summarizes the blog using NLP (NLTK).</li>
            <li>The summary is returned and displayed in the browser.</li>
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
