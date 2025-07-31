'use client'

import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface StreamData {
  timestamp: string
  location: string
  status: string
  temperature: number
}

export default function StreamingLog() {
  const [logs, setLogs] = useState<StreamData[]>([])

  useEffect(() => {
    const q = query(
      collection(db, 'streamData'),
      orderBy('timestamp', 'desc'),
      limit(10)
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      const entries = snapshot.docs.map(doc => doc.data() as StreamData)
      setLogs(entries)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-sm max-h-80 overflow-y-auto">
      {logs.map((log, idx) => (
        <div key={idx} className="border-b border-gray-800 py-1 text-gray-300">
          <code>{new Date(log.timestamp).toLocaleTimeString()}</code> –{' '}
          <span className="text-indigo-300">{log.location}</span> –{' '}
          <span>{log.status}</span> –{' '}
          <span className="text-yellow-300">{log.temperature}°C</span>
        </div>
      ))}
      {logs.length === 0 && <p className="text-gray-500 italic">Waiting for data...</p>}
    </div>
  )
}
