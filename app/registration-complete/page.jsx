'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RegistrationComplete() {
  const router = useRouter()
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get search params on client side for static export
    const urlParams = new URLSearchParams(window.location.search)
    const dataParam = urlParams.get('data')
    setData(dataParam || '')
    setIsLoading(false)
  }, [])

  const handleBackToForm = () => {
    try {
      if (data && data.startsWith('http')) {
        const url = new URL(data)
        const encodedData = url.searchParams.get('data')
        if (encodedData) {
          router.push(`/?data=${encodedData}`)
          return
        }
      }
    } catch (error) {
      console.error('Error extracting form data from URL:', error)
    }
    
    router.push('/')
  }

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto p-3 sm:p-5 z-10 min-h-screen flex items-center justify-center">
        <section className="bg-black/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 relative">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading...</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-3 sm:p-5 z-10 min-h-screen flex items-center justify-center">
        <section className="bg-black/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 relative" role="main" aria-label="Registration Confirmation">
          <button 
            className="absolute top- left-4 sm:top-6 sm:left-6 text-gray-400 text-sm transition-colors duration-300 cursor-pointer hover:text-yellow-400 bg-transparent border-none flex items-center gap-1"
            onClick={handleBackToForm}
          >
            ← Back to Registration Form
          </button>
          
          <div className="text-center mt-10 sm:mt-6">
            <header>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#B98C53] to-yellow-200 bg-clip-text text-transparent">
                Registration Complete!
              </h1>
              <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2">
                Thank you for registering for our 25th Anniversary Reunion! Complete your purchase to secure your spot at this memorable celebration.
              </p>
            </header>

            <a 
              href={data} 
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#534088] text-white no-underline rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Purchase tickets for University of Colombo Alumni 25th Anniversary Reunion (opens in new tab)"
            >
              Purchase Your Tickets Now
            </a>
          </div>
        </section>
      </main>
  );
}
