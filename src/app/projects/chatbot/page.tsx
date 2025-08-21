'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return
    const userMessage = { sender: "You", text: input }
    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("https://your-chatbot.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { sender: "Bot", text: data.response }])
    } catch (err) {
      setMessages(prev => [...prev, { sender: "Bot", text: "⚠️ Error getting response." }])
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">💬 AI Chatbot</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Chat with an AI powered by BlenderBot (400M-distill).
          </p>
        </header>

        {/* Chat Box */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg h-96 overflow-y-auto">
          {messages.map((msg, i) => (
            <p key={i} className={msg.sender === "You" ? "text-indigo-400" : "text-green-400"}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
          {loading && <p className="italic text-gray-400">Bot is typing...</p>}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 outline-none text-white"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-semibold"
          >
            Send
          </button>
        </div>

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
