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
        <h2 className="text-3xl font-bold mb-4">Featured Projec
