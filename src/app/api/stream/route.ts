// src/app/api/stream/route.ts

import { NextResponse } from 'next/server'

const ports = ['Shanghai', 'Hamburg', 'Dubai', 'Rotterdam', 'Lagos']
const statuses = ['Departed', 'Arrived', 'In Transit', 'Delayed']

function generateMockEvent() {
  const port = ports[Math.floor(Math.random() * ports.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const temperature = parseFloat((Math.random() * 10 + 15).toFixed(2))

  return {
    timestamp: new Date().toISOString(),
    location: port,
    status,
    temperature,
  }
}

export async function GET() {
  const event = generateMockEvent()
  return NextResponse.json(event)
}
